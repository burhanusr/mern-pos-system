const express = require('express');

const userController = require('./../controllers/userController');
const deliveryController = require('./../controllers/deliveryController');
const authMiddleware = require('./../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes after this middleware
router.use(authMiddleware.protect);

router.get('/profile', userController.getMe);
router.patch('/profile', userController.updateCurrentUser);
router.get('/address', deliveryController.getAllDeliveriesUser);

// Admin Privilage after this middleware
router.use(authMiddleware.restrictTo('admin'));

// router.get('/:id', userController.getUser);

module.exports = router;
