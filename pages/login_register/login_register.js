const baseUrl = "https://movies-app-siit.herokuapp.com"; 
const loginPath ="/auth/login";
const registerPath="/auth/register";
const errorMessage = document.getElementById("errorMessage");



function parseResponse(response) {
    if (response.status === 200) {
        errorMessage.innerHtml="";
        return response.json();
    } else {
        throw new Error("");
        
    }
}

function navigateToHomePage(){
    window.location.href = "/pages/home/home.html";
}

 
function accountData (usernameParam,passwordParam) {
    var username = document.getElementsByName(usernameParam);
    var password = document.getElementsByName(passwordParam);
    var object = {
        username : username ,
        password : password ,
    }
  return object;
} 




 
 
 var createAccountButton = document.getElementById('createAccountButton');
 var loginButton = document.getElementById('loginButton');


loginButton.addEventListener("click", function(){
    var responseData = accountData("username", "password");
   
    let loginData = {
        username: responseData.username[0].value ,
        password: responseData.password[0].value ,
    }
  
    console.log("login data: " , loginData);

    fetch(baseUrl + loginPath , { method: "POST" ,headers: { 
        'Content-Type': 'application/json'
     }, body: JSON.stringify(loginData) })
        .then(parseResponse)
        .then((response) => {
            navigateToHomePage();
            localStorage.setItem("token" , response.accessToken);
            
         })
        .catch(error => { 
            console.log("login error: ", errorMessage);
            
            errorMessage.innerHTML = "user not found/wrong password";
            
        }) 

      
});

createAccountButton.addEventListener("click", function(){
    var responseData = accountData("createUsername", "createPassword");
    let registerData = {
        username: responseData.username[0].value ,
        password: responseData.password[0].value ,
    }

    fetch(baseUrl + registerPath , { method: "POST" , headers:{'Content-Type': 'application/json', }, body:JSON.stringify(registerData)  })
        .then(parseResponse)
        .then(() => {
           navigateToHomePage();
          })
        .catch(error => {errorMessage.innerHTML = "Username already existing"});

        
});

