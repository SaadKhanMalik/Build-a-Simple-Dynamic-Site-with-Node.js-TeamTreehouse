//Problem: we need a simple way to look at user's badge count and points

//Solution:Use Node.js to perform the profile lookups and server out templates via HTTP(S)

var router = require('./router');
// // require Profile data
// var Profile = require("./profile.js");
//
// var student Profile = new Profile ("saadkhanmalik")
//1. creat a web server
  //Lets require/import the HTTP module
  const http = require('http');

  // Define Hostname and Port as Contstants
  const hostname = '127.0.0.1';
  const port = 3000;

  //We need a function which handles requests and send response
  const server = http.createServer((request, response) => {

    router.home(request, response);
    router.user(request, response);
  });

  //Lets start our server
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });





//4. Function that handles the reading of files and merge  in value
  //read from a file and get a string
    // merge values into string
