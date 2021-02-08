const baseUrl = "https://movies-app-siit.herokuapp.com";
const loginPath = "/auth/login";
const logOutPath = "/auth/logout"
const registerPath = "/auth/register";
const errorMessage = document.getElementById("errorMessage");



console.log("localtoken:" , localStorage.getItem("token"))

function parseResponse(response) {
  if (response.status === 200) {
    errorMessage.innerHtml = "";
    return response.json();
  
  } else {
    throw new Error("");

  }
}

function navigateToHomePage() {
  window.location.href = "/pages/home/home.html";
}

function navigateToLoginPage(){
  window.location.href = "/pages/login_register/login_register.html"
}

function accountData(usernameParam, passwordParam) {
  var username = document.getElementById(usernameParam).value;
  var password = document.getElementById(passwordParam).value;
  
  var object = {
    username: username,
    password: password,
  }
  return object;
}

var loginButton = document.getElementById('loginButton');
loginButton.addEventListener("click", function () {
  var responseData = accountData("username", "password");
  
  fetch(baseUrl + loginPath, {
    method: "POST", headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(responseData)
  })
    .then(parseResponse)
    .then((response) => {
      navigateToHomePage();
      localStorage.setItem("token", response.accessToken);
})
    .catch(error => {
      console.log("login error: ", errorMessage);
      errorMessage.innerHTML = "user not found/wrong password";
})
});


var createNewAccountButton = document.getElementById('createNewAccountButton');

createNewAccountButton.addEventListener("click", function(){

  const createAccountContainer = document.getElementById('createNewAccountContainer')

  createAccountContainer.classList.add('display');
  createAccountContainer.classList.remove('display-none');
  
  const signInContainer = document.getElementById('signInContainer')
  signInContainer.classList.add('display-none');
  signInContainer.classList.remove('display');
  
})

const backToLogIn = document.getElementById('backToLogin') 

backToLogIn.addEventListener("click", function(){

  const createAccountContainer = document.getElementById('createNewAccountContainer')
  createAccountContainer.classList.remove('display');
  createAccountContainer.classList.add('display-none');

  const signInContainer = document.getElementById('signInContainer')
  signInContainer.classList.add('display');
  signInContainer.classList.remove('display-none');
})

var createAccountButton = document.getElementById('createAccountButton');

createAccountButton.addEventListener("click", function () {
var responseData = accountData("createUsername", "createPassword");

  fetch(baseUrl + registerPath, { method: "POST", headers: { 'Content-Type': 'application/json', },
   body: JSON.stringify(responseData) })
    .then(parseResponse)
    .then((response) => {
      console.log("response: " ,response)
      navigateToHomePage()
      localStorage.setItem("token", response.accessToken);
    })
    .catch(error => { errorMessage.innerHTML = "Username already existing" });


});

