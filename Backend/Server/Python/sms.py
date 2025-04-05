import requests
import json

# API Key của bạn
API_KEY = 'SK.0.pmE5Bh2bgGeujGsIwKRJrKPHMX1wnjdn'
BASE_URL = 'https://api.stringee.com/v1'

# Cấu hình các headers
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {API_KEY}',  # Sử dụng API Key
}

# Thông tin tin nhắn
data = {
    "from": "+84123456789",  # Số điện thoại gửi tin nhắn
    "to": "+84987654321",    # Số điện thoại nhận tin nhắn
    "message": "Hello from Stringee API!"  # Nội dung tin nhắn
}

# Gửi yêu cầu HTTP POST để gửi tin nhắn
response = requests.post(f'{BASE_URL}/message/send', headers=headers, data=json.dumps(data))

# Kiểm tra mã trạng thái HTTP
if response.status_code == 200:
    print("Tin nhắn đã được gửi thành công!")
    print(response.json())  # In ra phản hồi JSON của API
else:
    print(f"Lỗi khi gửi tin nhắn: {response.status_code}")
    print(response.text)  # In ra lỗi chi tiết
