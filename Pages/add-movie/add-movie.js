//API info
const baseURL = "...";

//add movie function

function addMovie(post) {
    //create a movie list
    var movieList =...

    //create a movie 
    var movie =...

        //add the details of the movie
        movie.innerHTML = post.title + post.description .....

        //append the movie to the movie list
        movieList.appendChild(movie);
}

//fetch the movie
fetch(baseURL + "/movies", { method: "POST" })
    .then(
        function (response) {
            // based on the Resonse status decide what to do
            if (response.status === 200) {
                return response.json();
                // It returns a promise that resolves with the result of parsing the body text as JSON.
                // The json() method takes a Response stream and reads it to completion.
            } else if (response.status === 403) {
                throw new Error("message: "'You need to be authenticated to be able to create a movie'");
        }
        }

    )
    .then(
        function (jsonResp) {
            // call the display function
            addMovie(jsonResp);
        }
    ).catch(function (jsonResp) {
        console.log(jsonResp);
    });
    )