const express = require('express')
const router = express.Router()

// import function from common middleware
const { verifyToken } = require('../../../commonMiddleWare')
const { getDistrict } = require('../../../controller/user/getDistrict/getDistrict')



router.get('/user/getdistrictinstate', verifyToken, getDistrict)

module.exports = router