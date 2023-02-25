const CrawlE = require("crawl-e/v0.5.2");
var moment = require("moment");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Cinema 4 You",
      website: "https://www.cinema4you.at/",
      address: "Oskar-Pirlo-Straße 7 6330 Kufstein",
      phone: "+43 5372 62732",
    },
  ],
  showtimes: {
    url: "https://www.cinema4you.at/wochenprogramm.php?from=&to=",
  },
  hooks: {
    handleShowtimesResponse: (response, context, callback) => {
      const data = JSON.parse(response.text);

      const showtimes = [];

      data.forEach(({ PrgDates, FilmTitle }) => {
        PrgDates.forEach(({ date, times }) => {
          times.forEach((time) => {
            showtimes.push({
              movie_title: FilmTitle,
              start_at: `${moment.unix(time.timestamp).format()}`,
              is_3d: false,
            });
          });
        });
      });

      callback(null, showtimes);
    },
  },
});

crawlE.crawl();
