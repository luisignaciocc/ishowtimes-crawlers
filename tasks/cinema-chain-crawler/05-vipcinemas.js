const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://vipcinemas.com/",
      box: "#main-navbar > div > div > div > div > ul > a",
      name: ".grid-cols-10 > div:nth-child(1)",
      website: {
        selector: null,
        attribute: "href",
        mapper: (href) => "https://vipcinemas.com" + href,
      },
      address: ".grid-cols-10 > div:nth-child(2)",
      phone: ".grid-cols-10 > div:nth-child(3) span:nth-child(2)",
    },
  },
});

crawlE.crawl();
