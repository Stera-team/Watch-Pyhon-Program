let connectionBtn = document.querySelector("#btn");

connectionBtn.addEventListener("click", sendAPIHash);

function sendAPIHash(){
    let APIHash = document.getElementById('APIHash').value;

    APIHash = APIHash.split(' ').join("");

    if(APIHash != ""){
        $('#Code_Asking').modal();
    }else{
        showError("empty");
    }
}

function showError(error){
    if(error == "empty"){
        document.getElementById("Error_pass_text").innerHTML = "Input is Empty";
    }else if(error == "code"){
        document.getElementById("Error_pass_text").innerHTML = "Code is not valid";
    }
    $('#Error_pass').modal();
}

let codeBtn = document.querySelector("#Code_From_Watch_btn");

codeBtn.addEventListener("click", connection);

function connection(){
    let code = document.getElementById('Code_From_Watch_Input').value;

    let rightCode = "max";

    if(code == rightCode){
        window.location.replace("Main.html");
    }else{
        $(function () {
            $('#Code_Asking').modal('toggle');
        });
       showError("code");
    }
}

function hideAPIHash() {
    let x = document.getElementById("APIHash_Window");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
