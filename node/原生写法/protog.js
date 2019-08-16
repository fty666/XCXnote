//创建一个服务器请求
var http = require('http');

var server = http.createServer();

server.on('request', function(resqut, res) {
	//获取前台请求的路径
	var url = resqut.url;
	if (url === '/') {
		//转化返回给前台的字符类型
		res.setHeader('Content-type', 'text/html; charset=utf-8');
		res.end('请求返回数据');
	}

})

//监听端口号
server.listen('3000', function(err) {
	console.log('请求服务成功');
})
