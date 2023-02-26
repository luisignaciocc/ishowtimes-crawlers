const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://mimozink.hu/",
      box: "#main-content > div.fullscreen > div",
      website: {
        selector: "a",
        attribute: "href",
      },
      address: ".cinema-text",
    },
    details: {
      url: ":cinema.website:",
      name: {
        selector: "head > title",
        mapper: (name) => name.replace(" - Főoldal", "").trim(),
      },
    },
  },
});

crawlE.crawl();
