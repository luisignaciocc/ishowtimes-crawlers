// INCOMPLETE
const CrawlE = require("crawl-e/v0.5.2");
var moment = require("moment");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://www.showbizcinemas.com/",
      box: ".pickerListLink",
      name: {
        selector: ":box",
        mapper: (value) => "ShowBiz Cinemas" + value,
      },
      id: ":box @data-picker-item",
      website: {
        selector: ":box",
        attribute: "href",
        mapper: (value) => `https://www.showbizcinemas.com${value}`,
      },
      href: {
        selector: ":box",
        attribute: "data-cinema-friendly",
        mapper: (value) =>
          `https://www.showbizcinemas.com/cinema-info/${value}`,
      },
    },
    // I NEED TO FILTER THE RESULTS TO ADD A DETAIL PAGE CRAWLER
    // details: {
    //   url: ":cinema.href:",
    //   address:
    //     "body > div.content > div > div.theatreSection.cinemaInfoPage > div.cinemas > div:nth-child(2) > div > div > div:nth-child(2) > p",
    // },
  },
  showtimes: {
    url: "https://movie-showbiz.theboxofficecompany.net/movies/paginated/55/:cinema.id:?startIndex=0&endIndex=-1&liteVersion=false&days=0&splitByAttributes=false&expandCinemas=false&expandAttributes=false&startDate=null&endDate=null&expandGenres=false&genres=&attributes=All",
  },
  hooks: {
    handleShowtimesResponse: (response, context, callback) => {
      let data = JSON.parse(response.text);

      const showtimes = [];
      data.map((showtime) => {
        const name = showtime.Title;
        showtime.Sessions.map((session) => {
          const date = session.NewDate;
          session.Times.map((time) => {
            showtimes.push({
              movie_title: name,
              start_at: moment(
                `${date} ${time.StartTime}`,
                "YYYY-MM-DD H:mm A"
              ).format(),
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
