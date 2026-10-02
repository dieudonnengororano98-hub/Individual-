const apiUrl = "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

let restaurants = [];

const search = document.querySelector("#search-input");
const city = document.querySelector("#city-filter");
const provider = document.querySelector("#provider-filter");
const button = document.querySelector("#search-button");
const sort = document.querySelector("#sort-filter");
const list = document.querySelector("#restaurant-list");

const showRestaurants = (data) => {
    list.innerHTML = "";

    data.forEach((restaurant) => {
        const div = document.createElement("div");

        div.className = "restaurant-card";

        div.innerHTML = `
            <h2>${restaurant.name}</h2>
            <p>${restaurant.address}</p>
            <p>${restaurant.city}</p>
        `;

        list.appendChild(div);
    });
};

const filterRestaurants = () => {
    let result = restaurants.filter((restaurant) => {

        const name = restaurant.name.toLowerCase();
        const searchText = search.value.toLowerCase();

        return (
            name.includes(searchText) &&
            (city.value === "" || restaurant.city === city.value) &&
            (provider.value === "" ||
                restaurant.company === provider.value)
        );
    });

    if (sort.value === "name") {
        result.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sort.value === "city") {
        result.sort((a, b) =>
            a.city.localeCompare(b.city)
        );
    }

    showRestaurants(result);
};

const getRestaurants = async () => {

    const response = await fetch(apiUrl);

    restaurants = await response.json();

    restaurants.forEach((restaurant) => {

        if (
            restaurant.city &&
            !city.innerHTML.includes(restaurant.city)
        ) {
            city.innerHTML += `
                <option value="${restaurant.city}">
                    ${restaurant.city}
                </option>
            `;
        }

        if (
            restaurant.company &&
            !provider.innerHTML.includes(restaurant.company)
        ) {
            provider.innerHTML += `
                <option value="${restaurant.company}">
                    ${restaurant.company}
                </option>
            `;
        }
    });

    showRestaurants(restaurants);
};

button.addEventListener("click", filterRestaurants);

sort.addEventListener("change", filterRestaurants);

getRestaurants();