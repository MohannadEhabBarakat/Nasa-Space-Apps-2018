from bluetooth import *

client_socket=BluetoothSocket(RFCOMM)

client_socket.connect(("DC:D9:16:F1:E5:5C",4))

client_socket.send("Hello world")

print("finished")

client_socket.close()
