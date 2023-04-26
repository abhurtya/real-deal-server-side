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

// Get a property by id
export const getPropertyById = async (id) => {
  try {
    const property = await Property.findById(id);
    return property;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Get properties with query filter if any
export const getProperties = async (req, res) => {
  const {
    type,
    minPrice,
    maxPrice,
    minBedrooms,
    maxBedrooms,
    minBathrooms,
    maxBathrooms,
    minSize,
    maxSize,
  } = req.query;

  const filters = {};

  if (type) {
    filters.type = type;
  }

  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) {
      filters.price.$gte = parseInt(minPrice);
    }
    if (maxPrice) {
      filters.price.$lte = parseInt(maxPrice);
    }
  }

  if (minBedrooms || maxBedrooms) {
    filters.bedrooms = {};
    if (minBedrooms) {
      filters.bedrooms.$gte = parseInt(minBedrooms);
    }
    if (maxBedrooms) {
      filters.bedrooms.$lte = parseInt(maxBedrooms);
    }
  }

  if (minBathrooms || maxBathrooms) {
    filters.bathrooms = {};
    if (minBathrooms) {
      filters.bathrooms.$gte = parseInt(minBathrooms);
    }
    if (maxBathrooms) {
      filters.bathrooms.$lte = parseInt(maxBathrooms);
    }
  }

  if (minSize || maxSize) {
    filters.size = {};
    if (minSize) {
      filters.size.$gte = parseInt(minSize);
    }
    if (maxSize) {
      filters.size.$lte = parseInt(maxSize);
    }
  }

  try {
    const properties = await Property.find(filters);
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
      latitude: 40.7128,
      longitude: -74.006,
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
      latitude: 41.8781,
      longitude: -87.6298,
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
      latitude: 25.7907,
      longitude: -80.13,
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
      latitude: 37.7749,
      longitude: -122.4194,
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
      latitude: 37.7749,
      longitude: -122.4194,
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
      latitude: 34.0412,
      longitude: -118.2347,
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
      latitude: 41.8781,
      longitude: -87.6298,
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
      latitude: 40.7128,
      longitude: -74.006,
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
      latitude: 33.815,
      longitude: -118.3955,
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
      latitude: 34.09,
      longitude: -118.3617,
    },
    {
      id: 11,
      title: "Elegant 4BR House in Princeton",
      address: "10 Nassau St, Princeton, NJ",
      price: 850000,
      type: "sale",
      bedrooms: 4,
      bathrooms: 3,
      size: "2800 sqft",
      description:
        "Beautiful 4 bedroom, 3 bathroom house in a peaceful neighborhood in Princeton. The house features a spacious living room, hardwood floors, and a large backyard. The kitchen is equipped with stainless steel appliances and granite countertops. Great schools and easy access to downtown Princeton.",
      image: "https://source.unsplash.com/300x300/?house?11",
      latitude: 40.3501,
      longitude: -74.6532,
    },
    {
      id: 12,
      title: "Charming 2BR Apartment in Hoboken",
      address: "56 Hudson St, Hoboken, NJ",
      price: 3000,
      type: "rent",
      bedrooms: 2,
      bathrooms: 1,
      size: "1000 sqft",
      description:
        "Lovely 2 bedroom, 1 bathroom apartment in a historic building in Hoboken. The apartment features a bright living room, updated kitchen, and hardwood floors. Walking distance to restaurants, bars, and shopping.",
      image: "https://source.unsplash.com/300x300/?house?12",
      latitude: 40.743,
      longitude: -74.0324,
    },
    {
      id: 13,
      title: "Spacious 5BR House in Summit",
      address: "75 Springfield Ave, Summit, NJ",
      price: 1200000,
      type: "sale",
      bedrooms: 5,
      bathrooms: 4,
      size: "4000 sqft",
      description:
        "Stunning 5 bedroom, 4 bathroom house in the sought-after city of Summit. The house features a gourmet kitchen, large living room, and beautiful backyard. The bedrooms are spacious with plenty of natural light. Great schools and easy access to NYC.",
      image: "https://source.unsplash.com/300x300/?house?13",
      latitude: 40.7131,
      longitude: -74.3688,
    },
    {
      id: 14,
      title: "Luxurious 3BR Condo in Jersey City",
      address: "100 Warren St, Jersey City, NJ",
      price: 1800000,
      type: "sale",
      bedrooms: 3,
      bathrooms: 2,
      size: "2200 sqft",
      description:
        "Stylish 3 bedroom, 2 bathroom condo in the heart of Jersey City. The condo features an open floor plan, high ceilings, and floor-to-ceiling windows with stunning views of the city. The kitchen is equipped with high-end appliances and granite countertops. Building amenities include a pool, gym, and 24-hour concierge.",
      image: "https://source.unsplash.com/300x300/?house?14",
      latitude: 40.7178,
      longitude: -74.0431,
    },
    {
      id: 15,
      title: "Cozy 1BR Cottage in Cape May",
      address: "125 Beach Ave, Cape May, NJ",
      price: 450000,
      type: "sale",
      bedrooms: 1,
      bathrooms: 1,
      size: "800 sqft",
      description:
        "Adorable 1 bedroom, 1 bathroom cottage in the charming town of Cape May. The cottage features  a bright living room, updated kitchen, and hardwood floors. The backyard is perfect for entertaining with a deck and fire pit. Walking distance to the beach and downtown Cape May.",
      image: "https://source.unsplash.com/300x300/?house?15",
      latitude: 38.9351,
      longitude: -74.906,
    },
    {
      id: 16,
      title: "Gorgeous 4BR House in Princeton",
      address: "20 Mercer St, Princeton, NJ",
      price: 950000,
      type: "sale",
      bedrooms: 4,
      bathrooms: 3,
      size: "3000 sqft",
      description:
        "Beautiful 4 bedroom, 3 bathroom house in a peaceful neighborhood in Princeton. The house features a spacious living room, hardwood floors, and a large backyard. The kitchen is equipped with stainless steel appliances and granite countertops. Great schools and easy access to downtown Princeton.",
      image: "https://source.unsplash.com/300x300/?house?16",
      latitude: 40.3501,
      longitude: -74.6532,
    },
    {
      id: 17,
      title: "Charming 2BR Apartment in Hoboken",
      address: "56 Hudson St, Hoboken, NJ",
      price: 3000,
      type: "rent",
      bedrooms: 2,
      bathrooms: 1,
      size: "1000 sqft",
      description:
        "Lovely 2 bedroom, 1 bathroom apartment in a historic building in Hoboken. The apartment features a bright living room, updated kitchen, and hardwood floors. Walking distance to restaurants, bars, and shopping.",
      image: "https://source.unsplash.com/300x300/?house?17",
      latitude: 40.743,
      longitude: -74.0324,
    },
  ];

  try {
    await Property.insertMany(sample_listings);
    res.status(201).json({ message: "Props added successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
