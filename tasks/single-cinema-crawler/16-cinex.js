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
    url: "https://www.cinex.at/wp-admin/admin-ajax.php",
    postData: "action=bd_qb_dat&dat=:date:",
    urlDateFormat: "DDMMYYYY",
  },
  hooks: {
    handleShowtimesResponse: (response, context, callback) => {
      const showtimes = JSON.parse(response.text);

      const date = context.date.format("YYYY-MM-DD");

      const keys = Object.keys(showtimes);

      if (keys.includes("pIDs")) {
        keys.length = keys.length - 1;
      }

      let formattedShowtimes = [];

      keys.map((key) => {
        const data = showtimes[key].txt.split(/\(([^)]+)\)/);
        const name = data[2].trim();
        const hour = data[0].trim();

        formattedShowtimes.push({
          movie_title: name,
          start_at: `${date}T${hour}:00`,
          is_3d: false,
        });
      });

      callback(null, formattedShowtimes);
    },
  },
});

crawlE.crawl();
