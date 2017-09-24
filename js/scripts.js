$(function(){
	var tweetLink = "https://twitter.com/intent/tweet?text=";
	var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
	var prefix = "https://cors-anywhere.herokuapp.com/";

	function getQuote() {
		$.getJSON(prefix + quoteUrl, createTweet);
	}

	function createTweet(input) {
		if (input instanceof Array) {
			var data = input[0];
			
			var quoteText = $(data.content).text().trim();
			var quoteAuthor = data.title;

			if (!quoteAuthor.length) {
				quoteAuthor = "Nieznany autor";
			}
			
			var tweetText = "Cytat dnia - " + quoteText + " Autor: " + quoteAuthor;
			
			if (tweetText.length > 140) {
				getQuote();
			} else {
				var tweet = tweetLink + encodeURIComponent(tweetText);
				$('.quote').text(quoteText);
				$('.author').text("Autor: " + quoteAuthor);
				$('.tweet').attr('href', tweet);
			}
			
			$('.tweet').attr('href', tweet);
		}
	}

	$(document).ready(function() {
		getQuote();
		$('.trigger').click(function() {
			getQuote();
		})
	});
	
	$.ajaxSetup({ cache: false });
});
