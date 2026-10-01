const apiBaseUrl = "https://media2.edu.metropolia.fi/restaurant/api/v1";

const getRestaurants = async () => {
  const response = await fetch(apiBaseUrl + "/restaurants");
  return await response.json();
};

const getDailyMenu = async (id) => {
  const response = await fetch(
    apiBaseUrl + "/restaurants/daily/" + id + "/en"
  );
  return await response.json();
};

const showRestaurants = async () => {
  const restaurants = await getRestaurants();
  const list = document.querySelector("#restaurants");

  restaurants.forEach((restaurant) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${restaurant.name}</h3>

      <button class="daily-menu-button">
        Get daily menu
      </button>

      <button class="favorite-button">
        Favorite
      </button>

      <div class="daily-menu-result"></div>
    `;

    list.appendChild(div);

    
    div
      .querySelector(".daily-menu-button")
      .addEventListener("click", async () => {
        const menu = await getDailyMenu(restaurant._id);
        const result = div.querySelector(".daily-menu-result");

        result.innerHTML = "";

        menu.courses.forEach((course) => {
          result.innerHTML += `<p>${course.name}</p>`;
        });
      });

  
    div
      .querySelector(".favorite-button")
      .addEventListener("click", () => {
        const favorites =
          JSON.parse(localStorage.getItem("favorites")) || [];

        const alreadyFavorite = favorites.some(
          (favorite) => favorite._id === restaurant._id
        );

        if (!alreadyFavorite) {
          favorites.push(restaurant);

          localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
          );

          console.log("Favorite saved:", restaurant.name);
        } else {
          console.log("Already a favorite:", restaurant.name);
        }
      });
  });
};

showRestaurants();
