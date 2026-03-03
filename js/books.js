const BOOKS = [
  // ═══════════════════════════════════════
  // FICTION
  // ═══════════════════════════════════════
  {
    title: "1984",
    author: "George Orwell",
    isbn10: "0451524934",
    isbn13: "9780451524935",
    genre: "fiction",
    theme: "power",
    mood: "dark",
    length: "medium",
    description: "A chilling dystopia where totalitarian government controls every aspect of life, and one man dares to think for himself."
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn10: "0060935464",
    isbn13: "9780060935467",
    genre: "fiction",
    theme: "justice",
    mood: "thought-provoking",
    length: "medium",
    description: "A young girl in the Depression-era South witnesses her father defend a Black man accused of a crime, confronting deep-rooted prejudice."
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn10: "0743273567",
    isbn13: "9780743273565",
    genre: "fiction",
    theme: "identity",
    mood: "emotional",
    length: "short",
    description: "A mysterious millionaire's obsession with recapturing the past unfolds against the decadence of the Jazz Age."
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn10: "0141439513",
    isbn13: "9780141439518",
    genre: "fiction",
    theme: "love",
    mood: "lighthearted",
    length: "medium",
    description: "Sharp-witted Elizabeth Bennet and proud Mr. Darcy clash and attract in this sparkling comedy of manners and misunderstanding."
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    isbn10: "0060850523",
    isbn13: "9780060850524",
    genre: "fiction",
    theme: "power",
    mood: "thought-provoking",
    length: "medium",
    description: "In a world engineered for pleasure and conformity, one outsider questions the cost of a manufactured utopia."
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn10: "0316769487",
    isbn13: "9780316769488",
    genre: "fiction",
    theme: "coming-of-age",
    mood: "emotional",
    length: "short",
    description: "A disillusioned teenager wanders New York City, grappling with phoniness, loss, and the pain of growing up."
  },
  {
    title: "A Man Called Ove",
    author: "Fredrik Backman",
    isbn10: "1476738025",
    isbn13: "9781476738024",
    genre: "fiction",
    theme: "family",
    mood: "funny",
    length: "medium",
    description: "A grumpy yet lovable curmudgeon finds his solitary routine upended by boisterous new neighbors who refuse to leave him alone."
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    isbn10: "159463193X",
    isbn13: "9781594631931",
    genre: "fiction",
    theme: "redemption",
    mood: "emotional",
    length: "medium",
    description: "A haunting story of friendship, betrayal, and atonement set against the backdrop of a changing Afghanistan."
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    isbn10: "0735219109",
    isbn13: "9780735219106",
    genre: "fiction",
    theme: "survival",
    mood: "mysterious",
    length: "medium",
    description: "An isolated girl raised in the marshlands of North Carolina becomes a suspect in a murder, revealing a life of resilience and secrets."
  },
  {
    title: "Little Women",
    author: "Louisa May Alcott",
    isbn10: "0147514010",
    isbn13: "9780147514011",
    genre: "fiction",
    theme: "family",
    mood: "lighthearted",
    length: "long",
    description: "Four sisters navigate love, loss, ambition, and growing up in Civil War-era New England."
  },
  {
    title: "The Road",
    author: "Cormac McCarthy",
    isbn10: "0307387895",
    isbn13: "9780307387899",
    genre: "fiction",
    theme: "survival",
    mood: "dark",
    length: "medium",
    description: "A father and son traverse a post-apocalyptic wasteland, clinging to hope and each other in a world stripped of everything."
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn10: "0062315005",
    isbn13: "9780062315007",
    genre: "fiction",
    theme: "discovery",
    mood: "inspiring",
    length: "short",
    description: "A young shepherd journeys from Spain to Egypt in pursuit of a treasure, discovering that the real riches lie in the journey itself."
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    isbn10: "0140449264",
    isbn13: "9780140449266",
    genre: "fiction",
    theme: "justice",
    mood: "thrilling",
    length: "long",
    description: "A wrongfully imprisoned man escapes, discovers a fortune, and reinvents himself to exact an elaborate revenge on those who betrayed him."
  },
  {
    title: "Normal People",
    author: "Sally Rooney",
    isbn10: "1984822187",
    isbn13: "9781984822185",
    genre: "fiction",
    theme: "love",
    mood: "emotional",
    length: "medium",
    description: "Two Irish teenagers from different social worlds weave in and out of each other's lives through college, bound by an intense connection."
  },
  {
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
    isbn10: "0142437174",
    isbn13: "9780142437179",
    genre: "fiction",
    theme: "adventure",
    mood: "lighthearted",
    length: "medium",
    description: "A boy and a runaway slave raft down the Mississippi River, encountering con artists, feuds, and the hypocrisies of pre-Civil War America."
  },

  // ═══════════════════════════════════════
  // SCIENCE FICTION
  // ═══════════════════════════════════════
  {
    title: "Dune",
    author: "Frank Herbert",
    isbn10: "0441013597",
    isbn13: "9780441013593",
    genre: "sci-fi",
    theme: "power",
    mood: "thrilling",
    length: "long",
    description: "On a desert planet where giant sandworms guard the universe's most valuable resource, a young duke must embrace his destiny."
  },
  {
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    isbn10: "0441478123",
    isbn13: "9780441478125",
    genre: "sci-fi",
    theme: "identity",
    mood: "thought-provoking",
    length: "medium",
    description: "An envoy visits a planet where people have no fixed gender, challenging everything he thinks he knows about society and self."
  },
  {
    title: "Ender's Game",
    author: "Orson Scott Card",
    isbn10: "0812550706",
    isbn13: "9780812550702",
    genre: "sci-fi",
    theme: "coming-of-age",
    mood: "thrilling",
    length: "medium",
    description: "A brilliant child is recruited into a military academy in space, where war games may be more real than they seem."
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    isbn10: "0553418025",
    isbn13: "9780553418026",
    genre: "sci-fi",
    theme: "survival",
    mood: "funny",
    length: "medium",
    description: "Stranded alone on Mars, a resourceful astronaut must science his way to survival with nothing but duct tape, potatoes, and sheer stubbornness."
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    isbn10: "1451673310",
    isbn13: "9781451673319",
    genre: "sci-fi",
    theme: "power",
    mood: "dark",
    length: "short",
    description: "In a future where firemen burn books, one begins to question everything after secretly reading the forbidden pages."
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    isbn10: "0345391802",
    isbn13: "9780345391803",
    genre: "sci-fi",
    theme: "adventure",
    mood: "funny",
    length: "short",
    description: "Earth is demolished for a hyperspace bypass, and the last surviving human hitchhikes through the galaxy with a deeply depressed robot."
  },
  {
    title: "Kindred",
    author: "Octavia E. Butler",
    isbn10: "0807083690",
    isbn13: "9780807083697",
    genre: "sci-fi",
    theme: "justice",
    mood: "dark",
    length: "medium",
    description: "A modern Black woman is repeatedly pulled back in time to the antebellum South, forced to save the life of her white slaveholding ancestor."
  },
  {
    title: "Foundation",
    author: "Isaac Asimov",
    isbn10: "0553293354",
    isbn13: "9780553293357",
    genre: "sci-fi",
    theme: "discovery",
    mood: "thought-provoking",
    length: "medium",
    description: "A mathematician predicts the fall of a galactic empire and creates a plan to preserve knowledge through the coming dark age."
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    isbn10: "0593135202",
    isbn13: "9780593135204",
    genre: "sci-fi",
    theme: "discovery",
    mood: "inspiring",
    length: "long",
    description: "A lone astronaut wakes up on a spaceship with no memory, and must save Earth from extinction with the help of an unlikely alien friend."
  },

  // ═══════════════════════════════════════
  // FANTASY
  // ═══════════════════════════════════════
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn10: "054792822X",
    isbn13: "9780547928227",
    genre: "fantasy",
    theme: "adventure",
    mood: "lighthearted",
    length: "medium",
    description: "A comfort-loving hobbit is swept into a quest for dragon's gold with a company of dwarves and a meddling wizard."
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    isbn10: "0756404746",
    isbn13: "9780756404741",
    genre: "fantasy",
    theme: "coming-of-age",
    mood: "mysterious",
    length: "long",
    description: "A legendary figure recounts his rise from orphaned street urchin to the most notorious wizard his world has ever seen."
  },
  {
    title: "A Game of Thrones",
    author: "George R.R. Martin",
    isbn10: "0553573403",
    isbn13: "9780553573404",
    genre: "fantasy",
    theme: "power",
    mood: "dark",
    length: "long",
    description: "Noble families wage war for control of the Iron Throne while an ancient evil stirs beyond a massive wall of ice."
  },
  {
    title: "The Fifth Season",
    author: "N.K. Jemisin",
    isbn10: "0316229296",
    isbn13: "9780316229296",
    genre: "fantasy",
    theme: "survival",
    mood: "dark",
    length: "medium",
    description: "On a continent wracked by catastrophic seismic events, a woman with the power to control earthquakes searches for her kidnapped daughter."
  },
  {
    title: "Circe",
    author: "Madeline Miller",
    isbn10: "0316556343",
    isbn13: "9780316556347",
    genre: "fantasy",
    theme: "identity",
    mood: "inspiring",
    length: "medium",
    description: "The mythological witch Circe discovers her powers of sorcery and forges her own path in a world ruled by capricious gods."
  },
  {
    title: "The Princess Bride",
    author: "William Goldman",
    isbn10: "0156035219",
    isbn13: "9780156035217",
    genre: "fantasy",
    theme: "love",
    mood: "funny",
    length: "medium",
    description: "A tale of true love, daring sword fights, giants, and miracles — the most beautiful woman in the world and the farm boy who loves her."
  },
  {
    title: "Piranesi",
    author: "Susanna Clarke",
    isbn10: "1635575990",
    isbn13: "9781635575996",
    genre: "fantasy",
    theme: "discovery",
    mood: "mysterious",
    length: "short",
    description: "A man lives in a labyrinthine house of infinite halls and tidal oceans, cataloguing its wonders while slowly uncovering who he really is."
  },
  {
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    isbn10: "0765365278",
    isbn13: "9780765365279",
    genre: "fantasy",
    theme: "redemption",
    mood: "inspiring",
    length: "long",
    description: "On a storm-blasted world, a slave soldier, a scholar, and a king converge on an ancient mystery that could save — or doom — civilization."
  },

  // ═══════════════════════════════════════
  // MYSTERY
  // ═══════════════════════════════════════
  {
    title: "And Then There Were None",
    author: "Agatha Christie",
    isbn10: "0062073486",
    isbn13: "9780062073488",
    genre: "mystery",
    theme: "justice",
    mood: "thrilling",
    length: "short",
    description: "Ten strangers are lured to an isolated island where they are accused of past crimes — and then start dying one by one."
  },
  {
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    isbn10: "0307454541",
    isbn13: "9780307454546",
    genre: "mystery",
    theme: "justice",
    mood: "dark",
    length: "long",
    description: "A disgraced journalist and a brilliant but troubled hacker team up to investigate a decades-old disappearance hiding a web of violence."
  },
  {
    title: "Big Little Lies",
    author: "Liane Moriarty",
    isbn10: "0399587195",
    isbn13: "9780399587191",
    genre: "mystery",
    theme: "family",
    mood: "funny",
    length: "medium",
    description: "Three mothers with secrets collide at a school trivia night that ends in death — but whose, and why?"
  },
  {
    title: "In the Woods",
    author: "Tana French",
    isbn10: "0143113496",
    isbn13: "9780143113492",
    genre: "mystery",
    theme: "identity",
    mood: "mysterious",
    length: "medium",
    description: "A detective investigating a child's murder in Dublin is drawn back to the woods where his own childhood friends vanished twenty years earlier."
  },
  {
    title: "The No. 1 Ladies' Detective Agency",
    author: "Alexander McCall Smith",
    isbn10: "1400034779",
    isbn13: "9781400034772",
    genre: "mystery",
    theme: "discovery",
    mood: "lighthearted",
    length: "short",
    description: "Botswana's first and finest female detective opens her agency and solves cases with warmth, wisdom, and a good cup of bush tea."
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    isbn10: "1250301696",
    isbn13: "9781250301697",
    genre: "mystery",
    theme: "identity",
    mood: "thrilling",
    length: "medium",
    description: "A famous painter shoots her husband and never speaks again. A therapist becomes obsessed with uncovering her motive."
  },

  // ═══════════════════════════════════════
  // ROMANCE
  // ═══════════════════════════════════════
  {
    title: "The Notebook",
    author: "Nicholas Sparks",
    isbn10: "1455582875",
    isbn13: "9781455582877",
    genre: "romance",
    theme: "love",
    mood: "emotional",
    length: "short",
    description: "An elderly man reads a love story to a woman in a nursing home — a story of passion, devotion, and a love that transcends time."
  },
  {
    title: "Outlander",
    author: "Diana Gabaldon",
    isbn10: "0440212561",
    isbn13: "9780440212560",
    genre: "romance",
    theme: "adventure",
    mood: "thrilling",
    length: "long",
    description: "A WWII nurse accidentally travels through time to 18th-century Scotland, where she falls for a dashing Highland warrior."
  },
  {
    title: "Beach Read",
    author: "Emily Henry",
    isbn10: "1984806734",
    isbn13: "9781984806734",
    genre: "romance",
    theme: "love",
    mood: "funny",
    length: "medium",
    description: "Two writers with opposite styles swap genres for the summer — the literary novelist tries romance, the romance writer goes dark — and sparks fly."
  },
  {
    title: "The Time Traveler's Wife",
    author: "Audrey Niffenegger",
    isbn10: "015602943X",
    isbn13: "9780156029438",
    genre: "romance",
    theme: "love",
    mood: "emotional",
    length: "long",
    description: "A man with a genetic disorder that causes him to time travel unpredictably struggles to build a life with the woman he loves."
  },
  {
    title: "Red, White & Royal Blue",
    author: "Casey McQuiston",
    isbn10: "1250316774",
    isbn13: "9781250316776",
    genre: "romance",
    theme: "identity",
    mood: "lighthearted",
    length: "medium",
    description: "The First Son of the United States and the Prince of Wales turn a public feud into a secret romance with global stakes."
  },
  {
    title: "Me Before You",
    author: "Jojo Moyes",
    isbn10: "0143124544",
    isbn13: "9780143124542",
    genre: "romance",
    theme: "coming-of-age",
    mood: "emotional",
    length: "medium",
    description: "A small-town girl takes a job caring for a wealthy quadriplegic man, and both of their lives are irrevocably changed."
  },

  // ═══════════════════════════════════════
  // NON-FICTION
  // ═══════════════════════════════════════
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn10: "0062316117",
    isbn13: "9780062316110",
    genre: "non-fiction",
    theme: "discovery",
    mood: "thought-provoking",
    length: "long",
    description: "A sweeping account of how Homo sapiens came to dominate the planet through cognitive, agricultural, and scientific revolutions."
  },
  {
    title: "Educated",
    author: "Tara Westover",
    isbn10: "0399590501",
    isbn13: "9780399590504",
    genre: "non-fiction",
    theme: "coming-of-age",
    mood: "inspiring",
    length: "medium",
    description: "A woman raised in a survivalist family in Idaho with no formal schooling earns a PhD from Cambridge, transforming her understanding of the world."
  },
  {
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    isbn10: "1400052181",
    isbn13: "9781400052189",
    genre: "non-fiction",
    theme: "justice",
    mood: "thought-provoking",
    length: "medium",
    description: "The story of a poor Black tobacco farmer whose cells were taken without consent and became one of the most important tools in medicine."
  },
  {
    title: "Into the Wild",
    author: "Jon Krakauer",
    isbn10: "0385486804",
    isbn13: "9780385486804",
    genre: "non-fiction",
    theme: "adventure",
    mood: "emotional",
    length: "short",
    description: "A young man abandons his possessions and hitchhikes to Alaska to live in the wilderness — a journey that ends in tragedy."
  },
  {
    title: "Quiet: The Power of Introverts",
    author: "Susan Cain",
    isbn10: "0307352153",
    isbn13: "9780307352156",
    genre: "non-fiction",
    theme: "identity",
    mood: "inspiring",
    length: "medium",
    description: "A deep dive into why introverts are undervalued in a world that can't stop talking, and how they can harness their quiet strengths."
  },
  {
    title: "Freakonomics",
    author: "Steven D. Levitt & Stephen J. Dubner",
    isbn10: "0060731338",
    isbn13: "9780060731335",
    genre: "non-fiction",
    theme: "discovery",
    mood: "funny",
    length: "medium",
    description: "An economist and a journalist explore the hidden side of everything — from cheating sumo wrestlers to the economics of drug dealing."
  },
  {
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    isbn10: "0143127748",
    isbn13: "9780143127741",
    genre: "non-fiction",
    theme: "redemption",
    mood: "thought-provoking",
    length: "medium",
    description: "A pioneering psychiatrist reveals how trauma reshapes the body and brain, and explores innovative treatments for recovery."
  },
  {
    title: "In Cold Blood",
    author: "Truman Capote",
    isbn10: "0679745580",
    isbn13: "9780679745587",
    genre: "non-fiction",
    theme: "justice",
    mood: "dark",
    length: "medium",
    description: "The meticulously reported true story of the brutal murder of a Kansas family and the investigation that brought the killers to justice."
  },
  {
    title: "Unbroken",
    author: "Laura Hillenbrand",
    isbn10: "0812974492",
    isbn13: "9780812974492",
    genre: "non-fiction",
    theme: "survival",
    mood: "inspiring",
    length: "long",
    description: "The incredible true story of an Olympic runner turned WWII bombardier who survived a plane crash, 47 days adrift, and years in a POW camp."
  },

  // ═══════════════════════════════════════
  // HORROR
  // ═══════════════════════════════════════
  {
    title: "The Shining",
    author: "Stephen King",
    isbn10: "0307743659",
    isbn13: "9780307743657",
    genre: "horror",
    theme: "family",
    mood: "dark",
    length: "long",
    description: "A family moves into an isolated hotel for the winter where a sinister presence influences the father and terrorizes his psychic young son."
  },
  {
    title: "Mexican Gothic",
    author: "Silvia Moreno-Garcia",
    isbn10: "0525620788",
    isbn13: "9780525620785",
    genre: "horror",
    theme: "survival",
    mood: "mysterious",
    length: "medium",
    description: "A glamorous socialite investigates her cousin's mysterious illness at a decaying English mansion in 1950s Mexico — and uncovers something horrifying."
  },
  {
    title: "The Haunting of Hill House",
    author: "Shirley Jackson",
    isbn10: "0143039989",
    isbn13: "9780143039983",
    genre: "horror",
    theme: "identity",
    mood: "dark",
    length: "short",
    description: "Four seekers arrive at a notoriously unfriendly house to study its paranormal activity — but Hill House has plans of its own."
  },
  {
    title: "Bird Box",
    author: "Josh Malerman",
    isbn10: "0062259660",
    isbn13: "9780062259660",
    genre: "horror",
    theme: "survival",
    mood: "thrilling",
    length: "medium",
    description: "A mother and her two children navigate a river blindfolded to escape creatures that drive anyone who sees them to violent madness."
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    isbn10: "0141439475",
    isbn13: "9780141439471",
    genre: "horror",
    theme: "identity",
    mood: "thought-provoking",
    length: "short",
    description: "A young scientist creates a sentient creature from dead tissue, then recoils in horror at what he has made — but the creature wants answers."
  },
  {
    title: "The Exorcist",
    author: "William Peter Blatty",
    isbn10: "0061007226",
    isbn13: "9780061007224",
    genre: "horror",
    theme: "redemption",
    mood: "dark",
    length: "medium",
    description: "When a twelve-year-old girl is possessed by a mysterious entity, her mother turns to two priests in a desperate battle for her daughter's soul."
  },

  // ═══════════════════════════════════════
  // HISTORICAL FICTION
  // ═══════════════════════════════════════
  {
    title: "All the Light We Cannot See",
    author: "Anthony Doerr",
    isbn10: "1501173219",
    isbn13: "9781501173219",
    genre: "historical-fiction",
    theme: "survival",
    mood: "emotional",
    length: "long",
    description: "A blind French girl and a German boy's paths collide during WWII in occupied France, connected by a radio broadcast and a legendary diamond."
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    isbn10: "0375842209",
    isbn13: "9780375842207",
    genre: "historical-fiction",
    theme: "family",
    mood: "emotional",
    length: "long",
    description: "Narrated by Death, this is the story of a girl in Nazi Germany who steals books and shares them with her neighbors during bombing raids."
  },
  {
    title: "The Pillars of the Earth",
    author: "Ken Follett",
    isbn10: "0451166892",
    isbn13: "9780451166890",
    genre: "historical-fiction",
    theme: "power",
    mood: "thrilling",
    length: "long",
    description: "In 12th-century England, a master builder's dream to construct the greatest Gothic cathedral becomes entangled in a struggle of kings, bishops, and knights."
  },
  {
    title: "Pachinko",
    author: "Min Jin Lee",
    isbn10: "1455563935",
    isbn13: "9781455563937",
    genre: "historical-fiction",
    theme: "family",
    mood: "thought-provoking",
    length: "long",
    description: "Four generations of a Korean family in Japan navigate identity, discrimination, and resilience across the twentieth century."
  },
  {
    title: "The Nightingale",
    author: "Kristin Hannah",
    isbn10: "1250080401",
    isbn13: "9781250080400",
    genre: "historical-fiction",
    theme: "survival",
    mood: "inspiring",
    length: "long",
    description: "Two sisters in Nazi-occupied France find courage in very different ways — one through quiet endurance, the other through daring resistance."
  },
  {
    title: "Memoirs of a Geisha",
    author: "Arthur Golden",
    isbn10: "0679781587",
    isbn13: "9780679781585",
    genre: "historical-fiction",
    theme: "identity",
    mood: "emotional",
    length: "long",
    description: "A poor fishing village girl is sold into servitude and trains to become one of Japan's most celebrated geisha."
  },
  {
    title: "The Help",
    author: "Kathryn Stockett",
    isbn10: "0425232204",
    isbn13: "9780425232200",
    genre: "historical-fiction",
    theme: "justice",
    mood: "inspiring",
    length: "long",
    description: "In 1960s Mississippi, an aspiring writer and two Black maids risk everything to tell the truth about life working in white households."
  },
  {
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    isbn10: "0143110438",
    isbn13: "9780143110439",
    genre: "historical-fiction",
    theme: "adventure",
    mood: "lighthearted",
    length: "long",
    description: "A Russian count is sentenced to house arrest in a luxury hotel for decades, finding meaning and mischief within its walls."
  },

  // ═══════════════════════════════════════
  // THRILLER
  // ═══════════════════════════════════════
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    isbn10: "0307588378",
    isbn13: "9780307588371",
    genre: "thriller",
    theme: "identity",
    mood: "thrilling",
    length: "medium",
    description: "On their fifth wedding anniversary, a wife disappears — and every revelation shows their perfect marriage was anything but."
  },
  {
    title: "The Girl on the Train",
    author: "Paula Hawkins",
    isbn10: "1594634025",
    isbn13: "9781594634024",
    genre: "thriller",
    theme: "identity",
    mood: "mysterious",
    length: "medium",
    description: "A woman who watches a seemingly perfect couple from her commuter train becomes entangled in their lives when the wife disappears."
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    isbn10: "0307474275",
    isbn13: "9780307474278",
    genre: "thriller",
    theme: "discovery",
    mood: "thrilling",
    length: "long",
    description: "A symbologist and a cryptographer race through European landmarks to decode a trail of clues hidden in the works of Leonardo da Vinci."
  },
  {
    title: "The Firm",
    author: "John Grisham",
    isbn10: "0440245923",
    isbn13: "9780440245926",
    genre: "thriller",
    theme: "justice",
    mood: "thrilling",
    length: "medium",
    description: "A young lawyer joins a prestigious Memphis law firm, only to discover its lucrative practice hides deadly secrets tied to the mob."
  },
  {
    title: "Dark Places",
    author: "Gillian Flynn",
    isbn10: "0307341577",
    isbn13: "9780307341570",
    genre: "thriller",
    theme: "family",
    mood: "dark",
    length: "medium",
    description: "The sole survivor of a family massacre, convinced as a child that her brother was the killer, is forced to reexamine what really happened."
  },
  {
    title: "Behind Closed Doors",
    author: "B.A. Paris",
    isbn10: "1250132363",
    isbn13: "9781250132369",
    genre: "thriller",
    theme: "survival",
    mood: "thrilling",
    length: "medium",
    description: "Everyone envies the perfect couple — but behind closed doors, their marriage is a prison, and she's running out of time to escape."
  },

  // ═══════════════════════════════════════
  // BIOGRAPHY / MEMOIR
  // ═══════════════════════════════════════
  {
    title: "Becoming",
    author: "Michelle Obama",
    isbn10: "1524763136",
    isbn13: "9781524763138",
    genre: "biography",
    theme: "coming-of-age",
    mood: "inspiring",
    length: "long",
    description: "From the South Side of Chicago to the White House, Michelle Obama shares her journey with warmth, candor, and quiet power."
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    isbn10: "1451648537",
    isbn13: "9781451648539",
    genre: "biography",
    theme: "power",
    mood: "thought-provoking",
    length: "long",
    description: "The definitive biography of Apple's visionary cofounder — a genius, a perfectionist, and a deeply complicated man who changed the world."
  },
  {
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    isbn10: "081298840X",
    isbn13: "9780812988406",
    genre: "biography",
    theme: "identity",
    mood: "emotional",
    length: "short",
    description: "A neurosurgeon diagnosed with terminal cancer confronts what makes life worth living when facing his own death."
  },
  {
    title: "Born a Crime",
    author: "Trevor Noah",
    isbn10: "0399588175",
    isbn13: "9780399588174",
    genre: "biography",
    theme: "family",
    mood: "funny",
    length: "medium",
    description: "Trevor Noah's memoir of growing up mixed-race in apartheid South Africa, where his very existence was literally a crime."
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    isbn10: "0553296981",
    isbn13: "9780553296983",
    genre: "biography",
    theme: "survival",
    mood: "emotional",
    length: "medium",
    description: "A Jewish teenager's diary, written while hiding from the Nazis in an Amsterdam attic, capturing fear, hope, and the resilience of youth."
  },
  {
    title: "Long Walk to Freedom",
    author: "Nelson Mandela",
    isbn10: "0316548189",
    isbn13: "9780316548182",
    genre: "biography",
    theme: "justice",
    mood: "inspiring",
    length: "long",
    description: "Nelson Mandela's autobiography traces his journey from rural village boyhood to political prisoner to the presidency of South Africa."
  },

  // ═══════════════════════════════════════
  // SELF-HELP
  // ═══════════════════════════════════════
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn10: "0735211299",
    isbn13: "9780735211292",
    genre: "self-help",
    theme: "discovery",
    mood: "inspiring",
    length: "medium",
    description: "A practical guide to building good habits and breaking bad ones through tiny changes that compound into remarkable results."
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    isbn10: "0062457713",
    isbn13: "9780062457714",
    genre: "self-help",
    theme: "identity",
    mood: "funny",
    length: "short",
    description: "A counterintuitive approach to living a good life by choosing what to care about — and, more importantly, what not to."
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    isbn10: "0807014273",
    isbn13: "9780807014271",
    genre: "self-help",
    theme: "survival",
    mood: "thought-provoking",
    length: "short",
    description: "A Holocaust survivor and psychiatrist argues that finding purpose is the key to enduring even the most unimaginable suffering."
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    isbn10: "0671027034",
    isbn13: "9780671027032",
    genre: "self-help",
    theme: "discovery",
    mood: "lighthearted",
    length: "medium",
    description: "Timeless principles for building genuine relationships, winning people over, and becoming more persuasive in everyday life."
  },
  {
    title: "Daring Greatly",
    author: "Brené Brown",
    isbn10: "1592408419",
    isbn13: "9781592408412",
    genre: "self-help",
    theme: "identity",
    mood: "inspiring",
    length: "medium",
    description: "A research professor makes the case that vulnerability is not weakness but the birthplace of courage, connection, and creativity."
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    isbn10: "1577314808",
    isbn13: "9781577314806",
    genre: "self-help",
    theme: "redemption",
    mood: "inspiring",
    length: "short",
    description: "A spiritual guide to living fully in the present moment, freeing yourself from the tyranny of the thinking mind."
  },

  // ═══════════════════════════════════════
  // HUMOR
  // ═══════════════════════════════════════
  {
    title: "Good Omens",
    author: "Neil Gaiman & Terry Pratchett",
    isbn10: "0060853980",
    isbn13: "9780060853983",
    genre: "humor",
    theme: "adventure",
    mood: "funny",
    length: "medium",
    description: "An angel and a demon who've grown fond of Earth team up to prevent the apocalypse, if only they can find the misplaced Antichrist."
  },
  {
    title: "Catch-22",
    author: "Joseph Heller",
    isbn10: "1451626657",
    isbn13: "9781451626650",
    genre: "humor",
    theme: "survival",
    mood: "dark",
    length: "long",
    description: "A WWII bombardier discovers the maddening bureaucratic paradox that keeps him flying dangerous missions — you'd have to be crazy to fly, but asking to stop proves you're sane."
  },
  {
    title: "Bossypants",
    author: "Tina Fey",
    isbn10: "0316056898",
    isbn13: "9780316056892",
    genre: "humor",
    theme: "coming-of-age",
    mood: "funny",
    length: "medium",
    description: "Tina Fey's hilarious memoir from awkward childhood to SNL to 30 Rock, with sharp observations on being a woman in comedy."
  },
  {
    title: "The Rosie Project",
    author: "Graeme Simsion",
    isbn10: "1476729093",
    isbn13: "9781476729091",
    genre: "humor",
    theme: "love",
    mood: "lighthearted",
    length: "medium",
    description: "A socially awkward genetics professor devises a scientific questionnaire to find the perfect wife — then meets a woman who is everything he wasn't looking for."
  },
  {
    title: "Hyperbole and a Half",
    author: "Allie Brosh",
    isbn10: "1451666179",
    isbn13: "9781451666175",
    genre: "humor",
    theme: "identity",
    mood: "funny",
    length: "short",
    description: "Hilarious illustrated essays about the absurdities of life, including dogs, depression, and the challenge of being a person."
  },
  {
    title: "Lamb: The Gospel According to Biff",
    author: "Christopher Moore",
    isbn10: "0380813815",
    isbn13: "9780380813810",
    genre: "humor",
    theme: "adventure",
    mood: "funny",
    length: "medium",
    description: "The untold story of the Son of God's missing years, as told by his irreverent best friend Biff — a comedic and surprisingly touching journey."
  },
  {
    title: "Let's Pretend This Never Happened",
    author: "Jenny Lawson",
    isbn10: "0425261018",
    isbn13: "9780425261019",
    genre: "humor",
    theme: "family",
    mood: "funny",
    length: "medium",
    description: "A wildly funny memoir about growing up in rural Texas with a taxidermist father, battling anxiety, and finding humor in the absurd."
  },
  {
    title: "Year One",
    author: "Nora Roberts",
    isbn10: "1250122957",
    isbn13: "9781250122957",
    genre: "fantasy",
    theme: "survival",
    mood: "thrilling",
    length: "medium",
    description: "After a devastating plague, a community of survivors discovers that some among them have developed extraordinary abilities — and must unite to face a rising darkness."
  },
  {
    title: "Anxious People",
    author: "Fredrik Backman",
    isbn10: "1501160842",
    isbn13: "9781501160844",
    genre: "fiction",
    theme: "redemption",
    mood: "funny",
    length: "medium",
    description: "A failed bank robber accidentally takes a group of apartment viewers hostage, and the ensuing standoff reveals everyone's hidden anxieties and connections."
  },
  {
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    isbn10: "1501161938",
    isbn13: "9781501161933",
    genre: "fiction",
    theme: "love",
    mood: "thought-provoking",
    length: "medium",
    description: "An aging Hollywood icon finally tells the story of her glamorous and scandalous life, and the great love she kept hidden from the world."
  },
  {
    title: "Station Eleven",
    author: "Emily St. John Mandel",
    isbn10: "0804172447",
    isbn13: "9780804172448",
    genre: "sci-fi",
    theme: "survival",
    mood: "emotional",
    length: "medium",
    description: "After a devastating flu pandemic, a traveling symphony performs Shakespeare for scattered survivors, proving that art endures even at the end of the world."
  },
  {
    title: "Eleanor Oliphant Is Completely Fine",
    author: "Gail Honeyman",
    isbn10: "0735220689",
    isbn13: "9780735220683",
    genre: "fiction",
    theme: "redemption",
    mood: "lighthearted",
    length: "medium",
    description: "A socially awkward woman with a carefully timetabled life and a dark past slowly learns that connection and kindness can change everything."
  },
  {
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    isbn10: "1250217318",
    isbn13: "9781250217318",
    genre: "fantasy",
    theme: "family",
    mood: "lighthearted",
    length: "medium",
    description: "A caseworker for magical youth is sent to evaluate an orphanage on a remote island, where he discovers an unlikely family and finds himself."
  },
  {
    title: "Verity",
    author: "Colleen Hoover",
    isbn10: "1538724731",
    isbn13: "9781538724736",
    genre: "thriller",
    theme: "love",
    mood: "dark",
    length: "medium",
    description: "A struggling writer hired to finish a bestselling author's series discovers an unfinished autobiography containing chilling confessions."
  },
];

