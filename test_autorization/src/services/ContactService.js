const Contact = require('../models/Contact');

class ContactService {
  async deleteContact(id) {
    return Contact.findByIdAndDelete(id);
  }
}

module.exports = new ContactService();