from google.cloud import language_v1

client = language_v1.LanguageServiceClient()

document = language_v1.Document(
    content="Tôi rất hài lòng với sản phẩm này!", 
    type_=language_v1.Document.Type.PLAIN_TEXT,
    language="vi"
)

response = client.analyze_sentiment(request={'document': document})
print(f"Score: {response.document_sentiment.score}, Magnitude: {response.document_sentiment.magnitude}")
