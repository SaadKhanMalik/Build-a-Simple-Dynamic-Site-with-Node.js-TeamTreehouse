var Profile = require("./profile.js");

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/") {
    //show search
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Header\n");
    response.write("Search\n");
    response.end('Footer\n');
  }
  //if url == "/" && POST
    //redirect to /:username
}

//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/...."
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Header\n");

    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON){
      //show profile

      //Store the values which we need
      var values = {
        avatarURL:           profileJSON.gravatar_url,
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
      response.write(values.username + " has " + values.badges + " badges\n");
      response.end('Footer\n');
    });

    //on "error"
    studentProfile.on("error", function(error){
      //show error
      response.write(error.message + "\n");
      response.end('Footer\n');
    });

  }
}

module.exports.home = home;
module.exports.user = user;
