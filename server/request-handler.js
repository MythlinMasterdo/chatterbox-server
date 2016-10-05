var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var storage = {'results': [{username: 'Jono', text: 'All your code are belong to us.', roomname: 'lobby'}]};
var requestHandler = function(request, response) {
  var statusCode = 200;
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  // See the note below about CORS headers.
  if (request.method === 'OPTIONS') {
    console.log('in option');
    response.writeHead(statusCode, headers);
    response.end();
  } else if (request.method === 'GET') {
    if (request.url !== '/classes/messages') {
      statusCode = 404;
    }
  } else if (request.method === 'POST') {
    request.on('data', function(data) {
      storage.results.push(JSON.parse(data));
      console.log('data', data);
    });
    statusCode = 201;
  }

  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(storage));
};

exports.requestHandler = requestHandler;