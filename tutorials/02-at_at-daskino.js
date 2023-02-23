const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "DAS KINO",
      address: "Giselakai 11, A-5020 Salzburg",
      website: "http://www.daskino.at/",
      phone: "0662-87 31 00",
    },
  ],
  showtimes: {
    url: "https://www.daskino.at/programm/",
    movies: {
      box: ".movie-list-item",
      title: "header > h3 > a",
      showtimes: {
        box: ".movieTimes",
        date: ".day",
        dateFormat: "dd, D. MMMM",
        dateLocale: "de",
        time: {
          selector: ".datetime",
          mapper: (value) => value.replace("Ticket", "").split(" ")[0].trim(),
        },
        auditorium: {
          selector: ".datetime",
          mapper: (value) => value.replace("Ticket", " ").split(" ")[1].trim(),
        },
        attributes: ".datetime .specials a span",
        booking_link: ".datetime a @href", // Found unknown key in crawler config: showtimes.movies.showtimes.booking_link
      },
    },
  },
});

crawlE.crawl();
