const User = require("../models").user;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  // 1. check for authorization header and "split" it.
  console.log(req.headers);
  const splittedHeader =
    req.headers.authorization && req.headers.authorization.split(" ");
  // 2. if authorization header is there, auth type is Bearer and we have something at auth[1] we proceed to check the token.
  if (splittedHeader && splittedHeader[0] === "Bearer" && splittedHeader[1]) {
    //    Remember to try/catch the call to "toData()".
    try {
      const data = toData(splittedHeader[1]);
      console.log("what is data", data);
      // 3. Use the value returned from "toData()" to look for that user in your database with User.findByPk
      const user = await User.findByPk(data.userId);
      // 4. If not found, set status to 404 "no user found";
      // 5. If user is found, set it to `req.user = user` and call next();
      req.user = user;
      next();
    } catch (e) {
      return res.status(401).send("Invalid token");
    }
  } else {
    //    If not, we return a 401 status and the message: 'Please supply some valid credentials
    return res.status(401).send("Invalid token");
  }
}

module.exports = auth;
