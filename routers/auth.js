const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  // Here goes the login logic.
  const { password, email } = req.body;
  if (!password || !email) {
    res.status(400).send({
      message: "Please supply a valid email and password",
    });
  } else {
    res.send({
      jwt: toJWT({ userId: 1 }),
    });
  }
});

module.exports = router;
