// home button functionality
displayHome()
function displayHome() {
    let homeButton = document.getElementById('home');
    homeButton.addEventListener('click', () => {
        window.location.href = '/pages/home/home.html';
    })
}

// display on click details page from details part in home
goingToDetailsPageFromHomeDetails()
function goingToDetailsPageFromHomeDetails() {
    let detailsPart = document.getElementById('detailsPart');
    detailsPart.addEventListener('click', () => {
        let image = detailsPart.getElementsByTagName('img');
        let lastImage = image[image.length - 1]
        console.log(lastImage)
        let imageId = lastImage.getAttribute('id')
        console.log(imageId)
        window.location.href = `/pages/movie_details/movie_details.html?id=${imageId}`;
    })
}

// display on double click page with details for selected movie from filmroll
// getSpecificMovieFunction is from filmRollAndDetails.js
goingToDetailsPageFromFilmRoll()
function goingToDetailsPageFromFilmRoll() {
    let movies = document.querySelectorAll('.film-frame');
    for (let movie of movies) {
        movie.addEventListener('dblclick', function () {
            console.log(movie)
            let selectedMovieId = getSpecificMovie(movie)
            window.location.href = `/pages/movie_details/movie_details.html?id=${selectedMovieId}`;
        })
    }
}

// display on click details page from movies category in home
goingToDetailsPageFromCategoryMovies()
function goingToDetailsPageFromCategoryMovies() {
    let movies = document.querySelectorAll('.movie-container');
    for (let movie of movies) {
        movie.addEventListener('click', function() {
            let imagesClass = movie.querySelectorAll('.movie-picture');
            console.log(imagesClass)
            let lastImageClass = imagesClass[imagesClass.length - 1]
            console.log(lastImageClass)
            let lastImage = lastImageClass.getElementsByTagName('img')
            let imageId = lastImage[0].getAttribute('id');
            console.log(imageId)
            
            window.location.href = `/pages/movie_details/movie_details.html?id=${imageId}`;
        })
    }
}

goingToLogInPage()
function goingToLogInPage() {
    let userIcon = document.getElementById('userIcon');
        userIcon.addEventListener('click', () => {
             window.location.href = '/pages/login_register/login_register.html'
    })
}

setPointer()
function setPointer() {
    document.getElementById('filmPart').style.cursor = 'pointer';
    document.getElementById('menuIcon').style.cursor = 'pointer';
    document.getElementById('categoriesMenuContainer').style.cursor = 'pointer';
    document.getElementById('home').style.cursor = 'pointer';
    document.getElementById('detailsPart').style.cursor = 'pointer';
    document.getElementById('categoryArrowLeft').style.cursor = 'pointer';
    document.getElementById('categoryArrowRight').style.cursor = 'pointer';
    document.getElementById('movieContainers').style.cursor = 'pointer';
    document.getElementById('userIcon').style.cursor = 'pointer';
}

// show border on images with mouse over
onHover()
function onHover() {
    let container = document.querySelectorAll('.film-frame')
    
    for (picture of container) {
        console.log(picture)
        picture.addEventListener('mouseover', function (event) {
        event.target.style.border = '7px ridge rgba(255,255,255, 1';
        })

        picture.addEventListener('mouseout', function(event) {
            event.target.style.border = 'none'
        })
    }
    
    let categoryContainer = document.querySelectorAll('.movie-container')
    console.log(categoryContainer.length)
    
    for(let i=0; i< categoryContainer.length; i++) {
        categoryContainer[i].addEventListener('mouseover', function () {
            console.log(categoryContainer[i])
            categoryContainer[i].style.border = 'solid white';
        })
        categoryContainer[i].addEventListener('mouseout', function(event) {
                event.target.style.border = 'none'
        })
    
    }
    
    
}