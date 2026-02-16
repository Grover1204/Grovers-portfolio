import urllib.request
import urllib.parse
import json
import os
import mimetypes
import ssl

# Configuration
HF_TOKEN = "YOUR_HUGGING_FACE_TOKEN"
API_URL = "https://grover1204-facial-expression.hf.space/predict"
IMAGE_PATH = "/Users/grover/Documents/my webpage/images/P1011045.JPG"

# Ignore SSL Certificate Errors
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def release_connection(response):
    response.close()

def test_prediction():
    print(f"🔄 Connecting to {API_URL}...")

    if not os.path.exists(IMAGE_PATH):
        print(f"❌ Error: Image not found at {IMAGE_PATH}")
        return

    # Create Multipart Form Data manually since we don't have requests
    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    data = []
    
    # File Field
    mime_type = mimetypes.guess_type(IMAGE_PATH)[0] or 'application/octet-stream'
    filename = os.path.basename(IMAGE_PATH)
    
    data.append(f'--{boundary}')
    data.append(f'Content-Disposition: form-data; name="file"; filename="{filename}"')
    data.append(f'Content-Type: {mime_type}')
    data.append('')
    
    with open(IMAGE_PATH, 'rb') as f:
        file_content = f.read()
        
    # We need to handle mixed bytes and string for body construction
    
    body = b''
    for item in data:
        body += item.encode('utf-8') + b'\r\n'
    
    body += file_content + b'\r\n'
    body += f'--{boundary}--'.encode('utf-8') + b'\r\n'

    req = urllib.request.Request(API_URL, data=body)
    req.add_header('Authorization', f'Bearer {HF_TOKEN}')
    req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')
    req.method = 'POST'

    try:
        # Pass context=ctx to ignore SSL errors
        with urllib.request.urlopen(req, context=ctx) as response:
            result = response.read().decode('utf-8')
            print("\n✅ API Response Received:")
            print("--------------------------------------------------")
            print(result)
            print("--------------------------------------------------")
            
            # Parse JSON to show user-friendly output
            try:
                json_res = json.loads(result)
                print(f"\n😃 Detected Emotion: {json_res.get('emotion', 'Unknown')}")
                print(f"📊 Confidence: {json_res.get('confidence', 0) * 100:.2f}%")
            except:
                pass

    except urllib.error.HTTPError as e:
        print(f"\n❌ HTTP Error: {e.code} - {e.reason}")
        print(e.read().decode('utf-8'))
    except Exception as e:
        print(f"\n❌ Error occurred: {str(e)}")

if __name__ == "__main__":
    test_prediction()
