from flask import Flask, request
import socket
import json
import requests

app = Flask(__name__)

DEVICES = {}

@app.route('/')
def hello_world():
    return 'dew-master'

@app.route('/api/ip')
def get_ip():
    h_name = socket.gethostname()
    IP_addres = socket.gethostbyname(h_name)
    return json.dumps({
        "host_name": h_name,
        "ip": IP_addres
    })

@app.route('/api/device/list', methods=['GET'])
def get_device_list():
    return json.dumps(DEVICES)

# bind device to dew server, and setup data pipeline for device
@app.route('/api/device/bind/<string:devtype>/<string:id>', methods=['POST', 'PUT'])
def bind_device(devtype, id):
    target_url = request.get_json()
    DEVICES[id] = {'url':target_url['val'], 'type':devtype, 'id':id}  
    add_device_to_pipeline(DEVICES[id])
    return "ok"


# unbind device and remove data pipeline
@app.route('/api/device/unbind/<string:devtype>/<string:id>', methods=['POST', 'PUT'])
def unbind_device(devtype, id):
    DEVICES[id] = {'url':target_url['val'], 'type':devtype, 'id':id} 
    remove_device_from_pipeline(DEVICES[id])
    return "ok"


# for "dew-service-manager" to setup data pipeline
def add_device_to_pipeline(device):
    try:
        response = requests.put('http://localhost:5001/api/pipeline/add/device', data=json.dumps(device), headers={"Content-Type": "application/json"})
    except requests.exceptions.RequestException as e:
        print(e)

def remove_device_from_pipeline(device):
    try:
        response = requests.put('http://localhost:5001/api/pipeline/remove/device', data=json.dumps(device), headers={"Content-Type": "application/json"})
    except requests.exceptions.RequestException as e:
        print(e)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)