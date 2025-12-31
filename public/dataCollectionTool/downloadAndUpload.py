import yt_dlp
import os
import pickle
import time
import uuid
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

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


def process_video_to_drive(url, folder_id=None):
    unique_id = uuid.uuid4().hex
    temp_download_name = f"video_{unique_id}"

    # আপনার পিসির FFmpeg বিন ফোল্ডারের সঠিক পাথ
    ffmpeg_path = (
        r"D:\osman_hadi\public\dataCollectionTool\ffmpeg-8.0.1-essentials_build\bin"
    )

    ydl_opts = {
        # 'bestvideo+bestaudio' ব্যবহার করলে সবচেয়ে হাই-কোয়ালিটি পাওয়া যাবে
        # এটি যেকোনো ফরম্যাট (mkv/webm/mp4) হতে পারে
        "format": "bestvideo[height<=1080]+bestaudio/best",
        "outtmpl": f"{temp_download_name}.%(ext)s",
        "ffmpeg_location": ffmpeg_path,
        "quiet": False,
        "noplaylist": True,
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    }

    try:
        # ১. ডাউনলোড এবং অটোমেটিক মার্জিং (FFmpeg এর মাধ্যমে)
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print(f"ডাউনলোড শুরু হচ্ছে: {url}")
            info = ydl.extract_info(url, download=True)

            # yt-dlp মার্জ করার পর যে ফাইলটি তৈরি করেছে তার সঠিক পাথ এবং নাম
            final_filename = ydl.prepare_filename(info)

            # ইউটিউব অনেক সময় মার্জ করার পর এক্সটেনশন পরিবর্তন করে ফেলে (যেমন .mkv)
            # তাই আসল ফাইলটি চেক করে নিচ্ছি
            base, _ = os.path.splitext(final_filename)
            for file in os.listdir("."):
                if file.startswith(temp_download_name) and not file.endswith(".part"):
                    final_filename = file
                    break

        if not os.path.exists(final_filename):
            return {"error": "ডাউনলোড করা ফাইলটি সিস্টেমে পাওয়া যায়নি।"}

        print(f"ফাইল প্রস্তুত: {final_filename}")
        time.sleep(2)  # ফাইল লক রিলিজ হওয়ার জন্য সময়

        # ২. গুগল ড্রাইভ আপলোড
        service = get_gdrive_service()
        video_title = info.get("title", "Uploaded_Video")
        # ভিডিওর অরিজিনাল এক্সটেনশন বের করা
        _, original_ext = os.path.splitext(final_filename)

        file_metadata = {
            "name": f"{video_title}{original_ext}",
            "parents": [folder_id] if folder_id else [],
        }

        print(f"ড্রাইভে আপলোড হচ্ছে: {video_title}")
        # mimetype অটোমেটিক ডিটেক্ট করার জন্য None রাখা হয়েছে
        media = MediaFileUpload(final_filename, resumable=True)
        file = (
            service.files()
            .create(body=file_metadata, media_body=media, fields="id, webViewLink")
            .execute()
        )

        drive_url = file.get("webViewLink")
        print(f"সফলভাবে আপলোড হয়েছে! লিঙ্ক: {drive_url}")

        # ৩. ক্লিনআপ
        try:
            time.sleep(2)
            for f in os.listdir("."):
                if f.startswith(temp_download_name):
                    os.remove(f)
            print("লোকাল ক্লিনআপ সম্পন্ন।")
        except Exception as ce:
            print(f"ক্লিনআপ ওয়ার্নিং: {ce}")

        return drive_url

    except Exception as e:
        print(f"Error: {str(e)}")
        return {"error": str(e)}
