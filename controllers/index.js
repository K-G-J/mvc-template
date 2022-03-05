const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');

// api routes
router.use('/api', apiRoutes);
// html routes
router.use('/', homeRoutes);

// if request endpoint does not exsist send 404 
router.use((req, res) => {
	res.status(404).end();
});

module.exports = router;
