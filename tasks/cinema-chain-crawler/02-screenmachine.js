const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.screenmachine.co.uk/",
      box: ".card",
      name: {
        selector: "h3",
        mapper: (name) => name.replace(/[^a-zA-Z ]/g, "").trim(),
      },
      address: ".address",
    },
  },
});

crawlE.crawl();
