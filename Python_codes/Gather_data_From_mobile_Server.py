import bluetooth
import json
import requests
from requests.auth import HTTPBasicAuth

sensorName = {}
values = []


url = 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21'
headers = {'Accept' : 'application/json', 'Content-Type' : 'application/json'}


# setup server
port = 1
target_addr = '20:17:08:15:12:41'
sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )
sock.bind((target_addr,port))
sock.listen(1)

# setup client
client_sock,address = sock.accept()
print ("Accepted connection from ",address)

data = client_sock.recv(1024)
while(data > 0):
    count = 0
    if data[count:count+1] == '1,':
        sensorName[count] = 'Accelometer'
        start = count+1
        end = count + 34
        values[count] = data[start:end]
    elif data[count:count+1] == '3,':
        sensorName[count] = 'Gyroscope'
        start = count+1
        end = count + 34
        values[count] = data[start:end]
print ("received [%s]" % data)

def writeToJSONFile(path, fileName, data):
    filePathNameWExt = './' + path + '/' + fileName + '.json'
    with open(filePathNameWExt, 'w') as fp:
        json.dump(data, fp)

# Example
data = {}
for i in range(0,len(sensorName)):
    data['sensorName'] = sensorName[i]
    data['values'] = values[i]
    data['number'] = i

writeToJSONFile('./','example',data)
# './' represents the current directory so the directory save-file.py is in
# 'test' is my file name

client_sock.close()
sock.close()

with open('example.json') as f:
    data = json.loads(f.read())

r = requests.post(url, data=data, headers=headers, auth=HTTPBasicAuth('username', 'password'))





