const { Router } = require("express");

const users = ["Me", "She"];
const router = new Router();

const { user: User } = require("../models");

router.get("/", (request, response) => response.send(users));

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || email === " ") {
      res.status(400).send("Must provide an url address");
    } else if (!password || password === " ") {
      res.status(400).send("Must provide a password");
    } else if (!fullName || fullName === " ") {
      res.status(400).send("Must provide a full name");
    } else {
      const newUser = await User.create({ email, password, fullName });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;