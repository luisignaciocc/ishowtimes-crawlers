const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Kino Freistadt",
      address: "Salzgasse 25, 4240 Freistadt",
      website: "https://www.kino-freistadt.at/",
      phone: "+43 7942 777 11",
    },
  ],
  showtimes: {
    url: "https://www.kino-freistadt.at/?site=program&date=:date:",
    urlDateFormat: "DD-MM-YYYY",
    movies: {
      box: "#contentContainer",
      title: ".dailyProgramContentMovie",
      dates: {
        box: "#content",
        date: "h2",
        dateFormat: "dddd, D. MMMM",
        dateLocale: "de",
        showtimes: {
          box: ".dailyProgramTime",
          time: "a",
          timeFormat: "HH:mm",
        },
      },
    },
  },
});

crawlE.crawl();
