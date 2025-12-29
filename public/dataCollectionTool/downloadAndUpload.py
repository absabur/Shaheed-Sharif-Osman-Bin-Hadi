import yt_dlp
import os
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import pickle
import time
import uuid

# --- GOOGLE DRIVE AUTH SETUP ---
SCOPES = ["https://www.googleapis.com/auth/drive.file"]


def get_gdrive_service():
    creds = None
    if os.path.exists("token.pickle"):
        with open("token.pickle", "rb") as token:
            creds = pickle.load(token)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.pickle", "wb") as token:
            pickle.dump(creds, token)
    return build("drive", "v3", credentials=creds)


# --- THE MAIN DOWNLOAD & UPLOAD FUNCTION ---
def process_video_to_drive(url, folder_id=None):
    unique_id = uuid.uuid4().hex
    # We use a fixed temp name to make tracking easier
    temp_download_name = f"video_{unique_id}"

    ydl_opts = {
        "format": "bestvideo[height<=1080]+bestaudio/best",
        "merge_output_format": "mp4",
        "outtmpl": f"{temp_download_name}.%(ext)s",
        "quiet": False,  # Changed to False to see what's happening
    }

    try:
        # 1. DOWNLOAD
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print(f"মেটাডেটা সংগ্রহ ও ডাউনলোড শুরু হচ্ছে: {url}")
            info = ydl.extract_info(url, download=True)
            # The actual file created by yt-dlp
            final_filename = f"{temp_download_name}.mp4"

        # 2. WAIT FOR FILE RELEASE
        # Sometimes FFmpeg takes a second to finish merging
        print("ফাইল প্রসেসিং চেক করা হচ্ছে...")
        time.sleep(5)

        if not os.path.exists(final_filename):
            return {"error": f"ফাইলটি খুঁজে পাওয়া যায়নি: {final_filename}"}

        # 3. UPLOAD
        service = get_gdrive_service()
        file_metadata = {
            "name": info.get("title", "Uploaded_Video"),
            "parents": [folder_id] if folder_id else [],
        }

        print("গুগল ড্রাইভে আপলোড শুরু হচ্ছে...")
        media = MediaFileUpload(final_filename, mimetype="video/mp4", resumable=True)
        file = (
            service.files()
            .create(body=file_metadata, media_body=media, fields="id, webViewLink")
            .execute()
        )

        # 4. CLEANUP (With Error Handling)
        try:
            os.remove(final_filename)
        except PermissionError:
            print(
                f"Note: Could not delete {final_filename} automatically. Please delete it manually later."
            )

        print("সাফল্যের সাথে সম্পন্ন হয়েছে!")
        return {"title": info.get("title"), "drive_link": file.get("webViewLink")}

    except Exception as e:
        return {"error": str(e)}
