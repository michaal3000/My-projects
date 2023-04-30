const body = document.querySelector("body");
const toggleBtn = document.querySelector("#toggle-btn");
toggleBtn.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
});

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const resultSection = document.getElementById("resultSection");
let ratingElement = document.getElementsByClassName("card-rating");

function convertRating(rating) {
  return rating * 20;
}

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    getResults(searchInput.value);
  }
});

searchBtn.addEventListener("click", () => getResults(searchInput.value));

const getResults = function (gameName) {
  resultSection.innerHTML = "";
  fetch(
    `https://api.boardgameatlas.com/api/search?name=${searchInput.value}&client_id=SeOWjsLlrG`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.games.length === 0) {
        const noResults = document.createElement("h1");
        noResults.textContent = "No results";
        resultSection.appendChild(noResults);
      } else {
        console.log(data);

        const games = data.games
          .sort(
            (a, b) =>
              convertRating(b.average_user_rating) -
              convertRating(a.average_user_rating)
          )
          .forEach((game) => {
            const gameRating = Math.floor(
              convertRating(game.average_user_rating)
            );

            const newCard = document.createElement("div");
            newCard.className = "card";
            newCard.innerHTML = `
              <img src="${game.images.small}" alt="${game.name}" class="card-image">
              <div class="card-content">
              <div class="card-heading">
      <h3>${game.name}</h3>
      <div class="card-rating">${gameRating}</div>
      </div>
      <div class="card-players">
      <i class="fa-solid fa-users"></i>${game.players} players
      </div>
      <div class="card-time">
      <i class="fa-solid fa-clock"></i>${game.playtime} minutes
      </div>
      </div>
      `;

            let ratingElement = newCard.querySelector(".card-rating");
            let backgroundColor;

            switch (true) {
              case gameRating <= 40:
                backgroundColor = "red";
                break;
              case gameRating < 70:
                backgroundColor = "yellow";
                break;
              case gameRating >= 70:
                backgroundColor = "green";
                break;
              default:
                backgroundColor = "#CCCCCC";
            }

            ratingElement.style.backgroundColor = backgroundColor;
            resultSection.appendChild(newCard);
          });
      }
    });
};

//Documentation
// The first section selects the body element and toggle button and creates an event listener. The event listener toggles the dark-mode class on the body element when the toggle button is clicked.

// The second section selects the search input, search button, and result section elements. It also creates a function that will convert a game's rating to a percentage value.

// The third section adds event listeners to the search input and search button that will run the getResults function when either the enter key is pressed or the button is clicked.

// The getResults function starts by clearing the result section HTML. It then makes a fetch call to an API that returns games with names that match a user-input search term. If the API response has no results, a "No results" message is added to the result section. If there are results, the function sorts the games by rating and creates a new div element for each game. Each game div element includes an image, game name, rating, number of players, and playtime. The game rating color changes based on a switch statement that evaluates the rating percentage value. Finally, the new card elements are added to the result section.
