const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.emagine-entertainment.com/theatres/",
      box: ".theatre-listings__theatre",
      name: "a",
      address: ".theatre-listings__theatre-location",
      website: "a @href",
    },
  },
});

crawlE.crawl();
