const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, companyController.getCompanies);
router.post('/', authMiddleware, companyController.createCompany);

const { body } = require('express-validator');

router.post('/',
  authMiddleware,
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('type').isIn(['client', 'partner', 'other']),
    body('address').optional().isString()
  ],
  companyController.createCompany
);

module.exports = router;