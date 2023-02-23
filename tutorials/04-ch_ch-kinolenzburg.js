const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Kino Lenzburg",
      address: "Bleicherain 8, 5600 Lenzburg",
      website: "https://www.kinolenzburg.ch/programm/",
      phone: "062 891 25 28",
    },
  ],
  movies: {
    list: {
      url: "https://www.kinolenzburg.ch/programm/",
      box: ".movie-item",
      title: "a @title",
      href: "a @href",
    },
  },
  showtimes: {
    url: "https://www.kinolenzburg.ch/:movie.href:",
    showtimes: {
      box: ".timetable table tr",
      date: ".date",
      dateFormat: "DD. MMMM",
      dateLocale: "de",
      time: ".time",
    },
  },
});

crawlE.crawl();
