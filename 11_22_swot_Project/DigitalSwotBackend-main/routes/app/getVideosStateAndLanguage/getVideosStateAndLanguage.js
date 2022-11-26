// importing libraries
const express = require("express")
const router = express.Router()

// importing functions
const { verifyToken } = require("../../../commonMiddleWare")
const { getLatestVieosStateAndLanguage } = require("../../../controller/app/getVideosSatetAndLangauge/getViseosStateAndLanguage")


// defining the routes
router.post('/app/user/getlatestvideosByStateAndLang', verifyToken, getLatestVieosStateAndLanguage)

module.exports = router