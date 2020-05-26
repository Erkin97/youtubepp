var express = require("express");
var router = express.Router();

const { PythonShell } = require("python-shell");

router.post("/", (req, res) => {
  const { text } = req.body;

  PythonShell.run(
    "translate.py",
    {
      mode: "text",
      pythonOptions: ["-u"],
      args: [text],
    }, (err, results) => {
      if (err) throw err;
      res.json({ message: results });
    }
  );
});

module.exports = router;
