const CURRENT_USER_KEY = "demo_auth_current_user";

function loadCurrentUser() {
  try {
    const email = localStorage.getItem(CURRENT_USER_KEY);
    if (!email) return null;
    return email;
  } catch {
    return null;
  }
}

//sample1
//sample2
//sample3
//sampe conflict

function checkAuth() {
  const user = loadCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function initHeaderUser() {
  const email = loadCurrentUser();
  const avatar = document.getElementById("rxb-avatar");
  const name = document.getElementById("rxb-profile-name");
  const continueTitle = document.getElementById("rxb-continue-title");

  if (!email) {
    if (continueTitle) continueTitle.textContent = "Continue watching on Rexflix";
    return;
  }

  const username = email.split("@")[0];
  const displayName = username.charAt(0).toUpperCase() + username.slice(1);

  if (avatar && username) {
    avatar.textContent = username.charAt(0).toUpperCase();
  }
  if (name) {
    name.textContent = displayName;
  }
  if (continueTitle) {
    continueTitle.textContent = `Continue watching for ${displayName}`;
  }
}

function handleScrollHeader() {
  const header = document.getElementById("rxb-header");
  if (!header) return;
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

function handleSignOut() {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch {
    // ignore
  }
  window.location.href = "index.html";
}

window.addEventListener("DOMContentLoaded", () => {
  if (!checkAuth()) return;
  initHeaderUser();
  handleScrollHeader();
  window.addEventListener("scroll", handleScrollHeader);
});

