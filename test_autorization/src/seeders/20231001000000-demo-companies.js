module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Companies', [
      {
        name: 'Tech Corp',
        type: 'client',
        address: 'Silicon Valley',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Design Studio',
        type: 'partner',
        address: 'New York',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Companies', null, {});
  }
};