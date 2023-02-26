const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://castellolopescinemas.pt/contactos/",
      box: ".et_pb_column",
      name: "h3",
      website: {
        selector: "h3 a",
        attribute: "href",
        mapper: (value) => `https://castellolopescinemas.pt${value}`,
      },
      phone: "div:nth-child(2) > div > div.et_pb_blurb_container",
      email: "div:nth-child(3) > div > div.et_pb_blurb_container",
      address: "div:nth-child(4) > div > div.et_pb_blurb_container",
    },
  },
});

crawlE.crawl();
