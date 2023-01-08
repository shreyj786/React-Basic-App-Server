import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res, next) => {
  try {
    const postMessage = await PostMessage.find();

    // console.log(postMessage);

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res, next) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res, next) => {
  const { id: _id } = req.params;

  console.log(`check ID => ${_id}`);
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No selected post available ");
  } else {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      {
        new: true,
      }
    );

    res.status(200).json(updatedPost);
  }
};

export const deletePost = async (req, res, next) => {
  const { id: _id } = req.params;

  console.log(`check ID => ${_id}`);
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No selected post available ");
  } else {
    const updatedPost = await PostMessage.findByIdAndRemove(_id);

    res.status(200).json({ message: "Post Deleted Successfully" });
  }
};

export const likePost = async (req, res, next) => {
  const { id: _id } = req.params;

  console.log(`check ID => ${_id}`);
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No selected post available ");
  } else {
    const post = await PostMessage.findById(_id);

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  }
};
