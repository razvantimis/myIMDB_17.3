//API info
const baseURL = "...";


function getInputsValues(titleInput, yearInput, typeInput, posterInput) {
    var titleInput = getElementById(titleInput).value;
    var yearInput = getElementById(yearInput).value;
    var typeInput = getElementByClass(typeInput).value;
    var posterInput = getElementById(posterInput).value;
}


function addMovie(titleInput, yearInput, typeInput, posterInput) {
    fetch(baseURL + "/movies", { method: "POST" })
        .then(
            function (response) {
                if (response.status === 200) {
                    console.log(response.json());
                    return response.json();
                } else if (response.status === 403) {
                    throw new Error("message: 'You need to be authenticated to be able to create a movie'");
                }
            }

        )
        .then(
            function (jsonResp) {
                console.log(jsonResp)
            }

        )
}

// document.getElementById("done-button").addEventListener("click", displayMovie);

// function displayMovie() {
//     console.log(jsonResp);
// }