const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.planetcinema.pl/",
      box: ".cinemas-list ul li",
      name: "a",
      website: "a @href",
      slug: {
        selector: "a",
        attribute: "href",
        mapper: (value) => value.replace("http://www.planetcinema.pl/", ""),
      },
    },
    details: {
      url: ":cinema.website:/kontakt",
      phone: ".header-upper-bar p.white a",
      address: ".address",
    },
  },
  showtimes: {
    url: "https://www.planetcinema.pl/:cinema.slug:/repertuar/date/:date:",
    urlDateFormat: "YYYY-MM.DD",
    postData: "day=2023-03-02",
    movies: {
      box: ".movie-container",
      title: ".title",
      showtimes: {
        box: ".schedule-hours a",
        timeFormat: "HH:mm",
      },
    },
  },
});

crawlE.crawl();
