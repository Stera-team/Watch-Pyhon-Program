let btn = document.querySelector("#btn");

btn.addEventListener("click", sendAPIHash);

function sendAPIHash(){
    let APIHash = document.querySelector("#APIHash").value;
    if(APIHash != false){
        $('#Code_Asking').modal();
    }
}
