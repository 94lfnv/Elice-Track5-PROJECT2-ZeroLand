// reference:
// https://nodejs.org/en/docs/guides/getting-started-guide/
const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.SERVER_PORT || 5000;

app
  .listen(PORT, () => {
    console.log(` 🚀Server started on port ${PORT}!`);
  })
  .on("error", (err) => console.log(err));
//---------------//
// const connection = require("./src/db/database.js");
