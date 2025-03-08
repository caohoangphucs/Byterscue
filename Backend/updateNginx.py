import os

def updateNginx(port):
    nginx_config = f"""
    server {{
        listen {port};

        location /python/ {{
            proxy_pass http://localhost:5001/;
            rewrite ^/python(/.*)$ $1 break;
        }}

        location /nodejs/ {{
            proxy_pass http://localhost:5000/;
            rewrite ^/nodejs(/.*)$ $1 break;
        }}
    }}
    """

    # Ghi file Nginx config
    config_path = "/etc/nginx/sites-available/my_project"
    with open(config_path, "w") as f:
        f.write(nginx_config)

    # Tạo symlink nếu chưa có
    enabled_path = "/etc/nginx/sites-enabled/my_project"
    if not os.path.exists(enabled_path):
        os.system(f"ln -s {config_path} {enabled_path}")

    # Restart Nginx
    os.system("sudo systemctl restart nginx")
    print(f"✅ Nginx đã được cập nhật và chạy trên cổng {port}")

# Ví dụ sử dụng
if __name__ == "__main__":
    user_port = input("Nhập port Nginx muốn chạy: ")
    updateNginx(user_port)