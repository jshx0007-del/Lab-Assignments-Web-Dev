const express = require('express');
const c = require('../controllers/productController');
const validateId = require('../middleware/validateId');

const router = express.Router();

router.get('/low-stock', c.getLowStock);
router.get('/summary', c.getCategorySummary);

router.route('/').get(c.getProducts).post(c.createProduct);

router
  .route('/:id')
  .get(validateId, c.getProductById)
  .put(validateId, c.updateProduct)
  .delete(validateId, c.deleteProduct);

router.patch('/:id/stock', validateId, c.adjustStock);

module.exports = router;
