const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');

const port = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('combined'));

// routers
app.use("/translate", require('./translate'));

// welcome page <3
app.get("/", (req, res) => {
  res.send('Hello!\n This is YouTube++ API, visit https://github.com/erkin97/youtubepp for me info.');
});

// do your work!!!
app.listen(port, () =>
  console.log(`Listening at http://localhost:${port}`)
);
