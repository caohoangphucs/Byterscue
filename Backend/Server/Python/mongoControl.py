from pymongo import MongoClient

class MongoDBHandler:
    def __init__(self, db_name, collection_name, uri="mongodb://hackathon:byteforce@54.251.247.80:27017/admin?authSource=admin"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db[collection_name]
    def is_exist(self, id)->bool:
        if (self.collection.find_one({"id":id})==None): return False
        return True
    def is_request_have_id(self, request)->bool:
        if (request.get("id")==None): return False
        return True
    def get_all_request(self) -> list:
       return list(self.collection.find())

    def find_request(self, id:str)->dict:
        if (id==None): return None
        if (not self.is_exist(id)): return None
        return self.collection.find_one({"id":id})
    def clear_collection(self):
        self.collection.delete_many({})
    def modify_request_attr(self, doc_id, attr, new_value)->str:
        if (doc_id==None): return "Id is required"
        self.collection.update_one({"id": doc_id}, {"$set": {attr: new_value}})
    def remove_request(self, id)->bool:
        self.collection.delete_one({"id": id})
    def add_requests(self, request_list):
        if isinstance(request_list, list):
            self.collection.insert_many(request_list)
        else:
            raise ValueError("Dữ liệu đầu vào phải là một danh sách các dictionary")
    def add_atr(self, id, atrb, value):
        self.collection.update_one(
            {"id":id},
            {"$set" : {atrb: value}}
        )
    def add_one_request(self, request: dict) -> bool:
        
        try:
            self.collection.insert_one(request)
        except Exception as e:
            print("Error when adding request:")
            print("More detail:", str(e))

    def delete(self, doc_id):
        self.collection.delete_one({"id": doc_id})

    def show(self):
        for request in self.get_all_request():
            print(request)

