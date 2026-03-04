#!/usr/bin/env python3
"""
extract_ucsd.py
---------------
Reads book_stats.json (6k books with IDs + ratings),
streams through UCSD Book Graph .works and .series .json.gz files,
and extracts matching records into compact output files.

Compatible with Pythonista on iOS and any Python 3.6+ environment.
Standard library only — no third-party packages required.

USAGE
-----
1. Set the PATH constants below to match where your files live.
   On Pythonista, use absolute paths, e.g.:
       BOOK_STATS_PATH = "/private/var/mobile/.../book_stats.json"
2. Run the script. Progress is printed as it streams each large file.
3. Copy the two output files into your BookBrew repo.
"""

import gzip
import json
import os

# ── Paths — adjust these before running ──────────────────────────────────────
BOOK_STATS_PATH    = "book_stats.json"                    # your 6k filtered file
WORKS_INPUT_PATH   = "goodreads_book_works.json.gz"       # UCSD works file (~72 MB)
SERIES_INPUT_PATH  = "goodreads_book_series.json.gz"      # UCSD series file (~20 MB)
WORKS_OUTPUT_PATH  = "works_filtered.json"                # output: matched works
SERIES_OUTPUT_PATH = "series_filtered.json"               # output: matched series
# ─────────────────────────────────────────────────────────────────────────────


def load_book_stats(path):
    """
    Load book_stats.json.
    Handles both a JSON array ([{...}, ...]) and JSONL (one object per line).
    Expected record shape: {"book_id": "124", "count": 54, "average_rating": 4.2, ...}
    Returns (set of book_id strings, dict of book_id -> full record).
    """
    with open(path, "r", encoding="utf-8") as f:
        content = f.read().strip()

    if content.startswith("["):
        entries = json.loads(content)
    else:
        entries = [json.loads(line) for line in content.splitlines() if line.strip()]

    book_ids  = set(str(e["book_id"]) for e in entries)
    stats_map = {str(e["book_id"]): e for e in entries}

    print(f"Loaded {len(book_ids):,} book IDs from {path}")
    return book_ids, stats_map


def stream_jsonl_gz(path):
    """Generator: yields (line_index, parsed_dict) from a gzipped JSONL file."""
    with gzip.open(path, "rt", encoding="utf-8") as f:
        for i, line in enumerate(f):
            line = line.strip()
            if line:
                try:
                    yield i, json.loads(line)
                except json.JSONDecodeError:
                    pass


def write_json(path, data):
    output_dir = os.path.dirname(path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f)
    print(f"Written  → {path}  ({len(data):,} records)")


def extract_works(works_path, book_ids, output_path):
    """
    Match works records where best_book_id is in book_ids.
    Also collects any series_id values found in matched records (opportunistic —
    the works file may or may not include series_id depending on dataset version).
    Returns (matched_records, series_ids_found).
    """
    matched         = []
    series_ids_found = set()

    print(f"\nStreaming: {works_path}")

    for i, record in stream_jsonl_gz(works_path):
        if i > 0 and i % 100_000 == 0:
            print(f"  {i:,} records scanned — {len(matched):,} matched...")

        if str(record.get("best_book_id", "")) in book_ids:
            matched.append(record)

            # Collect series_id(s) if present in this works record
            sid = record.get("series_id") or record.get("series_ids")
            if sid:
                if isinstance(sid, list):
                    series_ids_found.update(str(s) for s in sid)
                else:
                    series_ids_found.add(str(sid))

    print(f"Works: {len(matched):,} matched")
    if series_ids_found:
        print(f"       {len(series_ids_found):,} series IDs collected from matched records")

    write_json(output_path, matched)
    return matched, series_ids_found


def extract_series(series_path, series_ids_found, book_ids, output_path):
    """
    Match series records using two strategies (whichever applies):

    Primary   — series_id is in series_ids_found (collected from the works pass).
                Works when the works file embeds series_id on each record.

    Fallback  — the series record itself embeds a list of work/book IDs
                (record["works"] or record["book_ids"]).  Check if any of those
                IDs appear in book_ids.  Handles dataset variants where series
                records enumerate their member works.

    If neither strategy matches any records, a note is printed explaining that
    the 1.9 GB books file would be needed for a complete series link.
    """
    matched = []

    print(f"\nStreaming: {series_path}")

    for i, record in stream_jsonl_gz(series_path):
        if i > 0 and i % 50_000 == 0:
            print(f"  {i:,} records scanned — {len(matched):,} matched...")

        rid = str(record.get("series_id", ""))

        # Primary: series_id collected from works pass
        if series_ids_found and rid in series_ids_found:
            matched.append(record)
            continue

        # Fallback: series record embeds a list of member work/book IDs
        members = record.get("works") or record.get("book_ids") or []
        if members:
            for entry in members:
                mid = str(entry.get("id", entry) if isinstance(entry, dict) else entry)
                if mid in book_ids:
                    matched.append(record)
                    break

    print(f"Series: {len(matched):,} matched")

    if len(matched) == 0:
        print(
            "\nNote: 0 series records matched. This is expected if the works file\n"
            "does not embed series_id and the series file does not list member books.\n"
            "To get series membership, stream goodreads_books.json.gz (1.9 GB)\n"
            "and collect series_id values for your 6k book_ids from its 'series' field."
        )

    write_json(output_path, matched)
    return matched


def main():
    book_ids, _ = load_book_stats(BOOK_STATS_PATH)

    _, series_ids_found = extract_works(WORKS_INPUT_PATH, book_ids, WORKS_OUTPUT_PATH)

    extract_series(SERIES_INPUT_PATH, series_ids_found, book_ids, SERIES_OUTPUT_PATH)

    print("\nDone.")


if __name__ == "__main__":
    main()
