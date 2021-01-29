// 1. Menu button
//      - sa adaug funtionalitate pe click
//      - sa apara pop-up cu optiunile din meniu
//      - sa implementez paginile corespunzatoare
// 2. Home button
//      - sa ii adaug fuctionalitate pe click
// 3. Search 
//      - sa trimit la pagina de search
// 4. Log in
//      - sa trimit la pagina de log in
// 5. Film roll
//      - sa afisez filmele in interiorul lui
//      - sa implementez butoanele de previous movie/next movie, sa le fac sa dispara cand nu mai e film
//      - sa adaug functionalitate filmelor, pe click sa afiseze in partea de jos descrierea 

const baseURL = new URL('https://movies-app-siit.herokuapp.com/movies');

fetch(baseURL, {
    method: 'GET'
})
    .then(function (response) {
        return response.json()
    })
    .then(function (jsonResponse) {
        console.log(jsonResponse);
        displayMovies(jsonResponse)
        //displayMovieDetails(jsonResponse)
    })

// displayed movie's poster in the film roll
function displayMovies(result) {

    // first poster in the film roll
    let container1 = document.getElementById('firstContainer');
    let image1 = document.createElement('img');
    container1.appendChild(image1);

    image1.src = result.results[0].Poster
    console.log(result.results[0].Poster);

    // second poster in the film roll
    let container2 = document.getElementById('secondContainer');
    let image2 = document.createElement('img');
    container2.appendChild(image2);

    image2.src = result.results[1].Poster

    // third poster in the film roll
    let container3 = document.getElementById('thirdContainer');
    let image3 = document.createElement('img');
    container3.appendChild(image3);

    image3.src = result.results[2].Poster

    // fourth poster in the film roll
    let container4 = document.getElementById('fourthContainer');
    let image4 = document.createElement('img');
    container4.appendChild(image4);

    image4.src = result.results[3].Poster

    // fifth poster in the film roll
    let container5 = document.getElementById('fifthContainer');
    let image5 = document.createElement('img');
    container5.appendChild(image5);

    image5.src = result.results[4].Poster
}

function displayMoviePoster(selectedMovie) {
    let container = document.getElementById('detailsPart');

    // let title = document.createElement('h4');
    // let genre = document.createElement('p')
    console.log(selectedMovie)

    container.appendChild(selectedMovie);
}

function displayMovieDetails(result) {

}
// return selected poster to find the details about it
function getSelectedMovie(movie) {
    let selectedPoster = movie.firstChild.src
    console.log(selectedPoster)
    return selectedPoster;
}


let movies = document.querySelectorAll('.film-frame');
console.log(movies)
for (let movie of movies) {
    movie.addEventListener('click', function () {
        console.log(movie.id)
        let selectedContainer = document.getElementById(movie.id);
        let selectedImage = selectedContainer.firstChild
        console.log(selectedImage)
        let copySelectedImg = selectedImage.cloneNode()
        displayMoviePoster(copySelectedImg)
        getSelectedMovie(movie)
    })
}
