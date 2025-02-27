// src/controllers/companyController.js
const Company = require('../models/Company');
const { validationResult } = require('express-validator');

const companyController = {
  // Получение списка компаний с фильтрацией, сортировкой и пагинацией
  async getCompanies(req, res) {
    try {
      const { status, type, sortBy, page = 1, limit = 10 } = req.query;
      const query = {};
      const sortOptions = {};

      // Фильтрация
      if (status) query.status = status;
      if (type) query.type = type;

      // Сортировка
      if (sortBy) {
        const [field, order] = sortBy.split('_');
        sortOptions[field] = order === 'desc' ? -1 : 1;
      } else {
        sortOptions.createdAt = -1; // Сортировка по умолчанию
      }

      // Пагинация
      const skip = (page - 1) * limit;

      const [companies, total] = await Promise.all([
        Company.find(query)
          .sort(sortOptions)
          .skip(skip)
          .limit(parseInt(limit))
          .lean(),
        Company.countDocuments(query)
      ]);

      res.json({
        data: companies,
        meta: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / limit)
        }
      });

    } catch (error) {
      console.error('Error getting companies:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Создание новой компании
  async createCompany(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, status, type, address } = req.body;

      const newCompany = new Company({
        name,
        status: status || 'active',
        type,
        address,
        createdAt: new Date()
      });

      const savedCompany = await newCompany.save();
      res.status(201).json(savedCompany);

    } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Дополнительные методы при необходимости
};

module.exports = companyController;