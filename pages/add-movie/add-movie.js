baseUrl = "https://movies-app-siit.herokuapp.com/movies";


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

//go to home page
function goToHome() {
    window.location.href = "/pages/home/home.html";
}


const addMovie = () => {

    let loginToken = localStorage.getItem("token");

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

    fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "X-Auth-Token": loginToken,
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            goToHome();
        })
        .catch((err) => console.log(err));

}


var doneButton = document.getElementById("done-button");
doneButton.addEventListener("click", addMovie);








//HEADER
//go to Home page
displayHome()
function displayHome() {
    let homeButton = document.getElementById('home');
    homeButton.addEventListener('click', () => {
        window.location.href = '/Pages/home/home.html';
    })
}

//go to Login page
displayLogin()
function displayLogin() {
    let loginButton = document.getElementById('login');
    loginButton.addEventListener('click', () => {
        window.location.href = '/Pages/login_register/login_register.html';
    })
}


setPointer();
function setPointer() {
    document.getElementById("menuButton").style.cursor = "pointer";
    document.getElementById("menuIcon").style.cursor = "pointer";
    document.getElementById("categoriesMenuContainer").style.cursor = "pointer";
    document.getElementById("home").style.cursor = "pointer";
    document.getElementById("login").style.cursor = "pointer";
    document.getElementById("searchBar").style.cursor = "pointer";
    document.getElementById("done-button").style.cursor = "pointer";
}