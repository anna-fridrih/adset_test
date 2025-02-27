const Company = require('../models/Company');

class CompanyService {
  async findCompanies(filter, options) {
    const { page = 1, limit = 10 } = options;
    const offset = (page - 1) * limit;

    return Company.findAndCountAll({
      where: filter,
      order: [[options.sortBy?.field || 'created_at', options.sortBy?.order || 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });
  }

  async createCompany(companyData) {
    return Company.create(companyData);
  }

  async deleteCompany(id) {
    const company = await Company.findByPk(id);
    if (!company) throw new Error('Company not found');
    return company.destroy();
  }
}

module.exports = new CompanyService();