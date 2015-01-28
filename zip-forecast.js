//  Problem: We need a simple way to look at a Treehouse user's badge count and JavaScript points.

//  Solution:  Use Node.js to connect to Treehouse's API to get profile information and print it out.

// my forecast.io API KEY - 6b0701ccfa469e7b92cac363130fa2bb
// example forecast.io API URL Call to return JSON with weather

var http = require("http");
var http = require("./zip-convert.js");

// Prints out the final message
function printMessage(city, forecast) {
	var forecastMsg = "The forecast for " + city + " is: " + forecast + ".";
	console.log(message);
}

// Prints out error messages
function printError(error) {
	console.error(error.message);
}

function getForecast(username) {
	//  Connect to the API URL (http://teamtreehouse.com/[USERNAME].json)
	var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
		var body = "";
		//  Read the data
		response.on('data', function (chunk) {
			body += chunk;
		});
		response.on('end', function() {
			if(response.statusCode === 200) {
				try {
					// console.log(body);
					// console.log(typeof body);
					// Parse the data
					var profile = JSON.parse(body);
					// Print the data
					// console.dir(profile);
					printMessage(username, profile.badges.length, profile.points.JavaScript);
					// printMessage(faddah, profile.badges.length, profile.points.JavaScript);
				} catch(error) {
					// Parse Error
					printError(error);
				}
			} else {
				// Status Code Error
				printError({message: "There was an error getting the profile for the Treehouse user \"" + username + ",\" user name may not exist. (Status Code Error: \'" + response.statusCode + " - " + http.STATUS_CODES[response.statusCode] + "\')"});
			}
		});
		//  console.log(response.statusCode);
	});

	// Connection Error
	request.on("error", printError);

	//  printMessage("Chalkers", 1000, 2000000);

}

module.exports.getForecast = getForecast;