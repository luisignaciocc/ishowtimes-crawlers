const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Stacja Falenica",
      website: "https://stacjafalenica.pl/",
      address: "ul. Patriotów 44B, 04-912 Warszawa - Falenica",
      phone: "530 882 809",
    },
  ],
  showtimes: {
    url: "https://stacjafalenica.pl/wp-admin/admin-ajax.php",
    postData: "action=pokaz_filmy&day=:date:",
    urlDateFormat: "DD.MM.YYYY",
    dates: {
      parser: (datesContainer, context) => {
        let dates = datesContainer.find(".big_date").text();
        return [dates];
      },
      dateFormat: "DD.MM.YYYY",
      movies: {
        box: "article",
        title: ".post-title",
        showtimes: {
          box: ".repe_godziny",
          timeFormat: "HH:mm",
        },
      },
    },
  },
});

crawlE.crawl();
