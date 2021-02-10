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


function getValues() {

}

const editMovie = () => {

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


    fetch("https://movies-app-siit.herokuapp.com/movies/:id", {
        method: "GET",
        body: JSON.stringify(data),
        headers: {
            "X-Auth-Token": loginToken,
            "Content-Type": "application/json"
        }
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                getValues();
            })
            .catch((err) => console.log(err))
    })



    fetch("https://movies-app-siit.herokuapp.com/movies/:id", {
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
            goToHome();
        })
        .catch((err) => console.log(err));

}


var doneButton = document.getElementById("done-button");
doneButton.addEventListener("click", editMovie);








//HEADER
displayMenu()
// added functionality to menu button
function displayMenu() {
    let menuButton = document.getElementById('menuIcon');
    let menuContainer = document.getElementById('menuContainer');
    menuButton.addEventListener('click', function () {
        menuContainer.style.display = 'block';
        displayActionMovies();
        displayDramaMovies();
        displayAnimationMovies();
        displaySciFiMovies();
        displayFamilyMovies();

    })
}

function displayActionMovies() {
    let actionButton = document.getElementById('actionMovies');
    actionButton.addEventListener('click', function () {

        getMovieCategory('action')
        hideShow()

        let title = document.getElementById('moviesCategoryTitle');
        title.innerText = 'Action'
    })
}

function displayDramaMovies() {
    let dramaButton = document.getElementById('dramaMovies');
    dramaButton.addEventListener('click', function () {

        getMovieCategory('drama')
        hideShow()

        let title = document.getElementById('moviesCategoryTitle');
        title.innerText = 'Drama'
    })

}

function displayAnimationMovies() {
    let animationButton = document.getElementById('animationMovies');
    animationButton.addEventListener('click', function () {

        getMovieCategory('animation')
        hideShow()

        let title = document.getElementById('moviesCategoryTitle');
        title.innerText = 'Animation'
    })
}

function displaySciFiMovies() {
    let sciFiButton = document.getElementById('sciFiMovies');
    sciFiButton.addEventListener('click', function () {

        getMovieCategory('sci-fi')
        hideShow()

        let title = document.getElementById('moviesCategoryTitle');
        title.innerText = 'Sci-Fi'
    })
}

function displayFamilyMovies() {
    let familyButton = document.getElementById('familyMovies');
    familyButton.addEventListener('click', function () {

        getMovieCategory('family');
        hideShow()

        let title = document.getElementById('moviesCategoryTitle');
        title.innerText = 'Family'
    })
}


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


// hiding menuContainer when the user clicks outside of the container
hideMenuContainer()
function hideMenuContainer() {
    document.onclick = function (event) {
        let menuIcon = document.getElementById('menuIcon');
        if (event.target !== menuIcon) {
            menuContainer.style.display = 'none';
        }
    }
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