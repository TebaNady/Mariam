import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    id: {
      unique: true,
      type: String,
      required: true,
      minLength: [14, "ID must be 14 characters"],
      maxLength: [14, "ID must be 14 characters"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password must contain at least 8 characters"]
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    year: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPay: { type: Boolean, default: false },
    university: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const studentModel = mongoose.model("Student", studentSchema);

export default studentModel;
