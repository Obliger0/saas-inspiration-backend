const express = require('express');
const router = express.Router();
const inspirationController = require('../controllers/inspirationController');
const validateRequest = require('../middlewares/validateRequest');
const { extractLinksSchema, addInspirationsSchema } = require('../validations/inspirationValidation');

// Extract internal links
router.post('/extract-links', validateRequest(extractLinksSchema), inspirationController.extractLinks);

// Add selected inspirations
router.post('/', validateRequest(addInspirationsSchema), inspirationController.addInspirations);

// Get all inspirations
router.get('/', inspirationController.getInspirations);

// Get single inspiration
router.get('/:slug', inspirationController.getInspirationBySlug);

module.exports = router;
