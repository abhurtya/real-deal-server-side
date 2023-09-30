/**/
/*
Property Routes

NAME
    Property Routing - Handles routing for property-related operations in the application.

DESCRIPTION
    This code sets up routing endpoints related to property management, including retrieval, 
    addition, update, and deletion of property records. 
    Some routes (add, update, delete) are protected by an admin middleware to ensure only 
    administrators can modify property data.

KEY VARIABLES
    - router: Express.js router instance for defining and handling routes.
    - isAdmin: Middleware to check if the user making the request is an administrator.
    
ROUTES
    - GET "/": Fetches all properties.
    - GET "/addDummyData": Endpoint to add dummy property data (for testing/dev purposes).
    - GET "/:id": Fetches a single property by its unique ID.
    - POST "/add": Admin-only route to add a new property.
    - PUT "/update/:id": Admin-only route to update an existing property by its ID.
    - DELETE "/delete/:id": Admin-only route to delete a property by its ID.

EXPORT
    Exports the router to be used in the main server setup.
*/
/**/


import express from "express";
import {
  getProperties,
  getPropertyById,
  addDummyProps,
  updateProperty,
  deleteProperty,
  addProperty,
} from "../controllers/property.js";

import {isAdmin} from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", getProperties);

router.get("/addDummyData", addDummyProps);

// route for getting a property by id
router.get("/:id", async (req, res) => {
  const property = await getPropertyById(req.params.id);
  if (property) {
    res.send(property);
  } else {
    res.status(404).send("Property not found");
  }
});

router.post("/add", isAdmin, addProperty);
router.put("/update/:id", isAdmin, updateProperty);
router.delete("/delete/:id", isAdmin, deleteProperty);

export default router;
