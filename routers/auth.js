const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const router = new Router();
const { user: User } = require("../models");
const bcrypt = require("bcrypt");
const authMiddleware = require("../auth/middleware");

router.get("/test-auth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  });
});

router.post("/", async (req, res, next) => {
  // 1. find user based on email address
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  } else {
    // 1. find user based on email address
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log("Who is user?", user);
    if (!user) {
      res.status(400).send({
        message: "User with that email does not exist",
      });
    }
    // 2. use bcrypt.compareSync to check the password against the stored hash
    else if (bcrypt.compareSync(password, user.password)) {
      // 3. if the password is correct, return a JWT with the userId of the user (user.id)
      const jwt = toJWT({ userId: user.id });
      console.log("What is JWT?", jwt);
      res.send({
        jwt,
      });
    } else {
      console.log("what is password", password);
      console.log("what is password2", user.password);
      console.log("Who is user?2", user);
      res.status(400).send({
        message: "Password was incorrect",
      });
    }
  }
});

module.exports = router;
