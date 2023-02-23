// FORBIDDEN ERROR: 403

const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "http://www.filmpalast-kino.de/",
      box: "li a",
      website: "@href",
      slug: {
        selector: ":box",
        attribute: "href",
        mapper: (href) =>
          href.replace(/(http:\/\/)|(www)|(filmpalast-kino)|(de)|\/|\./g, ""),
      },
    },
    details: {
      url: ":cinema.website:/kontakt",
      name: ".contact-text-box p b",
      address: {
        selector: ".contact-text-box p:nth-of-type(1)",
        attribute: "html()",
        mapper: (value) => value.split("<br>").slice(1, 3).join(", ").trim(),
      },
      email: {
        selector: ".contact-text-box p:nth-of-type(1)",
        mapper: (value) => value.match(/(E-Mail: )(.*)/)[2].trim(),
      },
      location: "#contact-maps iframe @src",
    },
  },
});

crawlE.crawl();
