module.exports = async (req, res, next) => {

  // Get user by xApiKey
  const xApiKey = req.headers['x-api-key'];
  if (xApiKey && xApiKey.lenght > 3) {
    try {
      const user = await req.db.user.findOne({
        where: {xApiKey}
      });

      // Add user to request
      req.user = user;
      res.status(200);
      
      return next();
    } catch (err) {
      console.log(err);
    }
    // Send unauthorized if invalid xApiKey
    return res.status(401).send('Unauthorized')
  }
}