import firebase_admin
from paho.mqtt.client import Client
from firebase_admin import credentials

# Initialize the firebase admin sdk

cred = credentials.Certificate('./token/admin_key.json')