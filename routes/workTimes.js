var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const workTimes = req.db.workTimes.findAll({});
  res.send(workTimes);
});

module.exports = router;
