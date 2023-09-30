/**/
/*
Property Model

NAME
    Property Schema - Defines the structure of the Property entity in the application's database.

DESCRIPTION
    This module creates and exports a Mongoose schema for properties. It contains various attributes
    pertinent to property entities, such as title, address, price, type, and other details relevant to real estate properties.

FIELDS
    - title: Title or name of the property (required).
    - address: Complete address of the property (required).
    - price: Price or rental amount of the property (required).
    - type: The purpose for which the property is available - either "sale" or "rent" (required).
    - bedrooms: Number of bedrooms in the property (required).
    - bathrooms: Number of bathrooms in the property (required).
    - size: Size or area of the property, typically in square feet/meters or other units (required).
    - description: A brief description or other relevant details about the property (required).
    - image: URL or path to an image of the property.
    - latitude: The latitude coordinate for geolocation purposes (required).
    - longitude: The longitude coordinate for geolocation purposes (required).

EXPORT
    Exports the Property model to be used in other parts of the application where database operations related to properties are required.
*/
/**/

import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["sale", "rent"],
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);
