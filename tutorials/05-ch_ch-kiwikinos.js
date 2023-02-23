/**
 * --------- Config Validation Error ---------
 * config.showtimes.movies.table.headerRow.date should be string
 * config.showtimes.movies.table.headerRow.date should have required property 'selector'
 * config.showtimes.movies.table.headerRow.date should be function
 * config.showtimes.movies.table.headerRow.date should match exactly one schema in oneOf
 * config.showtimes should match exactly one schema in oneOf
 * -------------------------------------------
 */

const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Kiwi Kinokultur",
      address: "Oberer Graben 6 Winterthur",
      website: "http://www.kiwikinos.ch",
      phone: "052 208 12 12",
    },
  ],
  showtimes: {
    url: "http://www.kiwikinos.ch/winterthur/programmuebersicht/",
    movies: {
      box: ".filmoverview article",
      title: "header",
      table: {
        selector: ".progmain_shift",
        headerRow: {
          date: {
            dateFormat: "dd DD.MM.",
          },
        },
        cells: {
          showtimes: {
            box: "a",
            timeFormat: "HH:mm",
          },
        },
      },
    },
  },
  hooks: {
    afterRequest: (request, context, err, response, callback) => {
      let $ = cheerio.load(response.text);

      let replaceTags = (node, selector, newTag) => {
        $(node)
          .find(selector)
          .each((i, item) => {
            $(item).replaceWith(
              $($.html(item).replace(new RegExp(item.tagName, "g"), newTag))
            );
          });
      };

      let showtimesContainers = $("div.progmain");
      showtimesContainers.each((index, container) => {
        replaceTags(container, ".progitem", "td");
        replaceTags(container, ".progline,.progdays", "tr");
        replaceTags(container, ".progmain_shift", "table");
      });

      response.text = $.html();

      callback(err, response, context);
    },
  },
});

crawlE.crawl();
