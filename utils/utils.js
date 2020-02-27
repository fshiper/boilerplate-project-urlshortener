const dns = require("dns");

const utils = () => {
  let regex = /^https?:\/\//;
  let validUrl = false;

  const testUrl = url => {
    return new Promise((resolve, reject) => {
      if (regex.test(url)) {
        
        let tempDnsUrl = url.slice(url.indexOf("//") + 2); //need to remove http(s):// to pass to dns.lookup
        let slashIndex = tempDnsUrl.indexOf("/"); //need to remove anythng past .com, etc., for dns.lookup
        let dnsUrl =
          slashIndex < 0 ? tempDnsUrl : tempDnsUrl.slice(0, slashIndex);

        console.log("slashIndex: " + slashIndex);
        console.log("dnsUrl: " + dnsUrl);

        dns.lookup(dnsUrl, (err, address, family) => {
          //check for valid url
          if (err) return reject(err);
          resolve(url);
        });
      } else reject({"error":"invalid URL"});
    });
  };
  return {
    testUrl: testUrl
  };
};

module.exports = utils;
