const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.goldenharvest.com/cinema/",
      box: ".Cinemas_list ul li",
      website: {
        selector: null,
        attribute: "onclick",
        mapper: (onclick) =>
          "https://www.goldenharvest.com" +
          onclick.replace("javascript:location.href=", "").replace(/'/g, ""),
      },
      name: ".cover-left h1",
      address: ".cover-left p:nth-child(2)",
      phone: ".cover-left p:nth-child(1)",
    },
  },
});

crawlE.crawl();
