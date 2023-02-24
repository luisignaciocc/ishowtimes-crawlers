const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "MULTIKULTURELLES CENTRUM TEMPLIN E. V.",
      address: "Prenzlauer Allee 6, 17268 Templin",
      website: "https://www.mkc-templin.de/",
      phone: "03987 / 551063",
    },
  ],
  showtimes: {
    url: "https://www.mkc-templin.de/kino/kino-im-mkc/",
    movies: {
      box: ".list-item-kino",
      title: "h3",
      showtimes: {
        box: ".item-spielzeit",
        date: ".tag",
        dateFormat: "dd. DD.MM.",
        time: ".spielzeit",
        timeFormat: "HH:mm [Uhr]",
        dateLocale: "de",
      },
    },
  },
});

crawlE.crawl();
