function showError(window, error){
    if(window == "Loading"){

        if(error == "empty"){
            document.getElementById("Error_pass_text").innerHTML = "Input is empty";
        }else if(error == "code"){
            document.getElementById("Error_pass_text").innerHTML = "Code is not valid";
        }

        $('#Error_pass').modal();
    }else if (window == "Main"){

        if(error == "empty_time"){
            document.getElementById("Error_pass_text_Main").innerHTML = "Time or name is empty";
        }

        $('#Error_pass_Main').modal();
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

let priceArray      = [];
let namesArray      = [];
let fullNamesArray  = [];

xhr.onload = () => {
    for(let i = 0; i < 100; i++){

        let token           = document.createElement('option');
        let tryPrice        = (JSON.parse(xhr.response).data[i].priceUsd);

        namesArray[i]       = (JSON.parse(xhr.response).data[i].symbol);
        fullNamesArray[i]   = (JSON.parse(xhr.response).data[i].name);
        token.innerHTML     = fullNamesArray[i] 

        token.value         = namesArray[i];

        if(namesArray[i] == 'SHIB'){
            priceArray[i]   = ((+tryPrice)*1000).toFixed(3);
        }else{
            priceArray[i]   = (+tryPrice).toFixed(2);
        }

        select.appendChild(token);
    } 
    
}

xhr.send();
// Tokens from coinCapAPI in select - END

//Show edition info about current crypto - Start

let sockets = [];

function showCrypto(){
    
    document.getElementById('token_price').innerHTML = '';
    document.getElementById('token_logo').innerHTML = '';

    let symbol  =   document.getElementById("Tokens_Selector").value;
    symbol = symbol.toLowerCase();

    let url = `wss://stream.binance.com:9443/ws/${symbol}usdt@trade`;
    
    if(sockets[0]){
        let socket = sockets.pop();
        socket.close();
    
        let newSocket = new WebSocket(url);
        sockets.push(newSocket);
    }else{
        let ws = new WebSocket(url);
        sockets.push(ws);
    }

    if(symbol != "smth"){
        let name    =   document.getElementById("Tokens_Selector");
        name        =   ((name.options[name.selectedIndex].text).toLowerCase()).split(" ").join("-");

        let num = namesArray.indexOf(symbol.toUpperCase());
        

        let priceText   =   priceArray[num] + "$";
        document.getElementById('token_price').innerHTML =  priceText;

        symbol = symbol.toLowerCase();

        let lastPrice = priceArray[num];

        let lastTime = Date.now();

        sockets[0].onmessage = (event) => {
            let newTime = Date.now();

            if(newTime - lastTime > 2000){
                let stockObject = JSON.parse(event.data);
                let price   = (+(stockObject.p)).toFixed(2);  
                document.getElementById('token_price').innerHTML = price + "$";

                document.getElementById('token_price').style.color = !lastPrice || lastPrice === price ? 'white' : price > lastPrice ? 'green' : 'red';

                lastPrice = price;
                lastTime = newTime;
                priceArray[num] = price;
            }
            
        }

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
    let price   =   priceArray[num];

    addTokensFromWatch(symbol, price)
}

// ADD token to table - End


//Alarms writing - Start

function addAlarm(){

    let alarmName = document.getElementById("alarms_name").value;
    let alarmTime = document.getElementById("alarms_time").value;

    addAlarmsFromWatch(alarmName, alarmTime);
}

//Alarms writing - End