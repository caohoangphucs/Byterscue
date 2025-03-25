#!/bin/bash
sudo apt update && sudo apt upgrade -y
sudo apt install ngrok -y
sudo apt install npm -y
sudo apt install python3 -y
sudo apt install python3-pip
sudo apt install git
pip install --upgrade pip --break-system-packages -q
pip install requests --break-system-packages -q
pip install flask --break-system-packages -q
pip install flask_cors --break-system-packages -q
pip install pathlib --break-system-packages -q
pip install -U -q "google-generativeai" -break-system-packages -q
cd Server/NodeJs
npm install --yes
cd ../../


#Cloudflare install
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && 
sudo dpkg -i cloudflared.deb && 

#Mongodb install
wget -qO - https://pgp.mongodb.com/server-7.0.asc | sudo tee /etc/apt/trusted.gpg.d/mongodb-server-7.0.asc
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

#Setup nginx config
cd config/
chmod +x nginx_setup.sh
sudo ./nginx_setup.sh
cd ..

#Setup Cloudflare config
chmod +x cloudflared.sh
sudo ./cloudflared.sh
cd ..


sudo clear
echo "Set up is done mother fucker !! "