// ===== Bag Bazar Login & Register =====

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Tab Switch
loginTab.onclick = () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
};

registerTab.onclick = () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
};
// ===== Register =====

registerForm.addEventListener("submit", function(e){
  e.preventDefault();

  const user = {
    name: document.getElementById("regName").value,
    phone: document.getElementById("regPhone").value,
    email: document.getElementById("regEmail").value,
    password: document.getElementById("regPassword").value
  };

  const confirm = document.getElementById("regConfirm").value;

  if(user.password !== confirm){
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem("user", JSON.stringify(user));

  alert("Account created successfully!");

  loginTab.click();
});
// ===== Login =====

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (!savedUser) {
    alert("No account found. Please register first.");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    localStorage.setItem("isLoggedIn", "true");
    alert("Login Successful!");
    window.location.href = "profile.html";
  } else {
    alert("Invalid email or password!");
  }
});

// Auto redirect if already logged in
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "profile.html";
}
