const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "TLC Chinese Theatres",
      address: "6925 Hollywood Blvd, Hollywood, CA",
      website: "http://www.tclchinesetheatres.com/",
    },
  ],
  showtimes: {
    url: "https://tickets.tclchinesetheatres.com/Browsing/Cinemas/Details/0001",
    movies: {
      box: ".film-item",
      title: {
        selector: ".film-title",
        mapper: (value) => value.replace(/\(([^)]+)\)/, "").trim(),
      },
      dates: {
        box: ".session",
        date: ".session-date",
        dateFormat: "dddd, DD MMMM YYYY",
        showtimes: {
          box: ".session-time",
          time: "time",
          timeFormat: "HH:mm A",
        },
      },
    },
  },
});

crawlE.crawl();
