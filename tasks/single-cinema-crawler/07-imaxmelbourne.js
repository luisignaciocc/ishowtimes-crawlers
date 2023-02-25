// NOT WORKING - CSR??

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
    showtimes: {
      url: "https://imaxmelbourne.com.au:movie.href:",
      showtimes: {
        box: ".session-block",
        date: ".date",
        dateFormat: "dddd MMMM D",
        time: ".label-time",
        timeFormat: "HH:mm A",
      },
    },
  },
});

crawlE.crawl();
