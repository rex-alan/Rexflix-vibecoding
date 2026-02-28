const USERS_KEY = "demo_auth_users";
const CURRENT_USER_KEY = "demo_auth_current_user";

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setMessage(text, color) {
  const message = document.getElementById("message");
  if (!message) return;
  message.textContent = text;
  message.style.color = color;
}

function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value.trim();

  if (!email || !password) {
    setMessage("Please enter both email and password.", "#f97373");
    return;
  }

  const users = getUsers();
  if (users[email]) {
    setMessage("An account with this email already exists. Please log in.", "#f97373");
    return;
  }

  // WARNING: For demo only – in real apps, never store plain text passwords.
  users[email] = { password };
  saveUsers(users);

  setMessage("Signup successful! You can now log in.", "#6ee7b7");
  toggleAuthMode("login");
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    setMessage("Please enter both email and password.", "#f97373");
    return;
  }

  const users = getUsers();
  const user = users[email];

  if (!user || user.password !== password) {
    setMessage("Invalid email or password.", "#f97373");
    return;
  }

  // Persist the current logged-in user for the browse page
  try {
    localStorage.setItem(CURRENT_USER_KEY, email);
  } catch {
    // ignore storage errors
  }

  // Navigate to Rexflix home experience
  window.location.href = "browse.html";
}

function toggleAuthMode(forceMode) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const title = document.getElementById("form-title");
  const subtitle = document.getElementById("form-subtitle");
  const toggleText = document.getElementById("toggle-text");
  const toggleButtonText = document.getElementById("toggle-button-text");

  const isToSignup =
    forceMode === "signup" ||
    (!forceMode && signupForm.style.display === "none");

  if (isToSignup) {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    title.textContent = "Sign Up";
    subtitle.textContent = "Create your Rexflix account to start watching.";
    toggleText.textContent = "Already have an account?";
    toggleButtonText.textContent = "Sign in";
    setMessage("", "#6b7280");
  } else {
    loginForm.style.display = "block";
    signupForm.style.display = "none";
    title.textContent = "Sign In";
    subtitle.textContent = "Use your email and password to sign in.";
    toggleText.textContent = "New to Rexflix?";
    toggleButtonText.textContent = "Sign up now";
    setMessage("", "#6b7280");
  }
}

// Handle URL parameters from homepage redirect
function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const signup = params.get("signup");

  if (signup === "true") {
    toggleAuthMode("signup");
    if (email) {
      const signupEmail = document.getElementById("signupEmail");
      if (signupEmail) {
        signupEmail.value = email;
      }
    }
  }
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", handleUrlParams);
