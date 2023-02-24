const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Stadtkino Wien",
      website: "https://stadtkinowien.at/",
      address: "Siebensterngasse 2/12, 1070 Wien",
    },
  ],
  showtimes: {
    url: "https://stadtkinowien.at/programm/dat/:date:/",
    urlDateFormat: "YYYYMMDD",
    dates: {
      box: "#film-list div:nth-child(1)",
      date: "h3",
      dateFormat: "dddddd, DD. MMMM",
      dateLocale: "de",
      movies: {
        box: ".film",
        title: "h1",
        showtimes: {
          box: ".film-info div:nth-child(1) ",
          time: "div:nth-child(1)",
          timeFormat: "HH:mm",
        },
      },
    },
  },
});

crawlE.crawl();
