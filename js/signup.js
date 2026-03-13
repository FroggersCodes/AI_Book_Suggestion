const BUTTONDOWN_USERNAME = "bookbrew";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleSignupSubmit(e) {
  e.preventDefault();

  const input = document.getElementById("signup-email");
  const msg = document.getElementById("signup-msg");
  const btn = document.getElementById("signup-btn");
  const email = input.value.trim();

  msg.textContent = "";
  msg.className = "signup-msg";
  input.classList.remove("error");

  if (!email || !isValidEmail(email)) {
    input.classList.add("error");
    msg.textContent = "Please enter a valid email address.";
    msg.classList.add("error");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Subscribing...";

  try {
    const res = await fetch(
      `https://buttondown.email/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email)}`,
      }
    );

    if (res.ok) {
      msg.textContent = "You're subscribed! Check your inbox.";
      msg.classList.add("success");
      input.value = "";
    } else {
      const text = await res.text();
      let errorMsg = "Something went wrong. Please try again.";
      try {
        const data = JSON.parse(text);
        if (data.email) errorMsg = data.email[0];
        else if (data.detail) errorMsg = data.detail;
      } catch (_) {
        // use default error message
      }
      msg.textContent = errorMsg;
      msg.classList.add("error");
    }
  } catch (_) {
    msg.textContent = "Network error. Please try again later.";
    msg.classList.add("error");
  } finally {
    btn.disabled = false;
    btn.textContent = "Subscribe";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  if (form) {
    form.addEventListener("submit", handleSignupSubmit);
  }

  const input = document.getElementById("signup-email");
  if (input) {
    input.addEventListener("input", () => {
      input.classList.remove("error");
      document.getElementById("signup-msg").textContent = "";
      document.getElementById("signup-msg").className = "signup-msg";
    });
  }
});
