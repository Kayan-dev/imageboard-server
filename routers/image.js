const { Router } = require("express");

const images = ["Scenery", "Beaautiful"];
const router = new Router();

const { image: Image } = require("../models");

router.get("/", (req, res, next) => {
  const images = await Images.findAll();
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
