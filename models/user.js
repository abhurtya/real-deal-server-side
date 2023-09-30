/**/
/*
User Model

NAME
    User Schema - Defines the structure of the User entity in the application's database.

DESCRIPTION
    This module creates and exports a Mongoose schema for users. It contains various attributes
    pertinent to user entities, such as their first name, last name, email, profile image, Google ID, and role.

FIELDS
    - firstname: User's first name (required).
    - lastname: User's last name.
    - email: User's email (unique and required).
    - profileImage: URL or path to the user's profile image.
    - googleId: Google's unique identifier for users who register or sign in with Google.
    - role: Defines the user's role in the application. It can either be "user" or "admin", with the default being "user".

EXPORT
    Exports the User model to be used in other parts of the application where database operations related to users are required.
*/
/**/

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
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
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
