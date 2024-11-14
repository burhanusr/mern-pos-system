const express = require('express');

const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const authMiddleware = require('./../middlewares/authMiddleware');
const deliveryController = require('./../controllers/deliveryController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Protect all routes after this middleware
router.use(authMiddleware.protect);

router.patch('/profile', userController.updateCurrentUser);
router.get('/address', deliveryController.getAllDeliveriesUser);

// Admin Privilage after this middleware
router.use(authMiddleware.restrictTo('admin'));

// router.get('/:id', userController.getUser);

module.exports = router;
