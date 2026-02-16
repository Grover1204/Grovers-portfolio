from gradio_client import Client, handle_file
import os

# Configuration
HF_TOKEN = "YOUR_HUGGING_FACE_TOKEN"
SPACE_ID = "Grover1204/facial_expression"
IMAGE_PATH = "/Users/grover/Documents/my webpage/images/P1011045.JPG"

def test_prediction():
    print(f"🔄 Connecting to {SPACE_ID}...")
    
    try:
        # Initialize Client
        # Parameter is 'hf_token' in newer versions, but signature shows 'token' or older versions use 'hf_token'
        # Based on inspection: (self, src: 'str', token: 'str | None' = None, ...)
        client = Client(SPACE_ID, token=HF_TOKEN)
        
        # Verify Image Exists
        if not os.path.exists(IMAGE_PATH):
            print(f"❌ Error: Image not found at {IMAGE_PATH}")
            return

        print(f"📸 Sending image: {IMAGE_PATH}")
        
        # Make Prediction
        # Note: The endpoint is usually '/predict', but might vary. 
        # The client.predict() automatically handles the endpoint if it matches the default function.
        # We wrap the file path in handle_file() as per latest gradio_client docs for file uploads
        result = client.predict(
            image=handle_file(IMAGE_PATH),
            api_name="/predict"
        )
        
        print("\n✅ API Response Received:")
        print("--------------------------------------------------")
        print(result)
        print("--------------------------------------------------")
        
    except Exception as e:
        print(f"\n❌ Error occurred: {str(e)}")

if __name__ == "__main__":
    test_prediction()