// ===================================
// Type & Format Options
// ===================================
const TYPES = [
  { id: "fiction", label: "Fiction", subtitle: "Novels, stories & imagination" },
  { id: "non-fiction", label: "Non-Fiction", subtitle: "Real world & knowledge" }
];

const FORMATS = [
  { id: "series", label: "Series", subtitle: "Multi-book stories" },
  { id: "standalone", label: "Standalone", subtitle: "Complete in one book" }
];

// ===================================
// Genre Options — split by type
// ===================================
const FICTION_GENRES = [
  { id: "fiction", label: "General Fiction" },
  { id: "sci-fi", label: "Sci-Fi" },
  { id: "fantasy", label: "Fantasy" },
  { id: "mystery", label: "Mystery" },
  { id: "romance", label: "Romance" },
  { id: "horror", label: "Horror" },
  { id: "historical-fiction", label: "Historical Fiction" },
  { id: "thriller", label: "Thriller" },
  { id: "humor", label: "Humor" }
];

const NON_FICTION_GENRES = [
  { id: "non-fiction", label: "General Non-Fiction" },
  { id: "biography", label: "Biography & Memoir" },
  { id: "self-help", label: "Self-Help" }
];

// All genres combined (used for initial render)
const GENRES = [...FICTION_GENRES, ...NON_FICTION_GENRES];

// ===================================
// Theme, Mood, Length Options
// ===================================
const THEMES = [
  { id: "love", label: "Love" },
  { id: "adventure", label: "Adventure" },
  { id: "coming-of-age", label: "Coming of Age" },
  { id: "redemption", label: "Redemption" },
  { id: "survival", label: "Survival" },
  { id: "identity", label: "Identity" },
  { id: "power", label: "Power" },
  { id: "family", label: "Family" },
  { id: "justice", label: "Justice" },
  { id: "discovery", label: "Discovery" }
];

const MOODS = [
  { id: "dark", label: "Dark" },
  { id: "lighthearted", label: "Lighthearted" },
  { id: "thought-provoking", label: "Thought-Provoking" },
  { id: "emotional", label: "Emotional" },
  { id: "thrilling", label: "Thrilling" },
  { id: "funny", label: "Funny" },
  { id: "inspiring", label: "Inspiring" },
  { id: "mysterious", label: "Mysterious" }
];

const LENGTHS = [
  { id: "short", label: "Short", subtitle: "Under 250 pages" },
  { id: "medium", label: "Medium", subtitle: "250 – 450 pages" },
  { id: "long", label: "Long", subtitle: "450+ pages" }
];
