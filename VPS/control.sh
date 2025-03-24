#!/bin/bash

if [ "$1" = "connect" ]; then
    echo "> Connecting to vps"
    ssh -i HackathonPasscode.pem ubuntu@52.74.123.110

    clear
    echo ">Connect successful welcome to my vps"
else
    echo "> Command not found! Usage: $0 connect | "
fi
