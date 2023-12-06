const express = require('express');
const router = express.Router();
const castController = require('../controllers/castController');

router.get('/:movieId', castController.getCast);
router.get('/:movieId/directors', castController.getDirectors);

module.exports = router;