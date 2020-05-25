const express = require("express");
const app = express();
const cors = require('cors');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/", (req, res) => {
  const { text } = req.body;
  res.json({
    message: text + "translate me later plz"
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
