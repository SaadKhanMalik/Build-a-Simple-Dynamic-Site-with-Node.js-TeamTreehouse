var fs = require("fs");

function mergeValues(values, content) {
  //cycle over the keys
  for(var key in values){
    //replace  all {{key}} with the valu from the values object.
    content = content.replace("{{" + key + "}}", values[key]);
  }
  //return merged content
  return content;
}

function view(templateName, values, response){
  //Read from the template file
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {enconding: "utf8"});
    //Insert values into the Content
    fileContents = mergeValues(values, fileContents)
    //write out to the response
    response.write(fileContents);
}

module.exports.view = view;
