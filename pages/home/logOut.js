const logOutPath = "auth/logout";

function navigateToLoginPage() {
    window.location.href = "/pages/login_register/login_register.html"
  }

function createLogOutButton(){
    const buttons = document.getElementById("buttonContainer");

    if (localStorage.getItem("token")){
      
      var logOutBtn = document.createElement("button");
      logOutBtn.classList.add("headerButtons");
      logOutBtn.setAttribute("id","logOutButton");
        logOutBtn.textContent = "Log Out";
        buttons.appendChild(logOutBtn);
    } 
  
  console.log("localtoken:" , localStorage.getItem("token"))
}
  
createLogOutButton()

var logOutButton = document.getElementById('logOutButton');

logOutButton.addEventListener("click", function () {
    console.log("logout button is working");
    let token = localStorage.getItem("token");

    console.log(token);

    const baseURLWithoutMovies = new URL('https://movies-app-siit.herokuapp.com')

    fetch(baseURLWithoutMovies + logOutPath, 
        { method: "GET" , 
        headers:{ 
        "X-Auth-Token": token
        }
        })
        
        .then((response) => {
        window.localStorage.removeItem("token");
        navigateToLoginPage() 
        })
        .catch(error => {
        
    })

});