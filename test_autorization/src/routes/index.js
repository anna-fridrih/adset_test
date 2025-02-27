const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const companyRoutes = require('./companyRoutes');
const contactRoutes = require('./contactRoutes');

router.use('/auth', authRoutes);
router.use('/companies', companyRoutes);
router.use('/contacts', contactRoutes);

module.exports = router;