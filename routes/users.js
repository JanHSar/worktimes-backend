var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await req.db.user.findAll({

  })
  res.send(users);
});

module.exports = router;
