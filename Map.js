const apiUrl =
    "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";

const map = L.map("map").setView([64, 26], 5);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);

let restaurants = [];
let markers = [];

const cityFilter =
    document.querySelector("#city-filter");

const providerFilter =
    document.querySelector("#provider-filter");

const showRestaurants = () => {

    markers.forEach((marker) => {
        map.removeLayer(marker);
    });

    markers = [];

    restaurants.forEach((restaurant) => {

        if (
            cityFilter.value &&
            restaurant.city !== cityFilter.value
        ) {
            return;
        }

        if (
            providerFilter.value &&
            restaurant.company !== providerFilter.value
        ) {
            return;
        }

        const coordinates =
            restaurant.location.coordinates;

        const marker = L.marker([
            coordinates[1],
            coordinates[0]
        ])
        .addTo(map)
        .bindPopup(`
            <strong>${restaurant.name}</strong><br>
            ${restaurant.address}<br>
            ${restaurant.city}<br>
            ${restaurant.company}
        `);

        markers.push(marker);
    });
};

const getRestaurants = async () => {

    const response = await fetch(apiUrl);

    restaurants = await response.json();

    const providers = [
        ...new Set(
            restaurants
                .map((restaurant) => restaurant.company)
                .filter((company) => company)
        )
    ];

    providers.forEach((provider) => {

        providerFilter.innerHTML += `
            <option value="${provider}">
                ${provider}
            </option>
        `;
    });

    showRestaurants();
};

cityFilter.addEventListener(
    "change",
    showRestaurants
);

providerFilter.addEventListener(
    "change",
    showRestaurants
);

getRestaurants();