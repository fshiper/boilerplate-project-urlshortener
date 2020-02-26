const Url = require('../../models/shorturl')
const mongoose = require('mongoose')

module.exports = function (router) {
  router.post('/new/', (req, res) => {
    console.log("jest")
    let shortUrl = new Url(req.body)
    shortUrl.save((err, data) => {
      if (err) return res.status(400).json(err)
      res.status(200).json(data)
    })
  })

}