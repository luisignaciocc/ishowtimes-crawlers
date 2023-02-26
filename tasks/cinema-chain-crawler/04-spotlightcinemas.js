const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "http://spotlightcinemas.com/corporate/",
      box: "#navbar-content > ul:nth-child(2) > li:nth-child(2) > div > a",
      website: {
        selector: null,
        attribute: "href",
        mapper: (href) =>
          href.includes("#") || href.includes("/corporate") ? null : href,
      },
    },
    details: {
      url: "http://spotlightcinemas.com:cinema.website:/?page=contact",
      name: "body > div.container > nav > a > span.md",
      address: "#contact > div > div > div.card-block > span > p:nth-child(3)",
    },
  },
});

crawlE.crawl();
