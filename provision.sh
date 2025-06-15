#!/usr/bin/env bash

# Fix DNS
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf > /dev/null

# Install Node.js 18 + Nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get update
sudo apt-get install -y nodejs nginx

# Go to app folder and install deps
cd /vagrant/app
npm install

# Create systemd service
sudo tee /etc/systemd/system/nodeapp.service > /dev/null <<EOF
[Unit]
Description=Node.js App
After=network.target

[Service]
ExecStart=/usr/bin/npm start
WorkingDirectory=/vagrant/app
Restart=always
User=vagrant
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reexec
sudo systemctl enable nodeapp
sudo systemctl start nodeapp

# Configure Nginx
sudo tee /etc/nginx/sites-available/nodeapp > /dev/null <<EOF
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/nodeapp /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
