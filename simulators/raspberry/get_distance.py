import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt
import time

print ("Distance Measurement script !")

GPIO.setmode(GPIO.BCM)

TRIG = 23
ECHO = 24

GPIO.setup(TRIG,GPIO.OUT)
GPIO.setup(ECHO,GPIO.IN)

# Define mqtt events
def on_connect(client, userdata, flags, rc):
    print("Broker connected")

def on_disconnect(client, userdata, rc):
    print("Connexion with broker lost")

# Create the mqtt client
mqtt_c = mqtt.Client('raspberry')

# Assign connexion events
mqtt_c.on_connect = on_connect
mqtt_c.on_disconnect = on_disconnect

# Connecting to the mqtt broker
mqtt_c.username_pw_set("raspberry", password=None)
mqtt_c.connect("172.17.101.124", 1883)
mqtt_c.loop_start()

while True:

    GPIO.output(TRIG, False)

    print ("Waiting For Sensor To Settle")

    time.sleep(2)

    GPIO.output(TRIG, True)

    time.sleep(0.00001)

    GPIO.output(TRIG, False)

    while GPIO.input(ECHO)==0:
      pulse_start = time.time()

    while GPIO.input(ECHO)==1:
      pulse_end = time.time()

    pulse_duration = pulse_end - pulse_start

    distance = pulse_duration * 17150

    distance = round(distance, 2)

    # Send the mesured value to the Broker
    mqtt_c.publish("ultrasonic3", distance)
    print ("Distance:",distance,"cm")

# Clean GPIO pins assignments
GPIO.cleanup()
