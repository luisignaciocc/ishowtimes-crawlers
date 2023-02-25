const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "The Byrd Theatre Foundation",
      website: "https://byrdtheatre.org/",
      address: "2908 W Cary Street, Richmond, VA 23221",
      phone: "804-358-3056",
    },
  ],
  showtimes: {
    url: "https://byrdtheatre.org/showtimes/",
    movies: {
      box: ".fl-post-column",
      title: "h3",
      showtimes: {
        box: ".date",
        datetimeFormat: "ddd, MMMM Do [@] h:mma",
      },
    },
  },
});

crawlE.crawl();
