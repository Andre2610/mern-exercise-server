import mongoose from "mongoose";
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

export const updatePost = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const { data } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send({ message: "Post not found" });

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, data, {
      new: true,
    });

    res.status(200).send(updatedPost);
  } catch (error) {
    console.log("Error", error.message);
    res.status(409).send({ message: error.message });
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: "Post not found" });

    await PostMessage.findByIdAndRemove(id);

    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error", error.message);
    res.status(409).send({ message: error.message });
  }
};

export const likePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ message: "Post not found" });

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      {
        new: true,
      }
    );

    res.status(200).send(updatedPost);
  } catch (error) {
    console.log("Error", error.message);
    res.status(409).send({ message: error.message });
  }
};
