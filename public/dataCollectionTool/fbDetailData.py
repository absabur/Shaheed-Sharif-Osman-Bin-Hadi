import yt_dlp
import json

interviews = [
  {
    "category": "Speech",
    "yt_personal_url": "",
    "fb_url": "https://www.facebook.com/reel/912700261394300",
    "drive_url": "https://drive.google.com/file/d/1iN3TtGGxZEHygEchXwCbdacoUkidqxpi/view?usp=drive_link",
    "source_title": "শহীদ ওসমান হাদীর নসিহত",
    "yt_source_url": ""
  }
]

def get_video_metadata(url):
    if not url:
        return None
    
    ydl_opts = {
        'quiet': True,
        'skip_download': True,
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            
            # Get dimensions
            width = info.get('width')
            height = info.get('height')
            
            # Simple Aspect Ratio Calculation
            aspect_ratio = None
            if width and height:
                aspect_ratio = width / height

            return {
                "title": info.get('title'),
                "duration": info.get('duration_string'),
                "width": width,
                "height": height,
                "aspect_ratio": round(aspect_ratio, 2) if aspect_ratio else None,
                "width": width,
                "height": height,
                "uploader": info.get('uploader') or info.get('uploader_id')
            }
    except Exception as e:
        return {"error": f"Error fetching {url}: {str(e)}"}

updated_interviews = []

print("ডেটা সংগ্রহের কাজ শুরু হচ্ছে...")

for item in interviews:
    # যদি ইউটিউব ইউআরএল থাকে তবে সেটি ব্যবহার করবে, নাহলে ফেসবুক ইউআরএল দেখবে
    target_url = item.get('yt_source_url') or item.get('fb_url')
    
    if target_url:
        metadata = get_video_metadata(target_url)
        new_item = {**item}
        new_item['fetched_metadata'] = metadata
        updated_interviews.append(new_item)
    else:
        updated_interviews.append(item)

print("\nসব ডেটা সংগ্রহ সম্পন্ন হয়েছে!")
print(json.dumps(updated_interviews, indent=2, ensure_ascii=False))