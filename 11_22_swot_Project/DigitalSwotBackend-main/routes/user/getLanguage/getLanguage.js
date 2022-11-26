const express = require('express')
const router = express.Router()

// import functions
const { verifyToken } = require('../../../commonMiddleWare')
const { getNewsLanguage } = require('../../../controller/user/getLanguage/getLanguage')



router.get('/user/newslanguage', verifyToken , getNewsLanguage)


module.exports = router