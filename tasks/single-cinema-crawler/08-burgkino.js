const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Burg Kino",
      website: "https://www.burgkino.at/",
      address: "Opernring 19, 1010 Vienna, Austria",
      phone: "+43 1 587 8406",
    },
  ],
  movies: {
    list: {
      url: "https://www.burgkino.at/showtimes/tomorrow",
      box: ".views-row",
      title: "h2",
      href: "h2 a @href",
    },
    showtimes: {
      url: "https://www.burgkino.at:movie.href:",
      showtimes: {
        box: "tr",
        date: ".views-field-field-startdatetime time @datetime",
        time: ".views-field-field-startdatetime-1 time",
      },
    },
  },
});

crawlE.crawl();
