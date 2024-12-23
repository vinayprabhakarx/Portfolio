# Nginx Setup Guide

This guide provides comprehensive instructions for setting up and configuring Nginx with enhanced security and performance optimization for your portfolio website.

---
## Installation

1. **Install Nginx**:

```bash
sudo apt update && sudo apt upgrade -y
sudo dpkg-reconfigure tzdata
date
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

---
## Basic Configuration

1. **Create Website Directory**:

```bash
sudo mkdir -p /var/www/vinayprabhakar.tech
sudo chmod 755 -R /var/www/vinayprabhakar.tech
sudo chown -R root:www-data /var/www/vinayprabhakar.tech
```

2. **Configure Nginx**:

```bash
sudo nano /etc/nginx/sites-available/vinayprabhakar.tech
```

Add the following content:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name vinayprabhakar.tech www.vinayprabhakar.tech;

    root /var/www/vinayprabhakar.tech;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, no-transform";
    }

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    error_log /var/log/nginx/vinayprabhakar.tech.error.log;
    access_log /var/log/nginx/vinayprabhakar.tech.access.log;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "no-referrer-when-downgrade";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    if ($request_method !~ ^(GET|HEAD|POST)$) {
        return 444;
    }
    # SSL Configuration (Commented out for now)
    # listen 443 ssl http2;
    # listen [::]:443 ssl http2;
    # ssl_certificate /etc/ssl/certs/cloudflare.pem;
    # ssl_certificate_key /etc/ssl/private/cloudflare.key;
    # include /etc/nginx/conf.d/ssl-params.conf;

    # Security headers (Optional, depending on SSL)
    # include /etc/nginx/conf.d/security-headers.conf;

}
```

3. **Enable Configuration**:

```bash
sudo ln -s /etc/nginx/sites-available/vinayprabhakar.tech /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---
## Performance Optimization

1. **Enable Gzip Compression**:

```bash
sudo nano /etc/nginx/conf.d/performance.conf
```

Add the following content:

```nginx
gzip on;
gzip_disable "msie6";
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_min_length 256;
gzip_types text/plain text/css application/json application/javascript text/xml;
client_body_buffer_size 10K;
client_max_body_size 8m;
large_client_header_buffers 4 4k;
keepalive_timeout 15;
send_timeout 10;
open_file_cache max=1000 inactive=20s;
open_file_cache_valid 30s;
open_file_cache_min_uses 2;
open_file_cache_errors on;
```

---
## Logging Configuration

1. **Custom Logging**:

```bash
sudo nano /etc/nginx/conf.d/logging.conf
```

Add the following content:

```nginx
log_format custom '$remote_addr - $remote_user [$time_local] "$request" '
                '$status $body_bytes_sent "$http_referer" '
                '"$http_user_agent"';

access_log /var/log/nginx/access.log custom;
error_log /var/log/nginx/error.log warn;
```

---
## Security Enhancements

1. **Hide Nginx Version**:

```bash
sudo nano /etc/nginx/nginx.conf
```

Add the following content:

```nginx
http {
    server_tokens off;
}
```

## Troubleshooting

1. **Common Commands**:

```bash
sudo systemctl status nginx
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

2. **Fix Common Issues**:

- **502 Bad Gateway**:

```bash
pm2 status
pm2 logs
```

- **Permission Issues**:

```bash
sudo chown -R www-data:www-data /var/www/vinayprabhakar.tech
sudo chmod -R 755 /var/www/vinayprabhakar.tech
```

---
## Maintenance

1. **Update Nginx**:

```bash
sudo apt update && sudo apt upgrade nginx
```

2. **Backup Configuration**:

```bash
sudo tar -czf /var/backups/nginx-config-$(date +%Y%m%d).tar.gz /etc/nginx/
```