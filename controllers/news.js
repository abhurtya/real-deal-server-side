import News from "../models/news.js";

// Add a news article
export const addNews = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNews = new News({ title, description });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update a news article
export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No news with that id");
    const updatedNews = { title, description, _id: id };
    await News.findByIdAndUpdate(id, updatedNews, { new: true });
    res.json(updatedNews);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Delete a news article
export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No news with that id");
    await News.findByIdAndRemove(id);
    res.json({ message: "News article deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get all news articles
export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addDummyData = async (req, res) => {
  const newsData = [
    {
      id: 1,
      title: "5 Do's and Don'ts of Buying Real Estate",
      description:
        "When it comes to buying real estate, there are some important things to keep in mind. In this article, we'll go over 5 key do's and don'ts to help you make a smart investment.",
    },
    {
      id: 2,
      title: "Why Purchasing Real Estate is a Great Investment",
      description:
        "Real estate can be a great investment opportunity, providing both long-term growth and short-term rental income. Here's why you should consider adding real estate to your investment portfolio.",
    },
    {
      id: 3,
      title: "Selling Real Estate: Tips for a Successful Sale",
      description:
        "Selling real estate can be a daunting task, but with the right strategy and approach, you can get the most out of your sale. Here are some tips to help you make a successful sale.",
    },
  ];

  try {
    await News.insertMany(newsData);
    res.status(201).json({ message: "News articles added successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
