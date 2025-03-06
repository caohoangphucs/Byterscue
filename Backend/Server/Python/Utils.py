import re

def remove_special_chars(text):
    return re.sub(r'[^a-zA-Z0-9\s]', '', text)  

