// controller/commentController.js
import Comment from "../model/commentModel.js";

export const createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const userId = req.user.id;

    const comment = new Comment({ postId, user: userId, text });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка при створенні коментаря" });
  }
};
