// home button functionality
displayHome()
function displayHome() {
    let homeButton = document.getElementById('home');
    homeButton.addEventListener('click', () => {
        window.location.href = '/Pages/home/home.html';
    })
}

// goingToDetailsPage()
// function goingToDetailsPage() {
//     let detailsPart = document.getElementById('detailsPart');
//     detailsPart.addEventListener('click', () => {
//         window.location.href = '/pages/movie_details/movie_details.html';
//     })
// }

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

