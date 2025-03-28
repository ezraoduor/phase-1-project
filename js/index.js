document.addEventListener("DOMContentLoaded", () => {
    fetchMovies();
    fetchFavorites();
});


function fetchMovies() {
    fetch("https://json-server-verce.vercel.app/favorites")
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
            <button onclick="addToFavorites('${movie.id}', '${movie.title}', '${movie.poster}', '${movie.description}')">Add to Favorites</button>
        `;

        movieList.appendChild(movieCard);
    });
}


document.getElementById("searchBox").addEventListener("input", function() {
    let searchQuery = this.value.toLowerCase();

    fetch("https://json-server-verce.vercel.app/favorites")
        .then(response => response.json())
        .then(data => {
            let filteredMovies = data.filter(movie => 
                movie.title.toLowerCase().includes(searchQuery)
            );
            displayMovies(filteredMovies);
        });
});


function addToFavorites(id, title, poster, description) {
    let newFavorite = { id, title, poster, description };

    fetch("https://json-server-verce.vercel.app/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFavorite)
    })
    .then(() => fetchFavorites())  
    .catch(error => console.error("Error adding to favorites:", error));
}


function fetchFavorites() {
    fetch("https://json-server-verce.vercel.app/favorites")
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
    fetch(`https://json-server-verce.vercel.app/favorites/${id}`, {
        method: "DELETE"
    })
    .then(() => fetchFavorites())  
    .catch(error => console.error("Error removing from favorites:", error));
}


document.getElementById("addMovieBtn").addEventListener("click", function() {
    let title = document.getElementById("title").value;
    let poster = document.getElementById("poster").value;
    let description = document.getElementById("description").value;

    if (!title || !poster || !description) {
        alert("Please fill in all fields!");
        return;
    }

    let newMovie = { id: Date.now().toString(), title, poster, description };

    fetch("https://json-server-verce.vercel.app/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie)
    })
    .then(() => {
        fetchMovies();  
        document.getElementById("title").value = "";
        document.getElementById("poster").value = "";
        document.getElementById("description").value = "";
    })
    .catch(error => console.error("Error adding movie:", error));
});
