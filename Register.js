const form = document.querySelector("#register-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");

const message = document.querySelector("#register-message");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!name || !email || !password || !confirmPassword) {
        message.textContent = "Please fill in all fields.";
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        return;
    }

    const existingUser = localStorage.getItem("studentEatsUser");

    if (existingUser) {
        const user = JSON.parse(existingUser);

        if (user.email === email) {
            message.textContent = "An account with this email already exists.";
            return;
        }
    }

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("studentEatsUser", JSON.stringify(user));

    message.textContent = "Account created successfully!";

    form.reset();

    setTimeout(() => {
        window.location.href = "./Log in.html";
    }, 1000);
});