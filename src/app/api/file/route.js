import connectDB from "@/config/db";
import { localTime } from "@/config/localtime";
import FileRequest from "@/models/file";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    // Mapping the incoming form data to your Schema
    const newRequest = new FileRequest({
      contributor_name: data.contributor_name,
      contributor_email: data.contributor_email,
      content_type: data.content_type,
      title: data.title,
      source_url: data.source_url,
      description: data.description || "",
      status: "pending",
      createDate: localTime(),
    });

    await newRequest.save();

    return NextResponse.json(
      { message: "অনুরোধটি সফলভাবে জমা দেওয়া হয়েছে। যাচাইয়ের পর এটি আর্কাইভে যুক্ত করা হবে।" }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("File Request Error:", error);
    return NextResponse.json(
      { error: error.message || "জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।" }, 
      { status: 500 }
    );
  }
}
