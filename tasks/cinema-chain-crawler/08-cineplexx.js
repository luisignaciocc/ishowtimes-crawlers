const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.cineplexx.at/kinos/",
      box: ".container .media",
      name: ".media-body a",
      address: ".media-body p",
      website: ".media-body-footer a @href",
    },
  },
});

crawlE.crawl();
