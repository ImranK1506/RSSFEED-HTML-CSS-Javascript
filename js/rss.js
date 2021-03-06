var feedsLibrary = {
	nos : "http://feeds.nos.nl/nosjournaal",
	telegraaf : "http://www.telegraaf.nl/rss/",
	volkskrant : "http://www.volkskrant.nl/nieuws/rss.xml",
	nrc : "https://www.nrc.nl/rss/",
}

$.each(feedsLibrary, function(feedId, feedUrl) {
  var baseUrl = "https://query.yahooapis.com/v1/public/yql?q="
  var queryString = encodeURI("SELECT * FROM feed WHERE url='" + feedUrl + "'LIMIT 5")
  var format = "&format=json"

	var rssFeedPath = baseUrl.concat(queryString, format)

	$.getJSON(rssFeedPath, function(response) {
		var feedItems = response.query.results.item // object: query, key: results, item	

		$.each(feedItems, function(index){
			var item = feedItems[index]

			var ulEl = $('#' + feedId)
			ulEl.append('<li class="feed-item"><a class="feed-link" target="_blank" href="' + item.link + '">' + item.title +'</a></li>')
		})
	})
})




