import eel
import requests

from subprocess import Popen

BRIDGE      = Popen("python Bridge.py")
BRIDGE_URL  = "http://localhost:5000"


eel.init("UI")

@eel.expose
def closeEvent(route, websockets):
    BRIDGE.kill()
    exit()

@eel.expose
def pythonRequest(url):
    response = requests.get(url)

    if response.status_code == 200:
        return response.text
    else:
        return "ERROR"

    

eel.start("Main.html", size=(1000, 600), close_callback=closeEvent)
