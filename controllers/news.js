import News from "../models/news.js";

/**/
/*
NAME
    addNews - Adds a new news entry to the database.

SYNOPSIS
    addNews(req, res)

DESCRIPTION
    This function receives the title and description of a news entry from the request body.
    It creates a new instance of the News model using the provided data and then saves 
    this new entry to the database. Upon successful addition, a 201 status code is sent 
    with the added news. In case of an error, a 409 status code is sent with an error message.

PARAMETERS
    - req: The HTTP request object, containing the title and description in the body.
    - res: The HTTP response object, used to send back the added news or an error message.

RETURNS
    - On Successful Addition: 201 status code with the newly added news entry in JSON format.
    - On Error: 409 status code with an error message.
*/
/**/

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

/**/
/*
NAME
    updateNews - Updates an existing news entry in the database.

SYNOPSIS
    updateNews(req, res)

DESCRIPTION
    This function receives the title and description of a news entry from the request body and the 
    id from the request parameters. It updates the corresponding news entry in the database with 
    the provided details. If the specified news entry does not exist, it sends back a 404 status code 
    with an appropriate error message. In case of a successful update, it returns a 200 status code 
    with a success message and the updated news. If there's an internal server error, it sends a 500 status code.

PARAMETERS
    - req: The HTTP request object, containing the title and description in the body, and the id in the parameters.
    - res: The HTTP response object, used to send back the success/error message and, if successful, the updated news.

RETURNS
    - On Successful Update: 200 status code with a success message and the updated news in JSON format.
    - If News Not Found: 404 status code with an error message.
    - On Internal Server Error: 500 status code with an error message.
*/
/**/

export const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedNews = { title, description, _id: id };
    const doneUpdate = await News.findByIdAndUpdate(id, updatedNews, { new: true });
    
    //In case of no news with that id
    if (!doneUpdate) {
      return res.status(404).json({ message: 'News not found' });
    }

    
    return res.status(200).json({ message: 'News updated successfully', updatedNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**/
/*
NAME
    deleteNews - Deletes a news entry from the database.

SYNOPSIS
    deleteNews(req, res)

DESCRIPTION
    This function deletes a specific news entry from the database. It retrieves the id of the news 
    entry to be deleted from the request parameters. If a news entry with the specified id is found, 
    it is deleted and a success message is sent back. If no news entry is found with the given id, 
    it sends back a 404 status code with an appropriate error message. If there's an internal server 
    error during the process, it sends a 500 status code.

PARAMETERS
    - req: The HTTP request object, containing the id of the news entry to be deleted in the parameters.
    - res: The HTTP response object, used to send back the success/error message.

RETURNS
    - On Successful Deletion: 200 status code with a success message.
    - If News Not Found: 404 status code with an error message.
    - On Internal Server Error: 500 status code with an error message.
*/
/**/

export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    // Use findByIdAndRemove to delete the news item by its ID
    const deletedNews = await News.findByIdAndRemove(id);

    //In case of no news with that id
    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    return res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**/
/*
NAME
    getNews - Retrieves all news articles from the database.

SYNOPSIS
    getNews(req, res)

DESCRIPTION
    This function queries the database to fetch all available news articles. Once retrieved,
    it sends back the news articles in a JSON format with a 200 status code. If an error occurs
    while fetching the news articles, it sends back a 404 status code with an appropriate error message.

PARAMETERS
    - req: The HTTP request object.
    - res: The HTTP response object, used to send back the retrieved news articles or an error message.

RETURNS
    - On Success: 200 status code with all news articles in JSON format.
    - On Error: 404 status code with an error message.
*/
/**/

export const getNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//adds some dummy data to the database for testing/dev purposes
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
