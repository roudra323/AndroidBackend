const mongoose = require("mongoose");
const articleSchema = require("../model/article");
const Article = mongoose.model("Artical", articleSchema);

const articlePost = async (req, res) => {
    try {
        const art = new Article(req.body);
        await art.save();
        res.status(200).json({
            message: "Singup successfully!",
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
        const articles =  await Article.find();

        if (articles.length === 0) {
            return res.status(404).json({ message: "No articles found" });
        }

        res.json({ articles });
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {articlePost,articleGetOne,articleGetAll};