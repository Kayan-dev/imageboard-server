const express = require("express");
const app = express();
const PORT = process.env.PORT || 4002;
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const jsonParser = express.json();
const authRouter = require("./routers/auth");

app.use(jsonParser);
app.use("/images", imageRouter);
app.use("/users", userRouter);
app.use("/login", authRouter);

app.listen(PORT, () => console.log("listening on port " + PORT));
