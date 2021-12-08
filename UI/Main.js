document.writeln("<script type='text/javascript' src='Logo_Exceptions.js'></script>");

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

let rightCode = "max"; //TEST CODE

function connection(){
    let code = document.getElementById('Code_From_Watch_Input').value;

    if(code == rightCode){
        window.location.replace("Main.html");
    }else{
        $(function () {
            $('#Code_Asking').modal('toggle');
        });
       showError("code");
    }
}

if(document.getElementById("APIHash_Window")){
    document.getElementById("APIHash_Window").value = rightCode;
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
    for(let i = 0; i < 100; i++){

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

//Show edition info about current crypto - Start
function showCrypto(){
    document.getElementById('token_price').innerHTML = '';
    document.getElementById('token_logo').innerHTML = '';

    let symbol  =   document.getElementById("Tokens_Selector").value;
    if(symbol != "smth"){
        let name    =   document.getElementById("Tokens_Selector");
        name        =   ((name.options[name.selectedIndex].text).toLowerCase()).split(" ").join("-");
    
        let num = namesArray.indexOf(symbol);
        symbol = symbol.toLowerCase();

        let priceText   =   document.createTextNode(priceArray[num] + "$");
        document.getElementById('token_price').appendChild(priceText);

        let logo = document.getElementById('token_logo');

        let logo_url = checkLogo(name, symbol);

        logo.setAttribute("src", logo_url);

        document.getElementById('additional_info').style.display = 'inline'
    }else{
        document.getElementById('additional_info').style.display = 'none';
    }
}
//Show edition info about current crypto - END

// ADD token to table - Start

function addToken(){

        let symbol  =   document.getElementById("Tokens_Selector").value;
        symbol      =   symbol.toUpperCase();

        let num     =   namesArray.indexOf(symbol);
        let price   =   priceArray[num] + "$";

        let table   =   document.getElementById("table");

        table.innerHTML += `
                <tr>
                    <td style="font-size:16px">${symbol}</td>
                    <td style="font-size:16px">${price}</td>
                    <td><button class="table_button">X</button></td>
                </tr>
            `;
        function onDeleteRow(e) {
            if (!e.target.classList.contains("table_button")) {
                return;
            }
    
            const btn = e.target;
            btn.closest("tr").remove();
        }
    
        table.addEventListener("click", onDeleteRow);
}

// ADD token to table - End


//Alarms writing - Start

function addAlarm(){

        let alarmName = document.getElementById("alarms_name").value;
        let alarmTime = document.getElementById("alarms_time").value;

        let table   =   document.getElementById("alarm_table");
    
        table.innerHTML += `
            <tr>
                <td style="font-size:16px">${alarmName}</td>
                <td style="font-size:16px">${alarmTime}</td>
                <td><button class="table_button">X</button></td>
            </tr>
        `;
        function onDeleteRow(e) {
            if (!e.target.classList.contains("table_button")) {
            return;
            }
    
            const btn = e.target;
            btn.closest("tr").remove();
        }

        table.addEventListener("click", onDeleteRow);
}

//Alarms writing - End