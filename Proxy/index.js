console.log('Server');
var http = require('http');
const https = require('https');
const fs = require('fs');
var request = require('request');
var port = 8090;

const options = {
  pfx: fs.readFileSync('konekonsulting.pfx'),
  passphrase:"password123"
};


var handler = function(req, res){
  
  if(req.url == "/part1")
  {
    console.log('Part1 request');
    console.log('Request headers');
    console.log(req.headers);
    console.log('Request method ' +req.method);
    console.log('Request content type ' +req.headers['content-type']);
    
    var x = request('http://konekonsulting.com:8080/Part1/post', function(error, response, body)
      {
        console.log('Response headers');
        console.log(response.headers);
        console.log('Response status');
        console.log(response.statusCode);
        console.log('Response body');
        console.log(body);
      });
    req.pipe(x);
    x.pipe(res);
  }
  else if (req.url == "/part2")
  {
    console.log('Part2 request');
    var x = request('https://konekonsulting.com:8080/Part2/post', function(error, response, body)
    	      {
    	        console.log('Response headers');
    	        console.log(response.headers);
    	        console.log('Response status');
    	        console.log(response.statusCode);
    	        console.log('Response body');
    	        console.log(body);
    	      });
    	    req.pipe(x);
    	    x.pipe(res);
  }
  else
  {
    res.end();
  }
}

http.createServer(handler).listen(port);
https.createServer(options, handler).listen(port);
console.log('Listening to '+port);