from pymongo import MongoClient

# Kết nối MongoDB
client = MongoClient("mongodb://localhost:27017/")

# Chọn database
db = client["hackathon2025"]

# Chọn collection (bảng)
collection = db["accounts"]

print("All users:")
for account in collection.find():
    print(account.get("loginName"))
