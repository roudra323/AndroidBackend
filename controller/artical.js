const mongoose = require("mongoose");
const articleSchema = require("../model/article");
const Article = mongoose.model("Artical", articleSchema);
const path = require("path");
const fs = require("fs");

const articlePost = async (req, res) => {
  try {
    const art = new Article(req.body);
    // console.log(req.body);
    // art.articlePicture = req.file.filename;
    // console.log(art.articlePicture);
    await art.save();
    res.status(200).json({
      message: "Article added successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was a server-side error!",
    });
  }
};

const articleGetOne = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      return res.status(400).json({ message: "Id parameter is missing" });
    }
    const article = await Article.findOne({ _id });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ article });
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const articleGetAll = async (req, res) => {
  try {
    const articles = await Article.find();

    if (articles.length === 0) {
      return res.status(404).json({ message: "No articles found" });
    }

    res.json({ articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editPost = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const article = await Article.findOne({ _id: id });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    const posterId = req.body.posterId;
    if (article.posterId != posterId) {
      return res
        .status(404)
        .json({ message: "You can only edit your own article" });
    }

    if (
      req.file &&
      article.articlePicture &&
      article.articlePicture != "demo.jpg"
    ) {
      const oldProfilePicturePath = path.join(
        __dirname,
        "..",
        "uploads",
        article.articlePicture
      );
      // console.log(oldProfilePicturePath);
      try {
        if (fs.existsSync(oldProfilePicturePath)) {
          fs.unlinkSync(oldProfilePicturePath);
        }
      } catch (deleteError) {
        console.error("Error deleting old profile picture:", deleteError);
      }
      req.body.articlePicture = req.file.filename;
    }

    const result = await Article.updateOne({ _id: id }, { $set: req.body });
    if (result.nModified === 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    if (!result.acknowledged) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article updated successfully" });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(_id);
    const article = await Article.findOne({ _id });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const posterId = req.body.posterId;
    // console.log(posterId);

    if (article.posterId != posterId) {
      return res
        .status(404)
        .json({ message: "You can only delete your own article" });
    }

    if (article.articlePicture && article.articlePicture != "demo.jpg") {
      const oldProfilePicturePath = path.join(
        __dirname,
        "..",
        "uploads",
        article.articlePicture
      );
      // console.log(oldProfilePicturePath);
      try {
        if (fs.existsSync(oldProfilePicturePath)) {
          fs.unlinkSync(oldProfilePicturePath);
        }
      } catch (deleteError) {
        console.error("Error deleting old profile picture:", deleteError);
      }
    }

    const result = await Article.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  articlePost,
  articleGetOne,
  articleGetAll,
  editPost,
  deletePost,
};
