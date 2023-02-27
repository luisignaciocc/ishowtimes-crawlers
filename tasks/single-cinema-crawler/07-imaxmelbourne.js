// NOT WORKING
const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Imax",
      website: "https://imaxmelbourne.com.au/",
      address: "Rathdowne Street, Carlton Gardens CARLTON SOUTH VICTORIA 3053",
    },
  ],
  movies: {
    list: {
      url: "https://imaxmelbourne.com.au/now_showing",
      box: ".film-listing",
      title: ".film-title",
      href: ".btn-sessions a @href",
    },
  },
  showtimes: {
    url: "https://imaxmelbourne.com.au:movie.href:",
    dates: {
      box: ".session-block",
      date: "li:first-child",
      dateFormat: "dddd, MMMM D",
      showtimes: {
        box: ".label-time",
        timeFormat: "H:mma",
      },
    },
  },
});

crawlE.crawl();
