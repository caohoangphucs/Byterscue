from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  
import sys
import os
from Utils import *
import random
from datetime import datetime, timedelta
import json


def send_info(data):
    return data
def recieve_request(request):
    temp = {
        "locations" : [request.get_json()]
    }
    return temp