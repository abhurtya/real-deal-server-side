/**/
/*
News Model

NAME
    News Schema - Defines the structure of the News entity in the real estate app's database.

DESCRIPTION
    This module creates and exports a Mongoose schema for news articles or updates. The schema encapsulates
    articles' main attributes such as title and description, ensuring data consistency and integrity when news 
    articles are saved to or retrieved from the database.

FIELDS
    - title: The headline or main title of the news article (required).
    - description: A detailed account or description of the news event or update (required).

EXPORT
    Exports the News model to be utilized in other parts of the application for database operations related to news articles.
*/
/**/

import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("News", NewsSchema);
