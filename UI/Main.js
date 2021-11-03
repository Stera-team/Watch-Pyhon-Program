let connectionBtn = document.querySelector("#btn");

connectionBtn.addEventListener("click", sendAPIHash);

function sendAPIHash(){
    let APIHash = document.getElementById('APIHash').value;

    APIHash = APIHash.split(' ').join("");
    console.log(APIHash);

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
        //Going to Main Page
    }else{
        $(function () {
            $('#Code_Asking').modal('toggle');
        });
       showError("code");
    }
}
