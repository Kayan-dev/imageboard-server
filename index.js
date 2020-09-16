const express = require("express");
const app = express();
const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log("listening on port " + PORT));
