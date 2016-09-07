//Problem: we need a simple way to look at user's badge count and points

//Solution:Use Node.js to perform the profile lookups and server out templates via HTTP(S)
//1. creat a web server
//2. handle HTTP route GET / and Post / ie. HOME
  //if url == "/" && GET
    // show search
  //if URL == "/" && POST
    //Redirect to /:username

//3. Handle HTTP route GET/ :username i. / chalkers
  //if url === "/..."
    //get JSON from TreeHouse
      // on "end"
        //show profile
      //on "error"
        //show error

//4. Function that handles the reading of files and merge  in value
  //read from a file and get a string
    // merge values into string
