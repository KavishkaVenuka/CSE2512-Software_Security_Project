const express = require('express');
const router = express.Router();
const checkJwt = require('../middleware/auth.middleware');

const cartController = require('../controllers/cart.controller');

// Protect all cart routes
router.use(checkJwt);

router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.get('/test-write', cartController.testWrite); // Open endpoint for testing (protected by router.use(checkJwt))

module.exports = router;
