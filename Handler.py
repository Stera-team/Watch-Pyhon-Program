from hashlib import md5
from json import loads


class BridgeHandler():
    DEVICE_STATUS         = 'Connected'
    DEVICE_API_KEY        = 'ROHZKDBN'
    DEVICE_CHECK_KEY_HASH = None
    DEVICE_NOW_SETTINGS   = None
    DEVICE_NOW_ALARMS     = None

    @staticmethod
    def getDeviceStatus():
        return BridgeHandler.DEVICE_STATUS

    @staticmethod
    def setDeviceStatus(status):
        BridgeHandler.DEVICE_STATUS = status

    @staticmethod
    def getDeviceApiKey():
        return BridgeHandler.DEVICE_API_KEY

    @staticmethod
    def setDeviceApiKey(key):
        BridgeHandler.DEVICE_API_KEY = key

    @staticmethod
    def getDeviceApiKey():
        return BridgeHandler.DEVICE_API_KEY

    @staticmethod
    def getDeviceCheckKeyHash():
        return BridgeHandler.DEVICE_CHECK_KEY_HASH

    @staticmethod
    def setDeviceCheckKeyHash(keyHash):
        BridgeHandler.DEVICE_CHECK_KEY_HASH = keyHash

    @staticmethod
    def getDeviceSettings():
        return BridgeHandler.DEVICE_NOW_SETTINGS

    @staticmethod
    def setDeviceSettings(settings):
        BridgeHandler.DEVICE_NOW_SETTINGS = {'status': True, 
                                             'settingsHash': md5(settings.encode('utf-8')).hexdigest(), 
                                             'settings': loads(settings)
                                             }

    @staticmethod
    def getDeviceNowAlarms():
        return BridgeHandler.DEVICE_NOW_ALARMS

    @staticmethod
    def setDeviceNowAlarms(data):
        BridgeHandler.DEVICE_NOW_ALARMS = {'status': True, 
                                           'alarmsHash': md5(data.encode('utf-8')).hexdigest(), 
                                           'alarms': loads(data)
                                            }
    

    @staticmethod
    def checkApiKeyStatus(apiKey):
        if apiKey != BridgeHandler.DEVICE_API_KEY:
            return False

        elif BridgeHandler.DEVICE_API_KEY == None:
            return False

        else:
            return True

    @staticmethod
    def checkDeviceCode(code):
        data = md5(f'{code}:{BridgeHandler.DEVICE_API_KEY}'.encode('utf-8')).hexdigest()

        if data == BridgeHandler.DEVICE_CHECK_KEY_HASH:
            BridgeHandler.DEVICE_STATUS = 'Connected'
            return True
        else:
            BridgeHandler.DEVICE_STATUS = 'Not Connected'
            BridgeHandler.DEVICE_CHECK_KEY_HASH = None

            return False
        
        