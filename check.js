var http = require('http');
var net = require("net");
var url = require("url");

var port = url.parse(process.env["REDIS_PORT"] || "");

var srv = http.createServer(function (req, res) {
  var handled = false;

  if (!port.hostname || !port.port)
    return onError();

  var c = net.createConnection(port.port, port.hostname, function () {
    c.write("PING\r\n");
  });

  c.on("data", function (data) {
    if (/PONG/.test(data.toString())) {
      c.destroy();

      handled = true;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end("PONG");
    }
  });

  c.setTimeout(2000, onError);
  c.on("error", onError);
  c.on("close", onError);

  function onError() {
    if (handled) return;
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end("FAIL");
  }
});

srv.listen(80);
