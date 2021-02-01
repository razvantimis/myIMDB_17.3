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

// - sa afisez cele 5 filme din api - done
// - pe click sa returneze id al movie-ului - done
// - sa fac functionalitatea pe click in image sa dau display la details for that movie
// - sa adaug functionalitate pe click butoanelor stanga, dreapta

const baseURL = new URL('https://movies-app-siit.herokuapp.com/movies');

let startIndex = 0;

fetch(baseURL, {
    method: 'GET'
})
    .then(function (response) {
        return response.json()
    })

    .then(function (jsonResponse) {
        // debugger
        console.log(jsonResponse);
        displayMovies(jsonResponse)

        let rightButton = document.getElementById('arrowRight');
        rightButton.addEventListener('click', function () {
            // while(startIndex < 6) {
            hidePreviousPictures()
            startIndex++;
            rightButtonFunctionality(jsonResponse)
            // }
        })

    })


// choosing the container where should be added the poster
let container;
function chooseContainer(i) {
    console.log(i)
    if (i === 0) {
        container = document.getElementById('firstContainer')
    } else if (i === 1) {
        container = document.getElementById('secondContainer')
    } else if (i === 2) {
        container = document.getElementById('thirdContainer')
    } else if (i === 3) {
        container = document.getElementById('fourthContainer')
    } else {
        container = document.getElementById('fifthContainer')
    }
    return container;

}

// displayed movie's poster in the film roll
function displayMovies(result) {
    // console.log(result.results.length)

    for (let i = 0; i < result.results.length; i++) {
        chooseContainer(i);
        let pictureCard = document.createElement('div');
        pictureCard.setAttribute('id', 'pictureCard')
        let image = document.createElement('img');
        container.appendChild(pictureCard);
        pictureCard.appendChild(image)
        image.src = result.results[i].Poster
        let moviesId = result.results[i]._id
        image.setAttribute('id', moviesId)
    }
}

//  for selected movie got details
function getMovieDetails(id) {
    let movieUrl = `https://movies-app-siit.herokuapp.com/movies/${id}`
    fetch(movieUrl, {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (jsonResponse) {
        // console.log(jsonResponse)
        displayMovieDetails(jsonResponse)
    })
}

// displayed details for selected movie 
function displayMovieDetails(result) {
    // console.log(result.Actors)
    let title = result.Title
    let description = result.Plot;
    let actors = result.Actors
    let genre = result.Genre;
    let image = result.Poster
    let container = document.getElementById('detailsPart');

    container.innerHTML = `
    <h3>Title:${title}</h3>
    <div>${description}</div>
    <div>Actors:${actors}</div>
    <div>Genre:${genre}</div>
    <img src="${image}">`
}

// displayed by default details for first movie
function displayDetailsFirstMovie() {
    let container = document.getElementById('firstContainer');
    console.log(container.getElementsByTagName('img'))
    // console.log(container.getElementsByTagName('img')[0].getAttribute('id'))

}

let movies = document.querySelectorAll('.film-frame');
// console.log(movies)
displayDetailsFirstMovie()
for (let movie of movies) {
    movie.addEventListener('click', function () {
        console.log(movie)
        console.log(movie.getElementsByTagName('img'))
        let selectedMovieId = movie.getElementsByTagName('img')[0].getAttribute('id')
        console.log(selectedMovieId)
        getMovieDetails(selectedMovieId)
    })
}

// displayed next movie in filmroll
function rightButtonFunctionality(result) {
    console.log(startIndex)
    for (let i = startIndex; i < result.results.length; i++) {
        console.log()
        chooseContainer(i - startIndex);
        let pictureCard = document.createElement('div');
        pictureCard.setAttribute('id', 'pictureCard')
        let image = document.createElement('img');
        container.appendChild(pictureCard);
        pictureCard.appendChild(image)
        image.src = result.results[i].Poster
        let moviesId = result.results[i]._id
        image.setAttribute('id', moviesId)
    }
}

// hiding previous pictures in filmroll
function hidePreviousPictures() {
    let cards = document.querySelectorAll('#pictureCard')
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'none'
    }
}