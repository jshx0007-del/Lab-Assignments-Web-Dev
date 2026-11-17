module.exports = (req, res, next) => {
  if (!/^\d+$/.test(req.params.id)) {
    const err = new Error(`Invalid product id: ${req.params.id}`);
    err.statusCode = 400;
    return next(err);
  }
  next();
};
