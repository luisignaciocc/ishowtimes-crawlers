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
        resultVersion: "4072224857",
      },
      query:
        "query ($date: String, $movieId: ID, $titleClassId: ID, $titleClassIds: [ID], $everyShowingBadgeIds: [ID], $anyShowingBadgeIds: [ID], $resultVersion: String) {\n  showingsForDate(\n    date: $date\n    movieId: $movieId\n    titleClassId: $titleClassId\n    titleClassIds: $titleClassIds\n    everyShowingBadgeIds: $everyShowingBadgeIds\n    anyShowingBadgeIds: $anyShowingBadgeIds\n    resultVersion: $resultVersion\n  ) {\n    data {\n      id\n      time\n      overrideSeatChart\n      overridePriceCard\n      published\n      ticketsSold\n      ticketsPaid\n      current\n      past\n      overrideReservedSeating\n      overrideReservedSeatingValue\n      customHeldSeatCount\n      overrideHeldSeatCount\n      overrideShowingBadges\n      allowWithoutMembership\n      private\n      screenId\n      priceCardId\n      customPriceCardId\n      movie {\n        id\n        name\n        showingStatus\n        displayMetaData\n        urlSlug\n        posterImage\n        signageDisplayPoster\n        bannerImage\n        signageDisplayBanner\n        animatedPosterVideo\n        signageDisplayAnimatedPoster\n        signageMessageOverride\n        color\n        synopsis\n        starring\n        directedBy\n        producedBy\n        searchTerms\n        duration\n        genre\n        allGenres\n        rating\n        ratingReason\n        trailerYoutubeId\n        trailerVideo\n        signageDisplayTrailer\n        releaseDate\n        predictedWeekOneTicketSales\n        tmdbPopularityScore\n        tmdbId\n        includeInComingSoon\n        includeInFuture\n        overridePriceCard\n        sendRentrak\n        rentrakName\n        allowPastSales\n        dcmEdiMovieId\n        dcmEdiMovieName\n        disableOnlineConcessions\n        hasFlatFee\n        termPercentHundredths\n        flatFee\n        titleClassId\n        customPriceCardId\n        __typename\n      }\n      showingBadgeIds\n      predictedAttendance\n      seatsRemaining\n      seatsRemainingWithoutSocialDistancing\n      __typename\n    }\n    count\n    resultVersion\n    __typename\n  }\n}\n",
    },
    urlDateFormat: "YYYY-MM-DD",
  },
  hooks: {
    configureRequest: (request, context) => {
      request = request.set(
        "cookie",
        "ahoy_visit=f916b773-cd16-42d4-b1df-a1bcdc146494; ahoy_visitor=e28bfed3-7955-4ab2-a3d6-a78cfce332e4; site_id=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBZ2lCek13IiwiZXhwIjpudWxsLCJwdXIiOiJjb29raWUuc2l0ZV9pZCJ9fQ%3D%3D--6bd828855450066b6db17cb9805e94f4f91057d8; circuit_id=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBKQT09IiwiZXhwIjpudWxsLCJwdXIiOiJjb29raWUuY2lyY3VpdF9pZCJ9fQ%3D%3D--003b76797e7ad985e98c6330a99222e0477d714c; hardware_id=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBZ3ciLCJleHAiOm51bGwsInB1ciI6ImNvb2tpZS5oYXJkd2FyZV9pZCJ9fQ%3D%3D--3c0f2f0ceb377fc53b9042799b34d7347c942957"
      );
      return request;
    },
    handleShowtimesResponse: (response, context, callback) => {
      let data = JSON.parse(response.text);
      let showtimes = [
        { movie_title: "test", start_at: "2023-02-24T20:00:00", is_3d: false },
      ];
      //   let showtimes = data.map((showtime) => {
      //     return {
      //       movie_title: showtime.movie.name,
      //       start_at: showtime.time,
      //       is_3d: false,
      //     };
      //   });
      console.log(data);
      callback(null, showtimes);
    },
  },
});

crawlE.crawl();
