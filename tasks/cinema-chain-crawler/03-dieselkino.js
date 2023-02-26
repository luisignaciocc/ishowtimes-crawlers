const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.dieselkino.at/",
      box: "map area",
      website: {
        selector: null,
        attribute: "href",
        mapper: (href) => href.replace("id=102", "id=701"),
      },
    },
    details: {
      url: ":cinema.website:",
      name: ".adressblock-links strong",
      address: {
        selector: ".adressblock-links",
        mapper: (value) => value.replace("Dieselkino", "").trim(),
      },
    },
  },
});

crawlE.crawl();
