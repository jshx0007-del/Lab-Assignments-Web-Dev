require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Counter = require('./models/Counter');

const data = [
  { name: 'Study Table', sku: 'FURN-TB-812', category: 'Furniture', price: 3999, quantity: 2, reorderLevel: 4, supplier: 'IKEA India' },
  { name: 'Office Chair', sku: 'FURN-CH-101', category: 'Furniture', price: 5499, quantity: 15, reorderLevel: 5, supplier: 'Godrej Interio' },
  { name: 'Laptop 15 inch', sku: 'ELEC-LP-201', category: 'Electronics', price: 54999, quantity: 3, reorderLevel: 5, supplier: 'Dell India' },
  { name: 'Wireless Mouse', sku: 'ELEC-MS-310', category: 'Electronics', price: 799, quantity: 60, reorderLevel: 20, supplier: 'Logitech' },
  { name: 'Bluetooth Speaker', sku: 'ELEC-SP-415', category: 'Electronics', price: 2499, quantity: 25, reorderLevel: 10, supplier: 'boAt' },
  { name: 'Smartphone', sku: 'ELEC-PH-520', category: 'Electronics', price: 18999, quantity: 8, reorderLevel: 10, supplier: 'Samsung' },
  { name: 'Cotton T-Shirt', sku: 'APRL-TS-001', category: 'Apparel', price: 599, quantity: 50, reorderLevel: 15, supplier: 'Fabindia' },
  { name: 'Denim Jeans', sku: 'APRL-JN-002', category: 'Apparel', price: 2199, quantity: 28, reorderLevel: 10, supplier: 'Levi\'s' },
  { name: 'Notebook A4', sku: 'STNY-NB-101', category: 'Stationery', price: 90, quantity: 100, reorderLevel: 30, supplier: 'Classmate' },
  { name: 'Gel Pen Pack of 15', sku: 'STNY-PN-713', category: 'Stationery', price: 120, quantity: 12, reorderLevel: 20, supplier: 'Cello Pens' },
  { name: 'Basmati Rice 5kg', sku: 'GROC-RC-901', category: 'Grocery', price: 650, quantity: 40, reorderLevel: 15, supplier: 'India Gate' },
  { name: 'Olive Oil 1L', sku: 'GROC-OL-902', category: 'Grocery', price: 899, quantity: 4, reorderLevel: 8, supplier: 'Borges' },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Counter.deleteMany({}); 
    for (const item of data) await Product.create(item);
    console.log(`Seeded ${data.length} products`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
