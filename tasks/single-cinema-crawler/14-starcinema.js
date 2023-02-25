const CrawlE = require("crawl-e/v0.5.2");
const cheerio = require("cheerio");
var moment = require("moment");
const fs = require("fs");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Star Cinema",
      website: "https://www.starcinema.org.au/",
      address: "Eaglehawk Town Hall, 2 Peg Leg Road, Eaglehawk, Victoria 3556",
      phone: "03 5446 2526",
    },
  ],
  showtimes: {
    url: "https://www.starcinema.org.au/",
  },
  hooks: {
    handleShowtimesResponse: (response, context, callback) => {
      //   The movies are inside a variable in the script tag
      const $ = cheerio.load(response.text, { xmlMode: false });
      let scriptContent = $("script")[13].children[0].data;

      //   We extract the variable and format it to be valid JSON
      let movieDataContent = scriptContent
        .split("movieData = ")[1]
        .split("movieDataByReleaseDate =")[0]
        .trim()
        .replaceAll("'", `"`) // replace single quotes with double quotes
        .replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) =>
          g ? "" : m
        ) // remove comments
        .replace(/\,(?!\s*?[\{\[\"\'\w])/g, ""); // remove trailing commas

      let movieData = JSON.parse(movieDataContent);

      let formattedShowtimes = [];
      Object.keys(movieData).map((date) => {
        movieData[date].map(({ title, times }) => {
          if (times?.length > 0) {
            times.map(({ time }) => {
              formattedShowtimes.push({
                movie_title: title,
                start_at: moment(
                  `${date} ${time}`,
                  "YYYY-MM-DD H:mma"
                ).format(),
                is_3d: false,
              });
            });
          }
        });
      });

      callback(null, formattedShowtimes);
    },
  },
});

crawlE.crawl();
