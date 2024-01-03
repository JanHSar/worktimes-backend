var express = require('express');
var router = express.Router();
var { Op } = require('sequelize');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  const workTimes = req.db.workTimes.findAll({});
  res.send(workTimes);
});

router.get('/today', async function(req, res) {
  // Define today as var
  const now = new Date();
  const dd = now.getDate();
  const mm = now.getMonth();
  const yyyy = now.getFullYear()
  const today = new Date(yyyy, mm, dd);

  /**
   *  Get todays worktimes
   */
  const workTimesToday = await req.db.workTimes.findAll({
    where: {
      userId: req.user.id,
      start: {
        [Op.gte]: today
      }
    },
    order: ['start']
  });

  res.send(workTimesToday);
});

/**
 * Create new work time entry for requesting user
 */
router.post('/start', async function(req, res, next) {
  const workTime = await req.db.workTimes.create({
    userId: req.user.id,
    start: new Date()
  });

  res.send(workTime);
});

/**
 * Set end time for work time
 */
router.patch('/stop', async function(req, res, next) {
  
  // Get requested work time
  const workTime = await req.db.workTimes.findOne({
    where: {
      userId: req.user.id,
      id: req.body.workTimeId
    }
  });

  // Set end time
  workTime.update({end: new Date()});
  workTime.save();

  res.send(workTime);
});

module.exports = router;
