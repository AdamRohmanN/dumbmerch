const express = require('express')
const router = express.Router()

const { register, login, checkAuth, oneUser } = require('../controllers/auth')
const { addProduct, allProducts, oneProduct, updateProduct, deleteProduct } = require('../controllers/product')
const { addCategory, allCategories, oneCategory, updateCategory, deleteCategory } = require('../controllers/category')
const { addTransaction, allTransactions } = require('../controllers/transaction')

const { auth } = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/upload-file')

router.post('/register', register)
router.post('/login', login)
router.get('/check-auth', auth, checkAuth)
router.get('/user/:id', auth, oneUser)

router.post('/product', auth, uploadFile("image"), addProduct)
router.get('/products', allProducts)
router.get('/product/:id', auth, oneProduct)
router.patch('/product/:id', auth, updateProduct)
router.delete('/product/:id', auth, deleteProduct)

router.post('/category', auth, addCategory)
router.get('/categories', allCategories)
router.get('/category/:id', auth, oneCategory)
router.patch('/category/:id', auth, updateCategory)
router.delete('/category/:id', auth, deleteCategory)

router.post('/transaction', auth, addTransaction)
router.get('/transactions', auth, allTransactions)

module.exports = router