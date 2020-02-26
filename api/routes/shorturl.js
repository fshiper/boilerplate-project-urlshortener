const ShortUrl = require("../../models/shorturl");
const mongoose = require("mongoose");

module.exports = function(router) {
  router.get("/shorturl", (req, res) => {
    ShortUrl.find()
      .select('-_id -__v')
      .exec()
      .then(docs => res.status(200).json(docs))
      .catch(err =>
        res.status(500).json({
          message: "Error finding urls",
          error: err
        })
      );
  });

  router.get("/shorturl/:url", (req, res) => {
    let shortUrl = req.params.url;
    ShortUrl.findOne({short_url: shortUrl})
      .select('original_url -_id')
      .exec()
      .then(doc => res.redirect(doc.original_url))
      .catch(err =>
        res.status(500).json({
          message: "Error finding urls",
          error: err
        })
      );
  });

  router.post("/shorturl/new", (req, res) => {
    console.log(req.method + " " + req.path + " - " + JSON.stringify(req.body))
    let shortUrl = new ShortUrl({ original_url: req.body.url, short_url: "test" });
    shortUrl.save((err, data) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(data);
    });
  });
};
