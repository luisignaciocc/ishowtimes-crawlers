const {
  DefaultContext,
  DefaultRequestMaker,
  //   Logger,
  JsonFileWriter,
} = require("crawl-e/v0.5.2");
const RedditResponseParser = require("./08-RedditResponseParser");

let context = new DefaultContext();
// let logger = new Logger(); // Logger is not a constructor
let requestMaker = new DefaultRequestMaker();
// requestMaker.logger = logger;

let responseParser = new RedditResponseParser();
// responseParser.logger = logger

let outputWriter = new JsonFileWriter();
// outputWriter.logger = logger

requestMaker.get("https://old.reddit.com/top/", context, (err, res) => {
  if (err) {
    console.error(`Oh noo, sth. wen't wrong: ${err}`);
  }
  console.log("Happy", res.status, "🙂");

  responseParser.parsePostsList(res, context, (err, posts) => {
    // skipping error handling, as we know there no errors in this script, since we are not calling anything async yet
    console.log(`found ${posts.length} posts`);
    console.log(posts.map((p) => ` - ${p.title}`).join("\n"));

    outputWriter.saveFile(posts, context, (err) => {
      // <<< [3]
      if (err) {
        console.error(`Oh noo, sth. wen't wrong: ${err}`);
        return;
      }
      console.log("All Done", "👏");
    });
  });
});
