const baseUrl = "https://movies-app-siit.herokuapp.com";
const loginPath = "/auth/login";
const logOutPath = "/auth/logout"
const registerPath = "/auth/register";
const errorMessage = document.getElementById("errorMessage");

function signIn(){
  const buttons = document.getElementById("buttonContainer");
 
 
  
  
  
  
  
  if (localStorage.getItem("token")){
    
    var logOutBtn = document.createElement("button");
    logOutBtn.classList.add("headerButtons");
    logOutBtn.setAttribute("id","logOutButton");
  logOutBtn.textContent = "Log Out";
  buttons.appendChild(logOutBtn);
  } else {
    var loginBtn = document.createElement("button");
    loginBtn.classList.add("headerButtons");
    loginBtn.setAttribute("id", "loginButton");
    loginBtn.textContent = "Login";
    buttons.appendChild(loginBtn);
  }


console.log("localtoken:" , localStorage.getItem("token"))


}

signIn()


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
  console.log("username:" , username);
  var object = {
    username: username,
    password: password,
  }
  return object;
}






var createAccountButton = document.getElementById('createAccountButton');


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

var logOutButton = document.getElementById('logOutButton');

 logOutButton.addEventListener("click", function () {
 let token = localStorage.getItem("token");
  fetch(baseUrl+logOutPath, 
     { method: "GET" , 
       headers:{ 
       "X-Auth-Token": token
       }
     })
     .then(parseResponse)
     .then((response) => {
     window.localStorage.removeItem("token");
     })
     .catch(error => {
      
    console.error(error)

    errorMessage.innerHTML = "You have to be logged-in in order to log out";
     })
  
});

createAccountButton.addEventListener("click", function () {
  var responseData = accountData("createUsername", "createPassword");
  

  fetch(baseUrl + registerPath, { method: "POST", headers: { 'Content-Type': 'application/json', },
   body: JSON.stringify(responseData) })
    .then(parseResponse)
    .then(() => {
      navigateToHomePage();
    })
    .catch(error => { errorMessage.innerHTML = "Username already existing" });


});

