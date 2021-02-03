baseUrl = "https://movies-app-siit.herokuapp.com/movies";

const info = [
    titleInput = document.getElementById("titleInput"),
    //typeInput = document.getElementById("typeInput"),
    yearInput = document.getElementById("yearInput"),
    ratingInput = document.getElementById("ratingInput"),
    dateInput = document.getElementById("dateInput"),
    timeInput = document.getElementById("runtimeInput"),
    genreInput = document.getElementById("genreInput"),
    directorInput = document.getElementById("directorInput"),
    writerInput = document.getElementById("writerInput"),
    actorsInput = document.getElementById("actorsInput"),
    plotInput = document.getElementById("plotInput"),
    languageInput = document.getElementById("languageInput"),
    countryInput = document.getElementById("countryInput"),
    posterInput = document.getElementById("posterInput")
]

let data = {
    username: "RazvanTest5",
    password: "password"
};

let loginToken;

const addMovie = () => {
    var data = {
        Title: titleInput.value,
        //Type: typeInput.value,
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

    // if (data.Title == "") {
    //     alert("Enter title!");
    //     return;
    // }


    // if (data.Type == "") {
    //     alert("Enter type!");
    //     return;
    // }

    // if (data.Year == "") {
    //     alert("Enter year!");
    //     return;
    // }

    // if (data.Poster == "") {
    //     alert("Enter poster URL!");
    //     return;
    // }


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
        })
        .catch((err) => console.log(err));
}

const login = () => {
    console.log("login started");
    fetch("https://movies-app-siit.herokuapp.com/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((json) => {
            console.log("logged in", json);
            loginToken = json.accessToken;
        })
        .catch((err) => console.log(err));
};

// const redirectLoginPage = () => {
//     console.log("redirect on login page");
//     //window.location.href = "../Pages/login_register/login_register.html";
// }

var doneButton = document.getElementById("done-button");
var loginButton = document.getElementById("login-button");


//loginButton.addEventListener("click", redirectLoginPage);
loginButton.addEventListener("click", login);
doneButton.addEventListener("click", addMovie);