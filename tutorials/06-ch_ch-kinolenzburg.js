const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      id: "1",
      name: "Kino Lenzburg - Urban",
      address: "Bleicherain 8, 5600 Lenzburg",
      showtimesSelector: "urban",
    },
    {
      id: "2",
      name: "Kino Lenzburg - Löwen",
      address: "Leuengasse 14, 5600 Lenzburg",
      showtimesSelector: "loewen",
    },
  ],
  movies: {
    list: {
      url: "https://www.kinolenzburg.ch/programm/",
      box: ".movie-item",
      title: "a @title",
      href: "a @href",
    },
    showtimes: {
      url: "https://www.kinolenzburg.ch:movie.href:", // Had to remove the slash after .ch (original: https://www.kinolenzburg.ch/:movie.href:)
      showtimes: {
        box: ".dates tbody tr:has(span.:cinema.showtimesSelector:)", // Had to change the selector to .dates tbody tr (original: .timetable table tr)
        date: ".date",
        dateFormat: "DD.MM", // Had to change the dateFormat to DD.MM (original: DD. MMMM)
        dateLocale: "de",
        time: ".time",
      },
    },
  },
  hooks: {
    beforeSave: (data, _context) => {
      delete data.cinema.showtimesSelector;
      return data;
    },
  },
});

crawlE.crawl();
