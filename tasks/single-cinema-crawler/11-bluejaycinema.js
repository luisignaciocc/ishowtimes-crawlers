const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Blue Jay Cinema",
      website: "https://bluejaycinema.com/",
      address: "27315 North Bay Rd. Blue Jay, CA 92317",
      phone: "(909) 337-3997",
    },
  ],
  showtimes: {
    url: "https://bluejaycinema.com/wp-admin/admin-ajax.php",
    postData:
      "action=movies-filter&per_page=10&date=:date:&theatres=&cat=&sorting=release&list_all_events=&current_page=",
    urlDateFormat: "MM.DD.YYYY",
    movies: {
      box: ".event_list",
      title: ".movie_title a",
      href: ".movie_title a @href",
      id: {
        selector: null,
        attribute: "id",
        mapper: (id) => id.replace("post-", ""),
      },
      // NOT WORKING
      // showtimes: {
      //   url: "https://bluejaycinema.com/wp-admin/admin-ajax.php",
      //   postData:
      //     "action=event-filter&all_tickets=&date=:date:&post_id=:movie.id:",
      //   urlDateFormat: "MM.DD.YYYY",
      //   box: "li",
      //   time: ".time",
      //   timeFormat: "HH:mm a",
      // },
    },
  },
  concurrency: 1,
});

crawlE.crawl();
