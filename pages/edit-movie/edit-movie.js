baseUrl = "https://movies-app-siit.herokuapp.com/movies/";

let titleInput = document.getElementById("titleInput");
let yearInput = document.getElementById("yearInput");
let ratingInput = document.getElementById("ratingInput");
let dateInput = document.getElementById("dateInput");
let timeInput = document.getElementById("runtimeInput");
let genreInput = document.getElementById("genreInput");
let directorInput = document.getElementById("directorInput");
let writerInput = document.getElementById("writerInput");
let actorsInput = document.getElementById("actorsInput");
let plotInput = document.getElementById("plotInput");
let languageInput = document.getElementById("languageInput");
let countryInput = document.getElementById("countryInput");
let posterInput = document.getElementById("posterInput");

const movieId = location.search.substring(4);


var data = {
    Title: titleInput.value,
    Year: yearInput.value,
    Rating: ratingInput.value,
    Date: dateInput.value,
    Time: timeInput.value,
    Genre: genreInput.value,
    Director: directorInput.value,
    Writer: writerInput.value,
    Actors: actorsInput.value,
    Plot: plotInput.value,
    Language: languageInput.value,
    Country: countryInput.value,
    Poster: posterInput.value,
};


//go to home page
function goToHome() {
    window.location.href = "/pages/home/home.html";
}


const getInputs = () => {

    fetch(baseUrl + movieId, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            titleInput.value = json.Title;
            yearInput.value = json.Year;
            ratingInput.value = json.Rating;
            dateInput.value = json.Date;
            timeInput.value = json.Time;
            genreInput.value = json.Genre;
            directorInput.value = json.Director;
            writerInput.value = json.Writer;
            actorsInput.value = json.Actors;
            plotInput.value = json.Plot;
            languageInput.value = json.Language;
            countryInput.value = json.Country;
            posterInput.value = json.Poster;

        })
        .catch((err) => console.log(err))
}


getInputs();

const editMovie = () => {

    let loginToken = localStorage.getItem("token");

    fetch("https://movies-app-siit.herokuapp.com/movies" + movieId, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "X-Auth-Token": loginToken,
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            //debugger;
            //goToHome();
        })
        .catch((err) => console.log(err));

}

var doneButton = document.getElementById("done-button");
doneButton.addEventListener("click", editMovie);




//HEADER
//go to Home page
displayHome()
function displayHome() {
    let homeButton = document.getElementById('home');
    homeButton.addEventListener('click', () => {
        window.location.href = '/pages/home/home.html';
    })
}

//go to Login page
displayLogin()
function displayLogin() {
    let homeButton = document.getElementById('userIcon');
    homeButton.addEventListener('click', () => {
        window.location.href = '/pages/login_register/login_register.html';
    })
}

setPointer();
function setPointer() {

    document.getElementById("home").style.cursor = "pointer";
    document.getElementById("userIcon").style.cursor = "pointer";
    document.getElementById("done-button").style.cursor = "pointer";
} 