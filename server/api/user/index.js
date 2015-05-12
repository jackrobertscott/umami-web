'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

// Added routes

router.put('/:id', auth.isAuthenticated(), controller.update);
router.put('/:id/promote', auth.isAuthenticated(), controller.promote);
router.put('/:id/demote', auth.isAuthenticated(), controller.demote);

// To be deleted

router.put('/:id/company', auth.isAuthenticated(), controller.setCompany);
router.delete('/:id/company', auth.hasRole('admin'), controller.setCompany);
router.put('/:id/vehicle', auth.isAuthenticated(), controller.addVehicle);
router.delete('/:id/vehicle', auth.isAuthenticated(), controller.removeVehicle);

module.exports = router;
