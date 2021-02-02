baseUrl = "https://movies-app-siit.herokuapp.com/movies";

const info = [
    titleInput = document.getElementById("titleInput"),
    typeInput = document.getElementById("typeInput"),
    yearInput = document.getElementById("yearInput"),
    posterInput = document.getElementById("posterInput")
]

// const info = document.getElementById([
//     "title",
//     "type",
//     "year",
//     "poster"
// ]);

// const info = [
//     titleInput,
//     typeInput,
//     yearInput,
//     posterInput
// ];

let data = {
    username: "RazvanTest5",
    password: "password"
};

let loginToken;

const addMovie = () => {
    var data = {
        Title: titleInput.value,
        Type: typeInput.value,
        Year: yearInput.value,
        Poster: posterInput.value
    };

    if (data.Title == "") {
        alert("Enter title!");
        return;
    }


    if (data.Type == "") {
        alert("Enter type!");
        return;
    }

    if (data.Year == "") {
        alert("Enter year!");
        return;
    }

    if (data.Poster == "") {
        alert("Enter poster URL!");
        return;
    }


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

var doneButton = document.getElementById("done-button");
var loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", login);
doneButton.addEventListener("click", addMovie);