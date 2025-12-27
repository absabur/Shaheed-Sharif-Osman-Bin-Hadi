const { Schema, mongoose } = require("mongoose");

const fileRequestSchema = new Schema({
  contributor_name: { type: String, trim: true },
  contributor_email: { type: String, trim: true},
  content_type: {
    type: String,
    enum: ["video", "photo", "document"],
    required: true,
  },
  title: { type: String, trim: true, required: true },
  source_url: { type: String, trim: true, required: true }, // Drive/FB/YT link
  description: { type: String, trim: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createDate: { type: Object },
});

module.exports =
  mongoose.models.FileRequest ||
  mongoose.model("FileRequest", fileRequestSchema);
