import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User email is required"],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
    },
    age: {
      type: Number,
    },
    gender: String,
    birthDate: Number,
    birthMonth: Number,
    birthYear: Number,
    mobile: String,
  },
  { minimal: true }
);

export const User = mongoose.model("Users", userSchema);
