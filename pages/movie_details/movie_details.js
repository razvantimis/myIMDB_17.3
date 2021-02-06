const baseURL = "https://movies-app-siit.herokuapp.com/movies/";
const moveiId = location.search.substring(4)
const movieTitle = document.querySelector('#movieTitle')
const movieDescription = document.querySelector('#description')
const moviePoster = document.querySelector('#moviePoster')
const movieActors = document.querySelector("#movieActors")
const movieYear = document.querySelector("#movieYear")
const movieRuntime = document.querySelector("#movieRuntime")
const movieGenre = document.querySelector("#movieGenre")
const imdbRating = document.querySelector("#imdbRating")
const imdbVotes = document.querySelector("#imdbVotes")

const getMovies = () => {
  fetch(baseURL+moveiId, {
    method: "GET",
  })
  .then((response) => response.json())
  .then((json) => {
    const movie = json;
    movieTitle.textContent = json.Title
    movieDescription.textContent = json.Plot
    moviePoster.src= json.Poster
    movieActors.textContent = json.Actors
    movieYear.textContent = json.Year
    movieRuntime.textContent = json.Runtime
    movieGenre.textContent = json.Genre
    imdbRating.textContent = json.imdbRating
    imdbVotes.textContent = json.imdbVotes
    console.log(movie);
  })
}
getMovies()








