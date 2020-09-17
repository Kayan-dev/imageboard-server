const { Router } = require("express");
const router = new Router();
const bcrypt = require("bcrypt");

const { image: Image } = require("../models");

// Pagination + findAndCountAll function
router.get("/", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 2, 25);
  const offset = req.query.offset || 1;

  const images = await Image.findAndCountAll({ limit, offset })
    .then((result) => res.send({ images: result.rows, total: result.count }))
    .catch((error) => next(error));
  res.json(images);
});

router.post("/", async (req, res, next) => {
  try {
    const { url, title } = req.body;
    if (!url || url === " ") {
      res.status(400).send("Must provide an url address");
    } else {
      const image = await Image.create({ url, title });
      res.json(image);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:imageId", async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.imageId);
    const image = await Image.findByPk(imageId, {});
    if (image) {
      res.send(image);
    } else {
      res.status(404).send("image not found");
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
