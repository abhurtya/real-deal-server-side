import Property from "../models/property.js";

// Add a new property
export const addProperty = async (req, res) => {
  const {
    name,
    description,
    location,
    price,
    bedrooms,
    bathrooms,
    sqft,
    imgUrl,
  } = req.body;
  const newProperty = new Property({
    name,
    description,
    location,
    price,
    bedrooms,
    bathrooms,
    sqft,
    imgUrl,
  });

  try {
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update an existing property
export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    location,
    price,
    bedrooms,
    bathrooms,
    sqft,
    imgUrl,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No property with that id");
  }

  const updatedProperty = {
    name,
    description,
    location,
    price,
    bedrooms,
    bathrooms,
    sqft,
    imgUrl,
    _id: id,
  };

  try {
    await Property.findByIdAndUpdate(id, updatedProperty, { new: true });
    res.json(updatedProperty);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Delete a property
export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No property with that id");
  }

  try {
    await Property.findByIdAndRemove(id);
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get all properties
export const getProperties = async (req, res) => {
  const { type } = req.query;

  try {
    let properties;
    if (type) {
      properties = await Property.find({ type });
    } else {
      properties = await Property.find();
    }
    res.status(200).json(properties);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//add some dummy data to the database
export const addDummyProps = async (req, res) => {
  const sample_listings = [
    {
      id: 1,
      title: "Spacious 2BR Apartment in Downtown",
      address: "123 Main St, Downtown, City",
      price: 2500,
      type: "rent",
      bedrooms: 2,
      bathrooms: 2,
      size: "1200 sqft",
      description:
        "Beautiful 2 bedroom, 2 bathroom apartment in the heart of downtown. Large living room and kitchen with stainless steel appliances. Close to shopping, dining, and public transportation.",
      image: "https://source.unsplash.com/300x300/?house?1",
    },
    {
      id: 2,
      title: "Charming 3BR House in Suburb",
      address: "456 Oak St, Suburb, City",
      price: 500000,
      type: "sale",
      bedrooms: 3,
      bathrooms: 2,
      size: "2000 sqft",
      description:
        "Lovely 3 bedroom, 2 bathroom house with a large yard and plenty of natural light. Updated kitchen with granite countertops and stainless steel appliances. Great location in a quiet suburb with easy access to the highway.",
      image: "https://source.unsplash.com/300x300/?house?2",
    },
    {
      id: 3,
      title: "Luxurious 5BR Villa with Pool",
      address: "789 Palm St, Beachside, City",
      price: 1000000,
      type: "sale",
      bedrooms: 5,
      bathrooms: 4,
      size: "5000 sqft",
      description:
        "Stunning 5 bedroom, 4 bathroom villa with a private pool and ocean views. Spacious living areas, gourmet kitchen, and top-of-the-line finishes throughout. Perfect for entertaining or relaxing with family.",
      image: "https://source.unsplash.com/300x300/?house?3",
    },
    {
      id: 4,
      title: "Cozy 1BR Apartment in Midtown",
      address: "1010 10th St, Midtown, City",
      price: 1500,
      type: "rent",
      bedrooms: 1,
      bathrooms: 1,
      size: "600 sqft",
      description:
        "Comfortable 1 bedroom, 1 bathroom apartment in a great location. Walking distance to restaurants, bars, and shopping. Perfect for young professionals or couples.",
      image: "https://source.unsplash.com/300x300/?house?4",
    },
    {
      id: 5,
      title: "Modern 4BR House in Gated Community",
      address: "1111 Maple Ave, Gated Community, City",
      price: 750000,
      type: "sale",
      bedrooms: 4,
      bathrooms: 3,
      size: "3000 sqft",
      description:
        "Beautiful 4 bedroom, 3 bathroom house in a secure gated community. Open floor plan with a gourmet kitchen, large bedrooms, and plenty of storage. Community amenities include a pool, tennis court, and playground.",
      image: "https://source.unsplash.com/300x300/?house?5",
    },
    {
      id: 6,
      title: "Stylish 2BR Loft in Arts District",
      address: "2222 Main St,Arts District, City",
      price: 3000,
      type: "rent",
      bedrooms: 2,
      bathrooms: 2,
      size: "1500 sqft",
      description:
        "Contemporary 2 bedroom, 2 bathroom loft with high ceilings, exposed brick walls, and hardwood floors. Located in the trendy Arts District, close to galleries, restaurants, and nightlife.",
      image: "https://source.unsplash.com/300x300/?house?6",
    },
    {
      id: 7,
      title: "Classic 3BR Colonial in Historic District",
      address: "3333 Elm St, Historic District, City",
      price: 650000,
      type: "sale",
      bedrooms: 3,
      bathrooms: 2,
      size: "2500 sqft",
      description:
        "Charming 3 bedroom, 2 bathroom Colonial with period details and modern updates. Large living and dining rooms, updated kitchen, and beautiful landscaped yard. Located in a historic district with easy access to downtown.",
      image: "https://source.unsplash.com/300x300/?house?7",
    },
    {
      id: 8,
      title: "Spectacular 4BR Penthouse with City Views",
      address: "4444 Broadway, City Center, City",
      price: 2000000,
      type: "sale",
      bedrooms: 4,
      bathrooms: 4,
      size: "4000 sqft",
      description:
        "Stunning 4 bedroom, 4 bathroom penthouse with panoramic city views. High ceilings, marble floors, and state-of-the-art appliances. Private elevator access and 24-hour doorman. A true luxury living experience.",
      image: "https://source.unsplash.com/300x300/?house?8",
    },
    {
      id: 9,
      title: "Cozy 1BR Condo in Oceanfront Building",
      address: "5555 Ocean Blvd, Oceanfront, City",
      price: 400000,
      type: "sale",
      bedrooms: 1,
      bathrooms: 1,
      size: "800 sqft",
      description:
        "Adorable 1 bedroom, 1 bathroom condo in an oceanfront building. Fully furnished with beachy decor and great natural light. Enjoy stunning ocean views and beach access from your own home.",
      image: "https://source.unsplash.com/300x300/?house?9",
    },
    {
      id: 10,
      title: "Chic 2BR Townhouse in Trendy Neighborhood",
      address: "6666 Pine St, Trendy Neighborhood, City",
      price: 550000,
      type: "sale",
      bedrooms: 2,
      bathrooms: 2,
      size: "1200 sqft",
      description:
        "Modern 2 bedroom, 2 bathroom townhouse in a trendy neighborhood. High-end finishes, open floor plan, and private outdoor space. Close to shops, restaurants, and public transportation.",
      image: "https://source.unsplash.com/300x300/?house?10",
    },
  ];

  try {
    await Property.insertMany(sample_listings);
    res.status(201).json({ message: "Props added successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
