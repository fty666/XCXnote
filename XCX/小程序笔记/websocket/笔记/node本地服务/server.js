var ws = require('nodejs-websocket')
var server = ws.createServer(function(conn){
	conn.on('text',function(str){
		server.connections.forEach(function(item){
			item.sendText(str)
		})
	})
	
}).listen(2333)
