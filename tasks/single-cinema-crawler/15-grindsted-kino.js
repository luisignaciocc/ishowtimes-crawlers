const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Grindsted Kino",
      website: "https://www.grindsted-kino.dk/",
      address: "Vesterbrogade 5, 7200 Grindsted",
      phone: "75 32 00 61",
    },
  ],
  showtimes: {
    url: "https://billet.grindsted-kino.dk/api/movies?organizerIds=179",
  },
  hooks: {
    handleShowtimesResponse: (response, context, callback) => {
      const { movies, showtimes } = JSON.parse(response.text);

      const findMovie = (movieId) => {
        return movies.find((movie) => movie.id === movieId);
      };

      let formattedShowtimes = [];

      showtimes.map((showtime) => {
        let movie = findMovie(showtime.movieId);
        formattedShowtimes.push({
          movie_title: movie.name,
          start_at: showtime.dateTime,
          is_3d: movie.is3D,
        });
      });

      callback(null, formattedShowtimes);
    },
  },
});

crawlE.crawl();
