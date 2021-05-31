var error=false; //to znaczy, że danych nie brakuje

function checkForm(){
    checkLogin();
    checkPassword();
    checkEmail();
    return !error;
}

function checkLogin(){
    var login = document.getElementById("login");
    if (login.value == ""){
        document.getElementById("errorLogin").className="small alert alert-danger"; 
        document.getElementById("login").className="is-invalid form-control mb-2 mr-sm-2";
        error=true;
    }
    else{
        document.getElementById("errorLogin").className="small form-text text-hide";
        document.getElementById("login").className="is-valid form-control mb-2 mr-sm-2";
        error=false;
    }
}
function checkPassword(){
    var password = document.getElementById("password");
    if (password.value == ""){
        document.getElementById("errorPassword").className="small alert alert-danger"; 
        document.getElementById("password").className="is-invalid form-control mb-2 mr-sm-2";
        error=true;
    }
    else{
        document.getElementById("errorPassword").className="small form-text text-hide"; 
        document.getElementById("password").className="is-valid form-control mb-2 mr-sm-2";
        error=false;
    } 
}
function checkEmail(){
    var email = document.getElementById("email");
    if (email.value == ""){
        document.getElementById("errorEmail").className="small alert alert-danger"; 
        document.getElementById("errorEmail").innerHTML="Uzupełnij e-mail";
        document.getElementById("email").className="is-invalid form-control mb-2 mr-sm-2";
        error=true;
    } else {
        var emailVal = email.value;
        var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
        if(regex.test(emailVal)==false)
        {
            document.getElementById("errorEmail").className="small alert alert-danger"; 
            document.getElementById("errorEmail").innerHTML="Niewłaściwy e-mail";
            document.getElementById("email").className="is-invalid form-control mb-2 mr-sm-2";
            error=true;
        }
        else{
            document.getElementById("errorEmail").className="small form-text text-hide"; 
            document.getElementById("email").className="is-valid form-control mb-2 mr-sm-2";
            error=false;
        } 
    }
}

