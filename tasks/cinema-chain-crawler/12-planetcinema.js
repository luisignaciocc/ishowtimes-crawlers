const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.planetcinema.pl/",
      box: ".cinemas-list ul li",
      name: "a",
      website: "a @href",
    },
    details: {
      url: ":cinema.website:/kontakt",
      phone: ".header-upper-bar p.white a",
      address: ".address",
    },
  },
});

crawlE.crawl();
