#!/bin/bash

if [ "$1" = "start" ]; then
    echo "> Turning on MongoDB..."
    echo "i>  To open MongoDB shell, type 'mongosh'"
    sudo systemctl start mongod  # Dùng 'mongod' thay vì 'mongodb'

    echo "> Turning on Cloudflare Tunnel..."
    sudo systemctl start cloudflared

    echo "> Starting server, details below:"
    cd Backend/Server_Control/
    python3 UpdateServer.py

elif [ "$1" = "shutdown" ]; then
    echo "> Shutting down MongoDB..."
    sudo systemctl stop mongod  # Dùng 'stop' thay vì 'pkill'

    echo "> Shutting down Cloudflare Tunnel..."
    sudo systemctl stop cloudflared

    echo "> Shutting down server..."
    cd Backend/Server_Control/
    python3 UpdateServer.py shutdown

else
    echo "> Command not found! Usage: $0 start | shutdown"
fi
