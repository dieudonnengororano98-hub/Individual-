const apiUrl =
    "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

const restaurantContainer =
    document.querySelector("#restaurants");

const getRestaurants = async () => {

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch restaurants");
        }

        const restaurants = await response.json();

        restaurantContainer.innerHTML = "";

        restaurants.forEach((restaurant) => {

            const restaurantElement =
                document.createElement("div");

            restaurantElement.className = "restaurant";

            restaurantElement.innerHTML = `
                <h2>${restaurant.name}</h2>
                <p>${restaurant.address || ""}</p>
                <p>${restaurant.city || ""}</p>
                <button
                    class="daily-menu-button"
                    data-id="${restaurant._id}"
                >
                    View daily menu
                </button>
                <div
                    class="daily-menu-content"
                    id="menu-${restaurant._id}"
                ></div>
            `;

            restaurantContainer.appendChild(
                restaurantElement
            );
        });

        const buttons =
            document.querySelectorAll(".daily-menu-button");

        buttons.forEach((button) => {

            button.addEventListener("click", () => {
                getDailyMenu(button.dataset.id);
            });

        });

    } catch (error) {

        console.error(error);

        restaurantContainer.innerHTML = `
            <p>
                Unable to load restaurants.
                Please try again later.
            </p>
        `;
    }
};


const getDailyMenu = async (restaurantId) => {

    const menuContainer =
        document.querySelector(`#menu-${restaurantId}`);

    const apiUrl =
        `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${restaurantId}/en`;

    try {

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch daily menu");
        }

        const menu = await response.json();

        menuContainer.innerHTML = "";

        if (!menu || menu.length === 0) {
            menuContainer.innerHTML =
                "<p>No daily menu available.</p>";

            return;
        }

        menu.forEach((item) => {

            const menuItem =
                document.createElement("div");

            menuItem.className = "menu-item";

            menuItem.innerHTML = `
                <h3>${item.name || "Menu"}</h3>
                <p>${item.description || ""}</p>
                <p>${item.price || ""}</p>
            `;

            menuContainer.appendChild(menuItem);
        });

    } catch (error) {

        console.error(error);

        menuContainer.innerHTML = `
            <p>
                Daily menu could not be loaded.
            </p>
        `;
    }
};


getRestaurants();
