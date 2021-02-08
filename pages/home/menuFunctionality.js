// debugger
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
        setCategory('Action')
    })
}

function displayDramaMovies() {
    let dramaButton = document.getElementById('dramaMovies');
    dramaButton.addEventListener('click', function () {
        setCategory('Drama')
    })
}

function displayAnimationMovies() {
    let animationButton = document.getElementById('animationMovies');
    animationButton.addEventListener('click', function () {
        setCategory('Animation')
    })
}

function displaySciFiMovies() {
    let sciFiButton = document.getElementById('sciFiMovies');
    sciFiButton.addEventListener('click', function () {
        setCategory('Sci-Fi')
    })
}

function displayFamilyMovies() {
    let familyButton = document.getElementById('familyMovies');
    familyButton.addEventListener('click', function () {
        setCategory('Family')
    })
}

function setCategory(genre) {
    console.log(genre)
    document.getElementById('contentPart').style.backgroundColor = 'rgb(58,58,58)';
    getMovieCategory(genre);
    hideShow()
    hidePreviousCategoryPictures()
    let title = document.getElementById('moviesCategoryTitle');
    title.innerText = genre
}

// hiding/ showing what is necessary when moviesCategory is accesed
function hideShow() {
    document.getElementById('detailsPart').style.display = 'none';
    document.getElementById('moviesCategory').style.display = 'block';
    document.getElementById('menuContainer').style.display = 'none';
}

let categoryNextIndex = 0;
let categoryPreviousIndex = 0;

function getMovieCategory(genre) {
    const moviesCategoryUrl = `https://movies-app-siit.herokuapp.com/movies?Genre=${genre}`

    fetch(moviesCategoryUrl, {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (jsonResponse) {
        console.log(jsonResponse)
       
        displayCategoryMovies(jsonResponse);
        accessRightButton(jsonResponse)
        accessLeftButton(jsonResponse)
    })
}

// right arrow functionality
function accessRightButton(jsonResponse) {
    let categoryRightButton = document.getElementById('categoryArrowRight');

    categoryRightButton.addEventListener('click', function () {
        if (categoryNextIndex < 2) {
            hidePreviousCategoryPictures();
            categoryNextIndex++;
            categoryRightButtonFunctionality(jsonResponse, categoryNextIndex)
            
        } else {
            categoryRightButton.style.display = 'none'
        }
        // if leftArrow is clicked before rightArrow, this display it back when rightArrow is clicked
        document.getElementById('categoryArrowLeft').style.display = 'block';

        categoryPreviousIndex = categoryNextIndex;
        // hiding rightArrow when the last movie is displayed before click 
        if (categoryNextIndex >= 2) {
            categoryRightButton.style.display = 'none'
        }
    })
}
// left arrow functionality
function accessLeftButton(jsonResponse) {
    let categoryLeftButton = document.getElementById('categoryArrowLeft');
    categoryLeftButton.addEventListener('click', function () {
        if (categoryPreviousIndex === 0) {
            categoryLeftButton.style.display = 'none';
        } else {
            hidePreviousCategoryPictures()
            categoryLeftButtonFunctionality(jsonResponse)
            categoryPreviousIndex--;
        }

        // displayed rightArrow(if is hidden) when leftArrow is clicked
        document.getElementById('categoryArrowRight').style.display = 'block';

        // hiding leftArrow when the first movie is displayed before click
        if (categoryPreviousIndex === 0) {
            categoryLeftButton.style.display = 'none';
        }

        // initialize categoryNextIndex
        categoryNextIndex = categoryPreviousIndex
    })
}

// set html container for movies
function displayCategoryMovies(result) {
    for (let i = 0; i < result.results.length - 2; i++) {
        setHtmlContainer(i, result)
    }
}

function setHtmlContainer(i, result) {
    let container = chooseCategoryContainer(i)
    console.log(container)

    let pictureCard = document.createElement('div');
    pictureCard.setAttribute('class', 'movie-picture')
    let image = document.createElement('img');
    pictureCard.appendChild(image);
    let id = result.results[i]._id;
    image.setAttribute('id', id);

    let details = document.createElement('div');
    details.setAttribute('class', 'movie-details')
    container.append(pictureCard, details)

    image.src = result.results[i].Poster;
    let rating = result.results[i].imdbRating;
    let title = result.results[i].Title

    details.innerHTML = `
        <i class="fa fa-star"></i>
        <span>${rating}</span>
        <div>${title}</div>`

}

// set the container for each movie
function chooseCategoryContainer(i) {
    let container;
    console.log(i)
    if (i === 0) {
        container = document.getElementById('movieContainer1');
    } else if (i === 1) {
        container = document.getElementById('movieContainer2');
    } else if (i === 2) {
        container = document.getElementById('movieContainer3');
    } else if (i === 3) {
        container = document.getElementById('movieContainer4');
    } else if (i === 4) {
        container = document.getElementById('movieContainer5');
    } else if (i === 5) {
        container = document.getElementById('movieContainer6');
    } else if (i === 6) {
        container = document.getElementById('movieContainer7');
    } else if (i === 7) {
        container = document.getElementById('movieContainer8');
    }
    return container;
}

function categoryRightButtonFunctionality(result, categoryNextIndex) {
    console.log(categoryNextIndex)
    for (let i = categoryNextIndex; i < result.results.length - 2 + categoryNextIndex; i++) {
        let container = chooseCategoryContainer(i - categoryNextIndex);
        setContainerCategoryPreviousNextMovies(i, container, result)
    }
}

function categoryLeftButtonFunctionality(result) {
    console.log(categoryPreviousIndex)
    let reduceIndex = categorySetReduceIndex(categoryPreviousIndex);
    for (let i = result.results.length - reduceIndex; i >= categoryPreviousIndex - 1; i--) {
        let container = chooseCategoryContainer(i - categoryPreviousIndex + 1);
        setContainerCategoryPreviousNextMovies(i, container, result);
    }
}

function categorySetReduceIndex(categoryPreviousIndex) {
    let reduceIndex;
    if (categoryPreviousIndex == 1) {
        reduceIndex = 3;
    } else if (categoryPreviousIndex == 2) {
        reduceIndex = 2;
    }
    return reduceIndex;
}

function setContainerCategoryPreviousNextMovies(i, container, result) {
    let pictureCard = document.createElement('div');
    pictureCard.setAttribute('class', 'movie-picture')
    let image = document.createElement('img');
    pictureCard.appendChild(image);
    let id = result.results[i]._id;
    image.setAttribute('id', id);

    let details = document.createElement('div');
    details.setAttribute('class', 'movie-details')
    container.append(pictureCard, details)

    image.src = result.results[i].Poster;
    let rating = result.results[i].imdbRating;
    let title = result.results[i].Title

    details.innerHTML = `
            <i class="fa fa-star"></i>
            <span>${rating}</span>
            <div>${title}</div>`
}

function hidePreviousCategoryPictures() {
    let pictureCards = document.querySelectorAll('.movie-picture')
    console.log(pictureCards)
    for (let i = 0; i < pictureCards.length; i++) {
        pictureCards[i].style.display = 'none'
    }

    let details = document.querySelectorAll('.movie-details');
    for (let i = 0; i < details.length; i++) {
        details[i].style.display = 'none'
    }
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
