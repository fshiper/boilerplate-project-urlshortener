const express = require('express')
const router = express.Router()

require('./routes/shorturl')(router)

module.exports = router