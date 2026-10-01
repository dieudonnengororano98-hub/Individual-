const getFavorites = () => {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const list =
        document.querySelector("#favorites");

    list.innerHTML = "";

    favorites.forEach((restaurant) => {

        const div =
            document.createElement("div");

        div.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>${restaurant.address}</p>
            <p>${restaurant.city}</p>

            <button class="remove-favorite-button">
                Remove Favorite
            </button>
        `;

        const removeButton =
            div.querySelector(".remove-favorite-button");

        removeButton.addEventListener("click", () => {

            const updatedFavorites = favorites.filter(
                (favorite) => favorite._id !== restaurant._id
            );

            localStorage.setItem(
                "favorites",
                JSON.stringify(updatedFavorites)
            );

            getFavorites();
        });

        list.appendChild(div);
    });
};

getFavorites();
