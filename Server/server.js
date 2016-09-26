var http = require('http');
var path= require('path');
var fs= require('fs');
var o=http.createServer(function ( req , res ){
  var url=req.url;

  if(url=="/")
  {
    url="/index.html";  }
    url=url.substr(1);
    fs.readFile(url,'utf-8',function(err,data)
  {
    if(err)
    {
      res.writeHead(200,{'Content-Type':'text/plain'})
      res.end("error occured file does not exist in directory ");
      return;
    }
    var x=path.extname(url);
    var type;
    switch(x)
    {
      case '.html': type='text/html';break;
      case '.css': type='text/css';break;
      case '.js': type='application/javascript';break;
      case '.json': type='application/json';break;


    }
    console.log(x+" "+type+" "+data);
    res.writeHead(200,{'Content-Type':type});
    res.end(data);
  });


});

o.listen(8082);
console.log("serving on port:"+8082);
