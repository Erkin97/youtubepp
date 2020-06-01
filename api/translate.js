const express = require("express");
const router = express.Router();
const emojiStrip = require('emoji-strip');

const { PythonShell } = require("python-shell");

router.post("/", (req, res) => {
  const { text } = req.body;
  const normText = emojiStrip(text);

  PythonShell.run(
    "translate.py",
    {
      mode: "text",
      pythonOptions: ["-u"],
      args: [normText],
    }, (err, results) => {
      if (err) throw err;
      res.json({ message: results });
    }
  );
});

module.exports = router;
