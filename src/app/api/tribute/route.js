import connectDB from "@/config/db";
import { localTime } from "@/config/localtime";
import Tribute from "@/models/tribute";
import { NextResponse } from "next/server";

// 1. POST: Public Submission
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    // Mapping the incoming data to the Tribute schema
    const newTribute = new Tribute({
      name: data.name,
      relation: data.relation || "সাধারণ নাগরিক",
      message: data.message,
      is_approved: false,
      createDate: localTime(),
    });

    await newTribute.save();

    return NextResponse.json(
      {
        message:
          "শ্রদ্ধাঞ্জলি গ্রহণ করা হয়েছে। যাচাইয়ের পর এটি প্রকাশ করা হবে।",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Tribute Post Error:", error);
    return NextResponse.json(
      { error: error.message || "বার্তা পাঠানো সম্ভব হয়নি" },
      { status: 500 }
    );
  }
}
