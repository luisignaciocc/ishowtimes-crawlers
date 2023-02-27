// NOT WORKING
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
        mapper: (value) =>
          value.startsWith("http")
            ? value
            : `https://castellolopescinemas.pt${value}`,
      },
      phone: "div:nth-child(2) > div > div.et_pb_blurb_container",
      email: "div:nth-child(3) > div > div.et_pb_blurb_container",
      address: "div:nth-child(4) > div > div.et_pb_blurb_container",
    },
  },
  showtimes: {
    // I NEED TO USE HERE A PARAMETER THAT IS THIS SAME PAGE, BUT I CAN'T SELECT IT FROM HERE
    url: "https://castellolopescinemas.pt/wp-json/sessions/cinema?cinema=:cinema.name:&date=2023-02-28",
    urlDateFormat: "YYYY-MM-DD",
  },
});

crawlE.crawl();
