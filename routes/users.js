var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await req.db.user.findAll({

  })
  res.send(users);
});

/**
 * Log find and log in a user
 */
router.post('/auth', async function(req, res, next) {
  try {
    // Find User with credentials
    const user = await req.db.user.findOne({
      where: {
        name: req.body.userName,
        password: req.body.password
      }
    });

    if(user) {
      // Generate xApiKey
      const xApiKey = await generateXApiKey();
      // Save key to db
      await user.update({xApiKey: xApiKey});
      await user.save();

      res.send(user);
    } else {
      res.status(401).send('Unauthorized');
    }

  } catch (err) {
    console.log(err);
    res.status(401).send('Unauthorized');
  }
})

/**
 * Generates random hased string
 * @returns xApiKey 
 */
async function generateXApiKey() {
  const token = crypto.randomUUID();
  const xApiKey = await bcrypt.hash(token, 6);
  return xApiKey;
}

module.exports = router;
