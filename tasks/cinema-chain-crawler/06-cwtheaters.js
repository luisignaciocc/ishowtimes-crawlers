const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.cwtheaters.com/",
      box: ".hero__location",
      name: ".hero__locationName",
      website: {
        selector: ".hero__locationLink",
        attribute: "href",
        mapper: (href) => "https://www.cwtheaters.com" + href,
      },
      address: ".hero__locationAddy",
    },
  },
});

crawlE.crawl();
