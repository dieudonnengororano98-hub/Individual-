const getFavorites = () => {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const list =
        document.querySelector("#favorites");

    favorites.forEach((restaurant) => {

        const div =
            document.createElement("div");

        div.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>${restaurant.address}</p>
            <p>${restaurant.city}</p>
        `;

        list.appendChild(div);
    });
};

getFavorites();