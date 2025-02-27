module.exports = {
  handleValidationErrors: (err, res) => {
    const errors = Object.values(err.errors).map(el => el.message);
    res.status(400).json({ errors });
  },

  catchAsync: fn => (req, res, next) => {
    fn(req, res, next).catch(next);
  }
};