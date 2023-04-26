import express from "express";
import {
  getProperties,
  getPropertyById,
  addDummyProps,
} from "../controllers/property.js";

const router = express.Router();

router.get("/", getProperties);

router.get("/addDummyData", addDummyProps);

// new route for getting a property by id
router.get("/:id", async (req, res) => {
  const property = await getPropertyById(req.params.id);
  if (property) {
    res.send(property);
  } else {
    res.status(404).send("Property not found");
  }
});

export default router;
