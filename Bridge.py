from flask import Flask
from flask import request
from flask_cors import CORS

from Handler import BridgeHandler


app = Flask(__name__)
CORS(app)

### Debug Api ###
@app.route('/GetAllVariables') ##
def getAllVariables():
    return {'DEVICE_STATUS': BridgeHandler.getDeviceStatus(),
            'DEVICE_API_KEY': BridgeHandler.getDeviceApiKey(),
            'DEVICE_CHECK_KEY_HASH': BridgeHandler.getDeviceCheckKeyHash(),
            'DEVICE_NOW_SETTINGS': BridgeHandler.getDeviceSettings(),
            'DEVICE_NOW_ALARMS': BridgeHandler.getDeviceNowAlarms()
            }

### General Api ###

@app.route('/') ##
def index():
    return 'Access denied!'
  
@app.route('/GetBridgeStatus') ##
def getBridgeStatus():
    return {'status': 'OK'}

@app.route('/DeviceStatus') ##
def deviceStatus():
    return {'status': BridgeHandler.getDeviceStatus()}

### Device API ###

@app.route('/Connect') ##
def connect():
    apiKey = request.args.get('apiKey')

    return {'status': BridgeHandler.checkApiKeyStatus(apiKey)}

@app.route('/SendCheckCode') ##
def sendCheckCode():
    apiKey   = request.args.get('apiKey')
    codeHash = request.args.get('codeHash')

    if BridgeHandler.checkApiKeyStatus(apiKey):
        BridgeHandler.setDeviceCheckKeyHash(codeHash)
        BridgeHandler.setDeviceStatus('Founded')

        return {'status': True}
    else:
        return {'status': False}

@app.route('/GetStatus') ##
def getCodeStatus():
    apiKey = request.args.get('apiKey')

    if BridgeHandler.checkApiKeyStatus(apiKey):
        return {'status': BridgeHandler.getDeviceStatus()}

@app.route('/SetNowSettings') ##
def setNowSettings():
    apiKey = request.args.get('apiKey')
    data   = request.args.get('data')

    if BridgeHandler.checkApiKeyStatus(apiKey):
        BridgeHandler.setDeviceSettings(data)
        return {'status': True}

    else:
        return {'status': False}

@app.route('/GetNowSettings') ##
def getNowSettings():
    apiKey = request.args.get('apiKey')

    if BridgeHandler.checkApiKeyStatus(apiKey):
        return BridgeHandler.getDeviceSettings()

    else:
        return {'status': False}

@app.route('/SetNowAlarms') ##
def setNowAlarms():
    apiKey = request.args.get('apiKey')
    data   = request.args.get('data')

    if BridgeHandler.checkApiKeyStatus(apiKey):
        BridgeHandler.setDeviceNowAlarms(data)
        return {'status': True}
        
    else:
        return {'status': False}

@app.route('/GetNowAlarms') ##
def getNowAlarms():
    apiKey = request.args.get('apiKey')

    if BridgeHandler.checkApiKeyStatus(apiKey):
        return BridgeHandler.getDeviceNowAlarms()

    else:
        return {'status': False}



### Program API ###

@app.route('/SetApiKey') ##
def setApiKey():
    apiKey = request.args.get('apiKey')
    BridgeHandler.setDeviceApiKey(apiKey)

    return {'status': True}

@app.route('/IsDeviceFounded') ##
def isDeviceFounded():
    if BridgeHandler.getDeviceStatus() == 'Founded':
        return {'status': True}
    else:
        return {'status': False}

@app.route('/CheckCode') ##
def checkCode():
    code = request.args.get('code')
    
    if BridgeHandler.checkDeviceCode(code):
        return {'status': True}
    else:
        return {'status': False}

@app.route('/GetDeviceSettings') ##
def getDeviceSettings():
    if BridgeHandler.getDeviceStatus() == 'Connected' and BridgeHandler.getDeviceSettings() != None:
        return BridgeHandler.getDeviceSettings()
    else:
        return {'status': False}

@app.route('/SetDeviceSettings') ##
def setDeviceSettings():
    data = request.args.get('data')

    if BridgeHandler.getDeviceStatus() == 'Connected':
        BridgeHandler.setDeviceSettings(data)
        return {'status': True}

    else:
        return {'status': False}

@app.route('/SetDeviceAlarms') ##
def setDeviceAlarms():
    data = request.args.get('data')

    if BridgeHandler.getDeviceStatus() == 'Connected':
        BridgeHandler.setDeviceNowAlarms(data)
        return {'status': True}
    else:
        return {'status': False}

@app.route('/GetDeviceAlarms') ##
def getDeviceAlarms():
    if BridgeHandler.getDeviceStatus() == 'Connected':
        return BridgeHandler.getDeviceNowAlarms()
    else:
        return {'status': False}

@app.route('/GetDeviceApiKey') ##
def getDeviceApiKey():
    if BridgeHandler.getDeviceStatus() == 'Connected':
        return {'status': True, 'apiKey': BridgeHandler.getDeviceNowAlarms()} 
    else:
        return {'status': False}

if __name__ == "__main__":
    app.run(host="0.0.0.0")