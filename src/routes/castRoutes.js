const express = require('express');
const router = express.Router();
const castController = require('../controllers/castController');

router.get('/', castController.getCast);
router.get('/directors', castController.getDirectors);

module.exports = router;