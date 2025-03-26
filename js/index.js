function fetchMovies() {
    fetch("http://localhost:3000/favorites")
        .then(response => response.json())
        .then(data => displayMovies(data))
        .catch(error => console.error("Error fetching movies:", error));
}