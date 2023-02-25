const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Kino im Komm",
      website: "https://kommkino.de/",
      address: "Königstr. 93 / 90402 Nürnberg",
    },
  ],
  movies: {
    list: {
      url: "https://kommkino.de/filme",
      box: ".ic-content",
      title: "h2",
      href: "h2 a @href",
    },
    showtimes: {
      url: "https://kommkino.de:movie.href:",
      showtimes: {
        box: ".ic-divTable",
        date: ".ic-single-next",
        dateFormat: "dddd, D. MMMM YYYY",
        dateLocale: "de",
        time: ".ic-single-starttime",
      },
    },
  },
});

crawlE.crawl();
