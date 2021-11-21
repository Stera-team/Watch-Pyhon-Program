let connectionBtn = document.querySelector("#btn");

if(connectionBtn){
    connectionBtn.addEventListener("click", sendAPIHash);
}


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

if(codeBtn){
    codeBtn.addEventListener("click", connection);
}


function connection(){
    let code = document.getElementById('Code_From_Watch_Input').value;

    let rightCode = "max"; // test

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

// Tokens from coinCapAPI in select - Start
select = document.getElementById('Tokens_Selector');

const requestURL = 'https://api.coincap.io/v2/assets';

const xhr = new XMLHttpRequest();

xhr.open('GET', requestURL);

let priceArray = [];
let namesArray = [];

xhr.onload = () => {
    for(let i = 0; i < 20; i++){
        let token = document.createElement('option');
        let tryPrice = (JSON.parse(xhr.response).data[i].priceUsd);
        namesArray[i] = (JSON.parse(xhr.response).data[i].symbol);
        token.innerHTML = (JSON.parse(xhr.response).data[i].name);
        token.value = namesArray[i];
        if(namesArray[i] == 'SHIB'){
            priceArray[i] = ((+tryPrice)*1000).toFixed(3);
        }else{
            priceArray[i] = (+tryPrice).toFixed(2);
        }

        select.appendChild(token);
    } 
    
}

xhr.send();
// Tokens from coinCapAPI in select - END


//Show_Hide options in DisplayInfo - Start

function showOptions(id){
    let w = document.getElementById(id);
    
    if(w.style.display == 'inline'){
        w.style.display = 'none';
        document.getElementById("additional_info").style.display = 'none';
    }else{
        w.style.display = 'inline';
        document.getElementById("additional_info").style.display = 'inline';
    }

}
//Show_Hide options in DisplayInfo - END

//Show edition info about current crypto - Start
function showCrypto(){
    document.getElementById("additional_info").innerHTML = "";
    let symbol  =   document.getElementById("Tokens_Selector").value;
    let name    =   document.getElementById("Tokens_Selector");
    name        =   ((name.options[name.selectedIndex].text).toLowerCase()).split(" ").join("-");
    
    let num = namesArray.indexOf(symbol);
    symbol = symbol.toLowerCase();
    
    let price = document.createElement("H1");
    let logo = document.createElement("IMG");

    let priceText   =   document.createTextNode(priceArray[num] + "$");

    

    price.appendChild(priceText);
    price.setAttribute("id", "cryptoPrice");
    logo.setAttribute("src", `https://cryptologos.cc/logos/${name}-${symbol}-logo.png?v=014`);
    logo.setAttribute("width", "40");
    logo.setAttribute("height", "40");
    logo.setAttribute("id", "cryptoLogo");
    logo.setAttribute("alt", "Token Logo");
    document.getElementById("additional_info").appendChild(logo); 
    document.getElementById("additional_info").appendChild(price);

    document.getElementById("cryptoLogo").style.display = 'inline';
    document.getElementById("cryptoPrice").style.display = 'inline';
    document.getElementById("cryptoPrice").style.marginLeft = '20px';
    document.getElementById("cryptoPrice").style.marginTop = '5px';
    document.getElementById("cryptoPrice").style.fontSize = '20px';

}
//Show edition info about current crypto - END
