// INCOMPLETE
const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.pathe.be/api/cinemas?language=en",
    },
  },
  movies: {
    list: {
      url: `https://www.pathe.be/api/cinema/:cinema.slug:/shows?language=en`,
    },
    showtimes: {
      url: "https://www.pathe.be/api/show/:movie.slug:/showtimes/:cinema.slug:/:movie.day:?language=en",
    },
  },
  hooks: {
    handleCinemasResponse: (response, context, callback) => {
      let data = JSON.parse(response.text);
      const cinemas = data.map(
        ({ name, googleMyBusinessUrl, slug, theaters }) => {
          const address =
            theaters[0].addressLine1 + " " + theaters[0].addressCity;
          return {
            name: name,
            location: googleMyBusinessUrl,
            slug,
            address,
          };
        }
      );
      callback(null, cinemas);
    },
    handleMoviesResponse: (response, context, callback) => {
      const data = JSON.parse(response.text);

      const shows = [];
      Object.keys(data.shows).map((slug) => {
        const showsdays = Object.keys(data.shows[slug].days).map((day) => {
          return {
            slug,
            day,
          };
        });
        shows.push(...showsdays);
      });

      callback(null, shows);
    },
    handleShowtimesResponse: (response, context, callback) => {
      // The name needs to be extracted from another request, idk how to add an extra request to the movies
      const name = context.movie.slug;
      let data = JSON.parse(response.text);
      const showtimes = data.map((showtime) => ({
        name,
        start_at: showtime.time,
        is_3d: false,
      }));

      //   Some crawlers hangs. We need to add a timeout and a retry mechanism
      callback(null, showtimes);
    },
  },
});

crawlE.crawl();
