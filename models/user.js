import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    profileImage: {
      type: String,
    },
    googleId: {
      type: String,

    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
