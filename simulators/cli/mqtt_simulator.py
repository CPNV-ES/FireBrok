from paho.mqtt.client import Client
from datetime import datetime
from random import randint
from time import sleep

# WELCOME
print('Welcome to the mqtt python simulator !')
print('--------------------------------------')
print('')

# PROMPT FOR USER INFOS
ip = input('Whats the ip of your broker ? ')
print('')

port = input('Whats the port of your broker ? ')
print('')

username = input('Whats your automaton username ? ')
print('')

password = input('Whats your automaton pass ? ')
print('')

topic = input('On which topic you want to publish data ?')
print('')

print('The simulator will publish random datas evers 2 seconds on the ' + topic + 'topic')

# DEFINE MQTT EVENTS
def on_connect(client, userdata, flags, rc):
    print("Connected to broker")

def on_disconnect(client, userdata, rc):
    print("Connexion with broker closed")

# Create the mqtt client
mqtt_c = Client(username)

# Assign events
mqtt_c.on_connect = on_connect
mqtt_c.on_disconnect = on_disconnect

# Connecting to the mqtt broker
mqtt_c.username_pw_set(username, password)
mqtt_c.connect(ip, int(port))
mqtt_c.loop_start()

while True:
  payload = randint(0,10)

  # Send the mesured value to the Broker
  mqtt_c.publish(topic, payload)
  print ("Sended " + str(payload) + " to broker at : " + str(datetime.now()))

  sleep(2)
