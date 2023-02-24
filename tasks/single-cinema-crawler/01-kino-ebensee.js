const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Kulturverein Kino Ebensee",
      address: "Schulgasse 6, 4802 Ebensee",
      website: "https://www.kino-ebensee.at/",
      phone: "0043 6133 6308",
    },
  ],
  showtimes: {
    url: "https://www.kino-ebensee.at/kinoprogramm.html",
    movies: {
      box: ".eventWrap",
      title: ".eventHeader a",
      showtimes: {
        box: ".date",
        datetimeFormat: "dd, DD.MM.YY HH:mm [Uhr]",
        dateLocale: "de",
      },
    },
  },
});

crawlE.crawl();
