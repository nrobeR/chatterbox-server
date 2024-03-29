/* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
  // var ObjectID = require('mongodb').ObjectID;

  var serverData = {
    'results':[{createdAt: "2014-08-12T02:50:00.986Z",
      objectId: "fi0Y89DA3a",
      roomname: "lobby",
      message: "test",
      updatedAt: "2014-08-12T02:50:00.986Z",
      username: "jon"}
    ]
  };

var handleRequest = function(request, response) {
  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;

  if(request.method === 'GET'){
    if(request.url === '/classes/messages' || request.url === '/classes/room'){
      statusCode = 200;
    }
  }

  if(request.method === 'POST'){
    //if(request.url === '/classes/messages' || request.url === '/classes/room'){
      statusCode = 201;

      request.on('data',function(data){
        var parsedData = JSON.parse(data);
        // console.log(new ObjectID());
        console.log("------------------------------------------PARSED DATA :"+ data)
        var newMessage = {};
        newMessage.username = parsedData['username'];
        newMessage.message = parsedData['message'];
        newMessage.roomname = parsedData['roomname'];
        var now = new Date();
        newMessage.createdAt = now.toJSON();
        newMessage.updatedAt = now.toJSON();
        newMessage.objectId = JSON.stringify(Math.random() * now.valueOf());
        // console.log(newMessage);
        serverData.results.push(newMessage);

      });

    //}
  }

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  response.end(JSON.stringify(serverData));

};
module.exports = handleRequest;
/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
