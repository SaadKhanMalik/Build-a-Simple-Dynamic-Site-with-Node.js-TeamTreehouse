var Profile = require("./profile.js");

// handle HTTP route GET / and Post / ie. HOME
  function home(request, response) {
    //if url == "/" && GET
    if (request.url === "/") {
      // show search
      // response.statusCode = 200;
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write("Header\n");
      response.write("Search\n");
      response.end("Footer\n");
    }
    //if URL == "/" && POST
      //Redirect to /:username
  }
// Handle HTTP route GET/ :username ie. / username
  function user(request, response) {
    //if url == "/....."
    var username = request.url.replace("/", "");
    if(username.length > 0){
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.write("Header\n");

      //get JSON from TreeHouse
      var studentProfile = new Profile(username);
      // on "end"
      studentProfile.on("end", function(profileJSON) {
        //show profile

        //Store values
        var values = {
          avatarUrl: profileJSON.gravatar_url,
          username: profileJSON.profile_name,
          badges: profileJSON.badges.length,
          javascriptPoints: profileJSON.points.JavaScript
        }
        //simple response
        response.write(values.userename + " has " + values.badgeCount + " badges \n");
        response.end('Footer\n');
      });
      //on "error"
      studentProfile.on("error", (error) => {
        //show error
      });
      response.write(username + "\n");
      response.end('Footer\n')




      }
  }

module.exports.home = home;
module.exports.user = user;
