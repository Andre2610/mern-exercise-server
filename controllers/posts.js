import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res, next) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).send(postMessages);
  } catch (error) {
    console.log("Error", error.message);
    res.status(404).send({ message: error.message });
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { data } = req.body;

    // Create a new instance of the PostMessage model with the data provided
    const newPost = new PostMessage(data);

    // Save the post in the DB
    await newPost.save();

    res.status(201).send(newPost);
  } catch (error) {
    console.log("Error", error.message);
    res.status(409).send({ message: error.message });
  }
};
