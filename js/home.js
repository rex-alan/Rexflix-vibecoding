function handleHeroEmail(event) {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector('input[type="email"]');
  if (!input) return false;

  const email = input.value.trim();
  if (!email) return false;

  // Redirect to login page with email as URL parameter for signup
  window.location.href = `login.html?email=${encodeURIComponent(email)}&signup=true`;
  return false;
}

function toggleFaq(button) {
  const body = button.nextElementSibling;
  if (!body) return;

  const isOpen = body.style.maxHeight && body.style.maxHeight !== "0px";

  if (isOpen) {
    body.style.maxHeight = "0px";
    body.classList.remove("open");
    const icon = button.querySelector(".rx-faq-icon");
    if (icon) icon.textContent = "+";
  } else {
    body.style.maxHeight = body.scrollHeight + "px";
    body.classList.add("open");
    const icon = button.querySelector(".rx-faq-icon");
    if (icon) icon.textContent = "×";
  }
}

