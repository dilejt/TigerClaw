var error=false; //to znaczy, że danych nie brakuje

function checkForm(){
    checkName();
    checkSName();
    checkTextarea();
    checkEmail();
    return !error
}

function checkName(){
    var contactName = document.getElementById("contactName");
    if (contactName.value == ""){
        document.getElementById("errorName").className="small alert alert-danger"; 
        document.getElementById("contactName").className="is-invalid form-control mb-2 mr-sm-2";
        error=true;
    }
    else{
        document.getElementById("errorName").className="small form-text text-hide";
        document.getElementById("contactName").className="is-valid form-control mb-2 mr-sm-2"; 
        error=false;
    }
}
function checkTextarea(){
    var contactTextarea = document.getElementById("contactTextarea");
    if (contactTextarea.value == ""){
        document.getElementById("errorTextarea").className="small alert alert-danger"; 
        document.getElementById("contactTextarea").className="is-invalid form-control mb-2 mr-sm-2";
        error=true;
    }
    else{
        document.getElementById("errorTextarea").className="small form-text text-hide"; 
        document.getElementById("contactTextarea").className="is-valid form-control mb-2 mr-sm-2";
        error=false;
    } 
}
function checkSName(){
    var contactSName = document.getElementById("contactSName");
    if (contactSName.value == ""){
        document.getElementById("errorSName").className="small alert alert-danger"; 
        document.getElementById("contactSName").className="is-invalid form-control mb-2 mr-sm-2";
        error=true;
    }
    else{
        document.getElementById("errorSName").className="small form-text text-hide"; 
        document.getElementById("contactSName").className="is-valid form-control mb-2 mr-sm-2";
        error=false;
    } 
}
function checkEmail(){
    var contactEmail = document.getElementById("contactEmail");
    if (contactEmail.value == ""){
        document.getElementById("errorEmail").className="small alert alert-danger"; 
        document.getElementById("errorEmail").innerHTML="Uzupełnij e-mail";
        document.getElementById("contactEmail").className="is-invalid form-control mb-2 mr-sm-2";
        error=true;
    } else {
        var email = contactEmail.value;
        var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
        if(regex.test(email)==false)
        {
            document.getElementById("errorEmail").className="small alert alert-danger"; 
            document.getElementById("errorEmail").innerHTML="Niewłaściwy e-mail";
            document.getElementById("contactEmail").className="is-invalid form-control mb-2 mr-sm-2";
            error=true;
        }
        else{
            document.getElementById("errorEmail").className="small form-text text-hide"; 
            document.getElementById("contactEmail").className="is-valid form-control mb-2 mr-sm-2";
            error=false;
        } 
    }
}