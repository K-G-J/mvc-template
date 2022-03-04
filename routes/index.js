const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

// if request endpoint does not exsist send 404
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
