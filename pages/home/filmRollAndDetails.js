const baseURL = new URL('https://movies-app-siit.herokuapp.com/movies');

let nextIndex = 0;
let previousIndex = 0;

fetch(baseURL, {
    method: 'GET'
})
    .then(function (response) {
        return response.json()
    })
    .then(function (jsonResponse) {
        displayMovies(jsonResponse)
        displayDetailsFirstMovie(jsonResponse)

        let rightButton = document.getElementById('arrowRight');
        rightButton.addEventListener('click', function () {
            // hiding the rightButton when movie list is ended
            if (nextIndex < 5) {
                hidePreviousPictures()
                nextIndex++;
                rightButtonFunctionality(jsonResponse)
            } else {
                rightButton.style.display = 'none';
            }
            previousIndex = nextIndex

            // if leftArrow is clicked before rightArrow, this display it back when rightArrow is clicked
            document.getElementById('arrowLeft').style.display = 'block';

            // hiding rightArrow when the last movie is displayed before click 
            if (nextIndex >= 5) {
                rightButton.style.display = 'none';
            }
        })

        let leftButton = document.getElementById('arrowLeft');
        leftButton.style.display = 'block';

        leftButton.addEventListener('click', function () {

            if (previousIndex === 0) {
                leftButton.style.display = 'none';
            } else if (previousIndex > 0) {
                leftButton.style.display = 'block';
                hidePreviousPictures();
                leftButtonFunctionality(jsonResponse);
                previousIndex--;
            }

            // displayed rightArrow(if is hidden) when leftArrow is clicked
            document.getElementById('arrowRight').style.display = 'block';

            // hiding leftButton when first movie is displayed before click
            if (previousIndex === 0) {
                leftButton.style.display = 'none';
            }
            // initialized nextIndex 
            nextIndex = previousIndex
        })
    })

// choosing the container where should be added the poster
function chooseContainer(i) {
    let container;
    console.log(i)
    if (i === 0) {
        container = document.getElementById('firstContainer')
    } else if (i === 1) {
        container = document.getElementById('secondContainer')
    } else if (i === 2) {
        container = document.getElementById('thirdContainer')
    } else if (i === 3) {
        container = document.getElementById('fourthContainer')
    } else if (i === 4) {
        container = document.getElementById('fifthContainer')
    }
    return container;
}

// displayed movie's poster in the film roll
function displayMovies(result) {

    for (let i = 0; i < 5; i++) {
        let container = chooseContainer(i)
        let pictureCard = document.createElement('div');
        pictureCard.setAttribute('class', 'picture-card')
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
    let title = result.Title
    let description = result.Plot;
    let actors = result.Actors
    let genre = result.Genre;
    let image = result.Poster
    let container = document.getElementById('detailsPart');
    let textContainer = document.createElement('div');
    textContainer.setAttribute('id', 'detailsPartText');
    container.appendChild(textContainer);

    textContainer.innerHTML = `
    <h3>Title: ${title}</h3>
    <div>${description}</div>
    <div><b>Actors</b>:  ${actors}</div>
    <div><b>Genre</b>:  ${genre}</div>`

    let imgContainer = document.createElement('div');
    imgContainer.setAttribute('id', 'detailsPartImg');
    container.appendChild(imgContainer)
    imgContainer.innerHTML = `<img src="${image}">`
}

// displayed by default details for first movie
function displayDetailsFirstMovie(result) {
    let firstMovieId = result.results[0]._id;
    console.log(firstMovieId)
    getMovieDetails(firstMovieId)
}

let movies = document.querySelectorAll('.film-frame');
for (let movie of movies) {
    movie.addEventListener('click', function () {
        console.log(movie)

        let selectedContainer = movie.getElementsByTagName('img')
        let lastMovie = selectedContainer[selectedContainer.length - 1]
        console.log(lastMovie)
        let selectedMovieId = lastMovie.getAttribute('id')
        console.log(selectedMovieId)
        getMovieDetails(selectedMovieId)
        hidePreviousDetails()
    })
}

// displayed next movie in filmroll
// nextIndex e numarul de cate ori da click pe sageata dreapta
// conditia din for: initial sunt afisate filmele index 0-4, deci cand nu s-a dat click sa afiseze pana cand i < 5 (nextIndex=0)
// cand se da click nextIndex creste cu 1 asta inseamna ca vrem sa afisam cate un film in plus din lista de 10(result.results.length)
function rightButtonFunctionality(result) {
    console.log(nextIndex)
    for (let i = nextIndex; i < result.results.length - 5 + nextIndex; i++) {
        let container = chooseContainer(i - nextIndex);
        setContainerPreviousNextMovies(i, container, result)
    }
}
// displayed previous movie in filmroll
// reduceIndex e pentru a putea accesa ultimul film din cele 10 filme(result.results.length) pe care dorim sa il afisam
// previousIndex reprezinta numarul de cate ori se poate da click pe sageata din stanga pana sa ajunga la primul film
function leftButtonFunctionality(result) {
    console.log(previousIndex)
    setReduceIndex(previousIndex)
    for (let i = result.results.length - reduceIndex; i >= previousIndex - 1; i--) {
        let container = chooseContainer(i - previousIndex + 1);
        setContainerPreviousNextMovies(i, container, result);
    }
}

function setReduceIndex(previousIndex) {
    if (previousIndex == 1) {
        reduceIndex = 6;
    } else if (previousIndex == 2) {
        reduceIndex = 5;
    } else if (previousIndex == 3) {
        reduceIndex = 4;
    } else if (previousIndex == 4) {
        reduceIndex = 3;
    } else {
        reduceIndex = 2;
    }
}

// displayed movies in filmroll when left/right arrows are clicked
function setContainerPreviousNextMovies(i, container, result) {
    let pictureCard = document.createElement('div');
    pictureCard.setAttribute('class', 'picture-card')
    let image = document.createElement('img');
    container.appendChild(pictureCard);
    pictureCard.appendChild(image)
    image.src = result.results[i].Poster
    let moviesId = result.results[i]._id
    image.setAttribute('id', moviesId)
}

// hiding previous pictures in filmroll
function hidePreviousPictures() {
    let cards = document.querySelectorAll('.picture-card')
    console.log(cards)
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = 'none'
    }
}

// hiding previous details about the film was clicked in filmroll
function hidePreviousDetails() {
    let containers = document.querySelectorAll('#detailsPartText');
    for(let i = 0; i < containers.length; i++) {
        containers[i].style.display = 'none';
    }
}