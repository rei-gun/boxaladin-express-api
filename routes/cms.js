const router = require('express').Router()
const auth = require('../helpers/auth')
const cmsProduct = require('../controller_cms/product')
const transaction = require('../controller_cms/transaction')
const freeTransaction = require('../controller_cms/transaction')
const payments = require('../controller_cms/payment')
const email = require('../controller_cms/emailUpdate')
const user = require('../controller_cms/user')
const employee = require('../controller_cms/employeeController')

router.put('/product/:id',auth.isAdmin, cmsProduct.update)
router.post('/product',auth.isAdmin, cmsProduct.create)
router.delete('/product/:id',auth.isAdmin, cmsProduct.destroy)
router.get('/free', freeTransaction.allFree)
router.get('/topup', freeTransaction.allTopup)
router.get('/payment',auth.isAdmin, payments.updateFixedVA)
router.get('/invoice',auth.isAdmin, payments.updateNonFixedVA)
router.put('/emailupdate', auth.isAdmin, email.updateEmailStatus)
router.put('/active/:id', auth.isAdmin, cmsProduct.setActiveProduct)
router.get('/user/finduser/:id', auth.isAdmin, user.findById)
router.put('/user/edituser/:id', auth.isAdmin, email.editEmail)
router.post('/transaction/aladinkeys/:id', auth.isAdmin, transaction.updateAladinKeys)
router.post('/transaction/cashwallet/:id', auth.isAdmin, transaction.updateUserWallet)
router.post('/employee/user', auth.isAdmin, employee.createEmployee)
router.get('/employee', auth.isAdmin, employee.findAllEmployee)
router.delete('/employee/user/:id', auth.isAdmin, employee.deleteEmployee)

module.exports = router
