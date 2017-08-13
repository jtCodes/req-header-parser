var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  const regex = /([^\($\)]+)/g;
  const os = req.headers['user-agent']
  let m;
  let arr = [];

  while ((m = regex.exec(os)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      arr.push(match)
      console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }
  res.send({ip: req.ip, language: req.headers['accept-language'], os: arr[2], browser: arr[arr.length-1]});
});

module.exports = router;
