// SetApiKey

let connectionBtn = document.querySelector("#btn");

if(connectionBtn){
    connectionBtn.addEventListener("click", sendAPIHash);
}

function sendAPIHash(){

    let APIHash = document.getElementById('APIHash').value;

    APIHash = APIHash.split(' ').join("");

    if(APIHash != ""){
        
        let SetApiKeyURL = `http://127.0.0.1:5000/SetApiKey?apiKey=${APIHash}`;

        const SetApiKeyXHR = new XMLHttpRequest();

        SetApiKeyXHR.open("GET", SetApiKeyURL);

        SetApiKeyXHR.onload = () => {
            if((JSON.parse(SetApiKeyXHR.response)).status){
                
                if(document.getElementById("APIHash_Window")){
                    
                    document.getElementById("APIHash_Window").value = APIHash;
                }
            }
        }

        SetApiKeyXHR.send();

        $('#Code_Asking').modal();
    }else{
        showError("Loading", "empty");
    }
}

// IsDeviceFounded

/*
function IsDeviceFounded(){

    let amountOfTries = 0;
    
    let IsDeviceFoundedURL = "http://localhost:5000/IsDeviceFounded";

    const IsDeviceFoundedXHR = new XMLHttpRequest();

    IsDeviceFoundedXHR.open("GET", SetApiKeyURL);

    IsDeviceFoundedXHR.onload = () => {
        if((JSON.parse(IsDeviceFoundedXHR.response)).status == true){
            showError("Loading", error)
        }else if((JSON.parse(IsDeviceFoundedXHR.response)).status == false && amountOfTries <  3){
            amountOfTries++;
        }else{
            
        }
    }
}
*/

//CheckCode

let codeBtn = document.querySelector("#Code_From_Watch_btn");

if(codeBtn){
    codeBtn.addEventListener("click", CheckCode);
}

function CheckCode(){
    let code = document.getElementById('Code_From_Watch_Input').value;

    let CheckCodeURL = `http://127.0.0.1:5000/CheckCode?code=${code}`;
    
    const CheckCodeXHR = new XMLHttpRequest();
    
    CheckCodeXHR.open("GET", CheckCodeURL);
    
    CheckCodeXHR.onload = () => {
        if((JSON.parse(CheckCodeXHR.response)).status){
            window.location.replace("Main.html");
        }else{
            $(function () {
                $('#Code_Asking').modal('toggle');
            });
           showError("Loading", "code");
        }
    }
    CheckCodeXHR.send();       
}


//GetDeviceSettings

if(document.getElementById("SaveChangesBtn")){
    GetDeviceSettings()
}

function GetDeviceSettings(){

    let GetDeviceSettingsURL = "http://localhost:5000/GetDeviceSettings";

    const GetDeviceSettingsXHR = new XMLHttpRequest();

    GetDeviceSettingsXHR.open("GET", GetDeviceSettingsURL);

    GetDeviceSettingsXHR.onload = () => {

        let is12HorsFormat = JSON.parse(GetDeviceSettingsXHR.response).is12HourFormat;
        let cryptoTickers = JSON.parse(GetDeviceSettingsXHR.response).cryptoTickers;
        let alarms = JSON.parse(GetDeviceSettingsXHR.response).alarms;

        if(is12HorsFormat){
            document.getElementById("12hFormat").checked = true;
        }else{
            document.getElementById("24hFormat").checked = true;
        }

        for(let i = 0; i < cryptoTickers.length; i++){
            
            const requestURL2 = 'https://api.coincap.io/v2/assets';

            const xhr2 = new XMLHttpRequest();
            
            xhr2.open('GET', requestURL2);

            xhr2.onload = () => {
                for(let j = 0; j < 100; j++){

                    if(cryptoTickers[i].toLowerCase() == (JSON.parse(xhr2.response).data[j].id)){
                        addTokensFromWatch(JSON.parse(xhr2.response).data[j].symbol, (+(JSON.parse(xhr2.response).data[j].priceUsd)).toFixed(2));
                        break;
                    }
                }
            }
            xhr2.send();
        }

        for(let i = 0; i < alarms.length; i++){
            let name = alarms[i].name;
            let time = alarms[i].time;

            addAlarmsFromWatch(name, time);
        }
    }
    GetDeviceSettingsXHR.send();
}

function addTokensFromWatch(symbol, price){
    
    let table   =   document.getElementById("table");

    let length  =   table.rows.length;

    if(length < 6){

        let Cryptoprice   =   price + "$";

        table.innerHTML += `
                <tr>
                    <td style="font-size:16px">${symbol}</td>
                    <td style="font-size:16px">${Cryptoprice}</td>
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
}

function addAlarmsFromWatch(name, time){
    
    let table   =   document.getElementById("alarm_table");

    let length  =   table.rows.length;
    
    if(length < 4){

        if((name.split(" ").join("") == "") || (time == "")){
            showError("Main", "empty_time");
        }else{

            table.innerHTML += `
                <tr>
                    <td style="font-size:16px">${name}</td>
                    <td style="font-size:16px">${time}</td>
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
    }
}


//SetDeviceSettings


let SaveChanges = document.querySelector("#SaveChangesBtn");

if(SaveChanges){
    SaveChanges.addEventListener("click", SetDeviceSettings);
}

function SetDeviceSettings(){

    let alarmsTable   =   document.getElementById("alarm_table");
    let cryptoTable   =   document.getElementById("table");

    let alarmsTableLength  =   alarmsTable.rows.length;
    let cryptoTableLength  =   cryptoTable.rows.length;

    let alarms = [];
    let cryptoTickers = [];
    let is12HorsFormat;

    //time format
    if(document.getElementById("24hFormat").checked){
        is12HorsFormat = false;
    }else{
        is12HorsFormat = true;
    }

    //alarms
    let alarmName;
    let alarmTime;

    for(let i = 1; i < alarmsTableLength; i++){
        alarmName = alarmsTable.rows[i].cells[0].innerHTML;
        alarmTime = alarmsTable.rows[i].cells[1].innerHTML;

        alarms[i - 1] = {"name": alarmName, "time": alarmTime};
    }
    
    //crypto
    let cryptoFullName;

    for(let i = 1; i < cryptoTableLength; i++){
        cryptoFullName = cryptoTable.rows[i].cells[0].innerHTML;

        cryptoFullName = fullNamesArray[namesArray.indexOf(cryptoFullName)];
        
        cryptoTickers[i - 1] = cryptoFullName;
    }

    //Sending

    let result = {
        is12HourFormat: is12HorsFormat, 
        cryptoTickers: cryptoTickers,
        alarms: alarms,
    }

    let json = JSON.stringify(result);

    const  SetDeviceSettingsURL= 'http://localhost:5000/SetDeviceSettings?data=' + json;

    const SetDeviceSettingsXHR = new XMLHttpRequest();
            
    SetDeviceSettingsXHR.open('GET', SetDeviceSettingsURL);

    SetDeviceSettingsXHR.onload = () => {
        if((JSON.parse(SetDeviceSettingsXHR.response)).status){
            return true;
        }else{
            return false;
        }
    }
            
    SetDeviceSettingsXHR.send();
}
//1) - http://127.0.0.1:5000/SetApiKey?apiKey=max
//2) - http://127.0.0.1:5000/CheckCode?code=111111
//3) - http://localhost:5000/GetDeviceSettings
//4) - http://localhost:5000/SetDeviceSettings?data=....
//http://localhost:5000/SetDeviceSettings?data={"is12HourFormat":true,"cryptoTickers":["Bitcoin","Cardano","Polkadot"],"alarms":[{"name":"wake up","time":"12:00"}]}