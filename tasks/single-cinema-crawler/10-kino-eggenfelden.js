const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Kino Eggenfelden",
      website: "https://www.kino-eggenfelden.de/",
      address: "Cine Eggenfelden Schellenbruckplatz 8 84307 Eggenfelden",
      phone: "08721-2137",
    },
  ],
  showtimes: {
    url: "https://www.kino-eggenfelden.de/kinoprogramm/",
    movies: {
      box: ".movie_row",
      title: ".movie_detail h2",
      dates: {
        box: ".showstble",
        date: ".daysweek",
        dateFormat: "dddd, DD.MM :",
        dateLocale: "de",
        showtimes: {
          box: "a",
          time: {
            selector: ".showtime",
            mapper: (value) => value.split("Uhr")[0].trim(),
          },
        },
      },
    },
  },
});

crawlE.crawl();
