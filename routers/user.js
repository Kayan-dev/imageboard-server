const { Router } = require("express");
const bcrypt = require("bcrypt");

const users = ["Me", "he"];
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
      console.log("TESTPASS", password);
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
