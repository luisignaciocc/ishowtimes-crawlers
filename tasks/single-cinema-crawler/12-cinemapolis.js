const CrawlE = require("crawl-e/v0.5.2");

let crawlE = new CrawlE({
  cinemas: [
    {
      name: "Cinemapolis",
      website: "https://cinemapolis.org",
      address: "120 East Green St Ithaca, NY 14850",
      phone: "607-277-6115",
    },
  ],
  showtimes: {
    url: "https://cinemapolis.org/graphql",
    postData: {
      operationName: null,
      variables: {
        date: ":date:",
        movieId: null,
        titleClassId: null,
        titleClassIds: null,
        anyShowingBadgeIds: null,
        everyShowingBadgeIds: [null],
        skip: false,
        resultVersion: "1203353629",
      },
      query:
        "query ($date: String, $movieId: ID, $titleClassId: ID, $titleClassIds: [ID], $everyShowingBadgeIds: [ID], $anyShowingBadgeIds: [ID], $resultVersion: String) {\n  showingsForDate(\n    date: $date\n    movieId: $movieId\n    titleClassId: $titleClassId\n    titleClassIds: $titleClassIds\n    everyShowingBadgeIds: $everyShowingBadgeIds\n    anyShowingBadgeIds: $anyShowingBadgeIds\n    resultVersion: $resultVersion\n  ) {\n    data {\n      id\n      time\n      overrideSeatChart\n      overridePriceCard\n      published\n      ticketsSold\n      ticketsPaid\n      current\n      past\n      overrideReservedSeating\n      overrideReservedSeatingValue\n      customHeldSeatCount\n      overrideHeldSeatCount\n      overrideShowingBadges\n      allowWithoutMembership\n      private\n      screenId\n      priceCardId\n      customPriceCardId\n      movie {\n        id\n        name\n        showingStatus\n        displayMetaData\n        urlSlug\n        posterImage\n        signageDisplayPoster\n        bannerImage\n        signageDisplayBanner\n        animatedPosterVideo\n        signageDisplayAnimatedPoster\n        signageMessageOverride\n        color\n        synopsis\n        starring\n        directedBy\n        producedBy\n        searchTerms\n        duration\n        genre\n        allGenres\n        rating\n        ratingReason\n        trailerYoutubeId\n        trailerVideo\n        signageDisplayTrailer\n        releaseDate\n        predictedWeekOneTicketSales\n        tmdbPopularityScore\n        tmdbId\n        includeInComingSoon\n        includeInFuture\n        overridePriceCard\n        sendRentrak\n        rentrakName\n        allowPastSales\n        dcmEdiMovieId\n        dcmEdiMovieName\n        disableOnlineConcessions\n        hasFlatFee\n        termPercentHundredths\n        flatFee\n        titleClassId\n        customPriceCardId\n        __typename\n      }\n      showingBadgeIds\n      predictedAttendance\n      seatsRemaining\n      seatsRemainingWithoutSocialDistancing\n      __typename\n    }\n    count\n    resultVersion\n    __typename\n  }\n}\n",
    },
    urlDateFormat: "YYYY-MM-DD",
  },
  hooks: {
    configureRequest: (request, context) => {
      request = request.set(
        "sec-ch-ua",
        `"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"`
      );
      request = request.set("circuit-id", "31");
      request = request.set("sec-ch-ua-mobile", "?0");
      request = request.set(
        "User-Agent",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
      );
      request = request.set("content-type", "application/json");
      request = request.set("accept", "*/*");
      request = request.set("is-electron-mode", "false");
      request = request.set("client-type", "consumer");
      request = request.set("site-id", "30");
      request = request.set("sec-ch-ua-platform", `"Linux"`);
      request = request.set("host", "cinemapolis.org");
      return request;
    },
    handleShowtimesResponse: (response, context, callback) => {
      const showtimes =
        JSON.parse(response.text).data.showingsForDate?.data || [];
      // let formattedShowtimes = [
      //   { movie_title: "test", start_at: "2023-02-24T20:00:00", is_3d: false },
      // ];
      let formattedShowtimes = showtimes.map((showtime) => {
        return {
          movie_title: showtime.movie.name,
          start_at: showtime.time,
          is_3d: false,
        };
      });
      console.log(showtimes);
      callback(null, formattedShowtimes);
    },
  },
});

crawlE.crawl();
