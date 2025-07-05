const express = require('express');
const router = express.Router();
const controller = require('../controllers/adoptionRequest.controller');

router.patch('/adoption-requests/:id', controller.updateRequestStatus);

module.exports = router;
