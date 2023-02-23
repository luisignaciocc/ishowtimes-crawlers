const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    // …
  ],
  showtimes: {
    // …
  },
  hooks: {
    beforeSave: (data, context) => {
      if (context.cinema.auditoriumFilter) {
        data.showtimes = data.showtimes.filter((s) =>
          context.cinema.auditoriumFilter.test(s.auditorium)
        );
        delete data.cinema.auditoriumFilter;
      }
      return data;
    },
  },
});

crawlE.crawl();
