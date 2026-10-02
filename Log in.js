const form = document.querySelector("#login-form");

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const message = document.querySelector("#login-message");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!email || !password) {
        message.textContent = "Please enter your email and password.";
        return;
    }

    const savedUser = localStorage.getItem("studentEatsUser");

    if (!savedUser) {
        message.textContent = "No account found. Please register first.";
        return;
    }

    const user = JSON.parse(savedUser);

    if (user.email !== email || user.password !== password) {
        message.textContent = "Incorrect email or password.";
        return;
    }

    localStorage.setItem("loggedIn", "true");

    message.textContent = `Welcome, ${user.name}!`;

    setTimeout(() => {
        window.location.href = "./Restaurants.html";
    }, 1000);
});
