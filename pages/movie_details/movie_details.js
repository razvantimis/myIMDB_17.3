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
const deleteButton = document.querySelector("#delete")
const addButton = document.querySelector("#add")
const editButton = document.querySelector("#edit")
const homeButton = document.querySelector("#home")




let token = localStorage.getItem("token");


const deleteMovie = () => {
    const shouldDeleteMovie = confirm("Are you sure you want to delete this movie?")
    if(shouldDeleteMovie){
        fetch(baseURL+moveiId, {
            headers: {
                "X-Auth-Token": token,
                "Content-Type": "application/json"
            },
            method: "DELETE",
          })
          .then((response) => {
              console.log(response); 
            
        })
          .then((json) => {
            console.log(json);
            window.location = "./../home/home.html" 
          }).catch((error)=>{
            console.log(error);
          })
    }
}

deleteButton.addEventListener("click", deleteMovie)
addButton.addEventListener("click", () => {
  window.location = "./../add-movie/add-movie.html"
})
editButton.addEventListener("click", () => {
  window.location = "./../edit-movie/edit-movie.html"
})



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

displayHome()
function displayHome() {
    let homeButton = document.getElementById('home');
    homeButton.addEventListener('click', () => {
      window.location = "./../home/home.html"
    })
}










