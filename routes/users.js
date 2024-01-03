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
    let user = await req.db.user.scope('auth').findOne({
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

      // Return user with default scope
      user = await req.db.user.findOne({
        where: {
          id: user.id
        }
      });

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

/**
 * Get user by xApiKey
 */
router.get('/me', async function(req, res) {

  // End if no xApiKey was provided
  if(!req.headers['x-api-key']) {
    res.status(401).send('Unauthorized');
    return;
  }

  // Get user with xApiKey
  const xApiKey = req.headers['x-api-key'];
  const user = await req.db.user.findOne({
    where: {
      xApiKey: xApiKey
    }
  });

  if (!user) {
    res.status(401).send('Unauthorized');
    return;
  }

  res.send(user);
});

function getMe() {}

module.exports = router;
