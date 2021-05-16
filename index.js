const express = require("express");
const app = express();
const port = 3000;

const register = require("./routes/register");

app.use(express.json());
app.use("/api/register", register);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
