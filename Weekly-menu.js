const apiBaseUrl = "https://media2.edu.metropolia.fi/restaurant/api/v1";

const getRestaurants = async () => {
  const response = await fetch(apiBaseUrl + "/restaurants");
  return await response.json();
};

const getWeeklyMenu = async (id) => {
  const response = await fetch(
    apiBaseUrl + "/restaurants/weekly/" + id + "/en"
  );
  return await response.json();
};

const showRestaurants = async () => {
  const restaurants = await getRestaurants();
  const list = document.querySelector("#restaurants");

  restaurants.forEach((restaurant) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h2>${restaurant.name}</h2>
      <button>Get weekly menu</button>
      <div class="weekly-menu-result"></div>
    `;

    list.appendChild(div);

    div.querySelector("button").addEventListener("click", async () => {
      const menu = await getWeeklyMenu(restaurant._id);
      const result = div.querySelector(".weekly-menu-result");

      result.innerHTML = "";

      menu.days.forEach((day) => {
        result.innerHTML += `<h4>${day.date}</h4>`;

        day.courses.forEach((course) => {
          result.innerHTML += `<p>${course.name}</p>`;
        });
      });
    });
  });
};

showRestaurants();