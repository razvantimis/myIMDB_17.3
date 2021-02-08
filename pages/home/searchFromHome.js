getValueFromInput()
function getValueFromInput() {
    document.getElementById('searchBar').addEventListener('keydown', function (event) {
        console.log(event.key);
        if (event.key === 'Enter') {
            event.preventDefault()
            let inputValue = document.getElementById('searchBar').value;
            requestMovies(inputValue)
        }
    })
}

function requestMovies(inputValue) {
    console.log(inputValue);

    const moviesInputUrl = `https://movies-app-siit.herokuapp.com/movies?Title=${inputValue}`

    fetch(moviesInputUrl, {
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        return response.json()
    }).then(function (jsonResponse) {
        console.log(jsonResponse)

        displayAgainMovieContainers()
        hidePreviousCategoryPictures()
        showArrows()

        // situation when result is at least 10
        if (jsonResponse.results.length >= 10) {
            // function displayCategoryMovies and access buttons are from menuFunctionality.js
            setTitle(inputValue)
            displayCategoryMovies(jsonResponse)
            accessLeftButton(jsonResponse);
            accessRightButton(jsonResponse);

            // situation when result is 9
        } else if (jsonResponse.results.length === 9) {
            setTitle(inputValue)
            handelingSituationWith9Movies(jsonResponse);

            // situation when result is betwwen 1 and 8
        } else if (jsonResponse.results.length > 0 && jsonResponse.results.length < 9) {
            setTitle(inputValue)
            handelingLessMovies(jsonResponse);

            // situation when result is 0
        } else {
            hideEmptyContainers(jsonResponse)
            hideArrows()
            displayErrorMessage(inputValue);
        }
        styleDisplay()
    })
}

// handeling the situation: after no result would be style.display = 'none' on movie-container even when 
// the input is changed and has result
function displayAgainMovieContainers() {
    let containers = document.querySelectorAll('.movie-container');
    console.log(containers)
    for (container of containers) {
        container.style.display = 'block'
    }
}

function styleDisplay() {
    document.getElementById('contentPart').style.backgroundColor = 'rgb(58,58,58)';
    document.getElementById('detailsPart').style.display = 'none';
    document.getElementById('moviesCategory').style.display = 'block';
    document.querySelector('form').reset()
}

// handeling the situation when the result from API is smaller than 8 movies
// function setHtmlContainer is from menuFunctionality.js
function handelingLessMovies(result) {
    if (result.results.length <= 8) {
        for (let i = 0; i < result.results.length; i++) {
            setHtmlContainer(i, result);
        }
    }
    hideEmptyContainers(result);
    hideArrows()
}

function handelingSituationWith9Movies(result) {
    for (let i = 0; i < result.results.length - 1; i++) {
        setHtmlContainer(i, result);
    }
}

function displayErrorMessage(inputValue) {
    let title = document.getElementById('moviesCategoryTitle');
    title.innerText = 'There are no movies that contain ' + '"' + inputValue + '"';
}

function setTitle(inputValue) {
    let title = document.getElementById('moviesCategoryTitle');
    title.innerText = 'There are movies that contain ' + '"' + inputValue + '"' + ' in the title:'
}

// handeling the situation when the result from search is less then 8
// hiding empty containers
function hideEmptyContainers(result) {
    let containers = document.querySelectorAll('.movie-container');
    console.log(containers)

    iterateInContainers(containers, result.results.length)
}

function iterateInContainers(containers, startHiding) {
    for (let i = startHiding; i < containers.length; i++) {
        containers[i].style.display = 'none';
    }
}

function hideArrows() {
    document.getElementById('categoryArrowLeft').style.display = 'none';
    document.getElementById('categoryArrowRight').style.display = 'none';
}

function showArrows() {
    document.getElementById('categoryArrowLeft').style.display = 'block';
    document.getElementById('categoryArrowRight').style.display = 'block';
}