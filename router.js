var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/") {
    if(request.method.toLowerCase() === "get") {
      //show search
      response.writeHead(200, {'Content-Type': 'text/html'});
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      //if url == "/" && POST

      //get the post data from body
      request.on("data", function(postBody){
        //console.log(postBody.toString());
        //extract the username
        var query = querystring.parse(postBody.toString()); // this will return a jason object back.
        //redirect to /:username
        response.writeHead(303, {"Location": "/" + query.username});
        response.end();

      });



    }
  }
}

//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/...."
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    renderer.view("header", {}, response);

    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON){
      //show profile

      //Store the values which we need
      var values = {
         avatarURL:          profileJSON.gravatar_url,
         username:           profileJSON.profile_name,
         badges:             profileJSON.badges.length,
         HTML:               profileJSON.points.HTML,
         CSS:                profileJSON.points.CSS,
         Design:             profileJSON.points.Design,
         JavaScript:         profileJSON.points.JavaScript,
         Ruby:               profileJSON.points.Ruby,
         PHP:                profileJSON.points.PHP,
         WordPress:          profileJSON.points.WordPress,
         iOs:                profileJSON.points.iOs,
         //Development Tools:  profileJSON.points.["Development Tools"],
         Business:           profileJSON.points.Business,
         Python:             profileJSON.points.Python,
         Java:               profileJSON.points.Java,
         //Digital Literacy:   profileJSON.points.['Digital Literacy'],
         //Game Development:   profileJSON.points.['Game Development'],
         //C#:                 profileJSON.points.['C#'],
         Databases:          profileJSON.points.Databases,

      }
      //Simple response
      renderer.view("profile", values, response);
      //response.write(values.username + " has " + values.badges + " badges\n");
      renderer.view("footer",{}, response);
      response.end();
    });

    //on "error"
    studentProfile.on("error", function(error){
      //show error
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });

  }
}

module.exports.home = home;
module.exports.user = user;
