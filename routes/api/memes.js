var router = require("express").Router();
var Meme = require("../../models/Meme");
var Comment = require("../../models/comment");

router
  .route("/")
  .get(async (req, res) => {
    const memes = await Meme.findAll();
    res.json({ memes: memes });
  })
  .post(async (req, res) => {
    const result = await Meme.create(req.body);
    res.json(result);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const meme = await Meme.findAll({ where: { id: req.params.id } });
    res.json(meme);
  })
  .put(async (req, res) => {
    const result = await Meme.update(req.body, {
      where: { id: req.params.id }
    });
    res.json(result);
  })
  .delete(async (req, res) => {
    const result = await Meme.destroy({ where: { id: req.params.id } });
    res.json(result);
  });

router
  .route("/:id/comments")
  .get(async (req, res) => {
    const comments = await Comment.findAll({
      where: { MemeId: req.params.id }
    });

    res.json(comments);
  })
  .post(async (req, res) => {
    req.body.MemeId = req.params.id;
    const result = await Comment.create(req.body);
    res.json(result);
  });

module.exports = router;
