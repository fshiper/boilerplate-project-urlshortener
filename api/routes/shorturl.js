const ShortUrl = require("../../models/shorturl");
const utils = require("../../utils/utils");
const mongoose = require("mongoose");
const dns = require("dns");
const sha1 = require("sha1");

module.exports = function(router) {
  router.get("/shorturl", (req, res) => {
    ShortUrl.find()
      .select("-_id -__v")
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
    ShortUrl.findOne({ short_url: shortUrl })
      .select("original_url -_id")
      .exec()
      .then(doc => res.redirect(doc.original_url))
      .catch(err =>
        res.status(500).json({
          message: "Error finding given url",
          error: err
        })
      );
  });

  router.post("/shorturl/new", (req, res) => {
    let newShortUrl = {};
    let inUrl = req.body.url;
    utils()
      .testUrl(inUrl)
      .then(() => {
        newShortUrl = new ShortUrl({
          original_url: inUrl,
          short_url: sha1(inUrl)
        });

        ShortUrl.findOne({ original_url: inUrl }, (err, data) => {
          if (err) return res.status(400).json(err);
          if (!data) {
            console.log("saving new url..")
            newShortUrl.save((err, data) => {
              if (err) return res.status(400).json(err);
              let response = {
                original_url: data.original_url,
                short_url: sha1(data.short_url)
              };
              res.status(200).json(response);
            });
          } else {
            console.log("retrieving existing url..")
            let response = {
              original_url: data.original_url,
              short_url: sha1(data.short_url)
            };
            res.status(200).json(response);
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });
};
