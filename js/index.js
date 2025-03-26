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




