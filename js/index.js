function fetchMovies() {
    fetch("http://localhost:3000/favorites")
    .then(response => response.json())
    .then(data => displayMovies(data))
    .catch(error => console.error("Error fetching movies:", error));
}

function displayMovies(movies) {
    let movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";

    movies.forEach(movie => {
    let movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    movieCard.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <p>${movie.description}</p>
    <button onclick="addToFavorites('${movie.id}', '${movie.title}', '${movie.poster}')">Add to Favorites</button>
`;

    movieList.appendChild(movieCard);
});
}

document.getElementById("searchBox").addEventListener("input", function() {
    let searchQuery = this.value.toLowerCase();
    
    fetch("http://localhost:3000/favorites")
    .then(response => response.json())
    .then(data => {
        let filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(searchQuery));
        displayMovies(filteredMovies);
});
});

function addToFavorites(id, title, poster) {
    fetch("http://localhost:3000/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, poster })
})
    .then(() => fetchFavorites())  // Refresh favorites
    .catch(error => console.error("Error adding to favorites:", error));
}
function fetchFavorites() {
    fetch("http://localhost:3000/favorites")
    .then(response => response.json())
    .then(data => {
 let favoriteList = document.getElementById("favorite-list");
favoriteList.innerHTML = "";

data.forEach(movie => {
let movieCard = document.createElement("div");
movieCard.classList.add("movie-card");

 movieCard.innerHTML = `
<img src="${movie.poster}" alt="${movie.title}">
 <h3>${movie.title}</h3>
<button onclick="removeFromFavorites('${movie.id}')">Remove</button>
 `;

favoriteList.appendChild(movieCard);
 });
});
}

function removeFromFavorites(id) {
fetch(`http://localhost:3000/favorites/${id}`, {
    method: "DELETE"
})
    .then(() => fetchFavorites())  // Refresh favorites
    .catch(error => console.error("Error removing from favorites:", error));
}

