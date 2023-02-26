const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: {
    list: {
      url: "https://parkwaycinemas.co.uk/",
      box: ".cinemas li",
      name: {
        selector: "strong",
        mapper: (name) =>
          name
            .replace(/[^a-zA-Z ]/g, "")
            .replace("COMING SOON", "")
            .replace("Coming soon", "")
            .trim(),
      },
      id: "button @value",
      //   HOW TO PASS DATA LOCATED OUTSIDE THE BOX?
      __VIEWSTATE: "#__VIEWSTATE @value",
      __VIEWSTATEGENERATOR: "#__VIEWSTATEGENERATOR @value",
    },
    details: {
      url: "https://parkwaycinemas.co.uk/",
      postData:
        "__VIEWSTATE=:cinema.__VIEWSTATE:&__VIEWSTATEGENERATOR=:cinema.__VIEWSTATEGENERATOR:&go=:cinema.id:",
    },
  },
});

crawlE.crawl();
