const form = document.querySelector("#profile-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");

const photo = document.querySelector("#profile-photo");
const photoInput = document.querySelector("#photo-input");
const changePhoto = document.querySelector("#change-photo");

const profile = JSON.parse(localStorage.getItem("profile")) || {};

name.value = profile.name || "";
email.value = profile.email || "";
phone.value = profile.phone || "";

if (profile.photo) {
    photo.src = profile.photo;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        photo: photo.src
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    alert("Profile saved!");
});

changePhoto.addEventListener("click", () => {
    photoInput.click();
});

photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
        photo.src = reader.result;
    };

    reader.readAsDataURL(file);
});