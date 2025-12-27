"use server";

import Tribute from "@/models/tribute";
import connectDB from "./config/db";

export async function AllTribute(page = 1, limit = 10) {
  try {
    await connectDB();
    const skip = (page - 1) * limit;

    const totalTributes = await Tribute.countDocuments({ is_approved: true });
    const tributes = await Tribute.find({ is_approved: true })
      .sort({ createDate: -1 })
      .skip(skip)
      .limit(limit);

    return {
      tributes: JSON.parse(JSON.stringify(tributes)),
      totalPages: Math.ceil(totalTributes / limit),
    };
  } catch (error) {
    console.error(error);
    return { tributes: [], totalPages: 0 };
  }
}
