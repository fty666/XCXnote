// 1,创建服务器，加载引入核心api
var http = require('http');
// 2,创建一个服务器实例
var server = http.createServer();
// 3,接收请求，接收浏览器发送的请求
server.on('request', function(request, response) {
	//获取浏览器请求的地址
	var url = request.url;
	//response 响应数据,返回给浏览器
	if (url === '/') {
		// 发送编码类型格式，避免发送数据到浏览器中文乱码
		// text/plain  表示普通文本
		// text/html    表示可以转化html文本
		// 响应浏览器必须是以字符串的形式，其他类型不行
		response.setHeader('Content-type', 'text/html; charset=utf-8');
		response.end('<a>百度</a>')
	} else if (url === '/login') {
		var infos = [{
				name: '张三',
				age: 18
			},
			{
				name: '张三',
				age: 18
			}
		];
		// 发送编码类型格式，避免发送数据到浏览器中文乱码  
		// content-type   不同类型不一样  具体参考http://tool.oschina.net/commons  
		// text/plain  	表示普通文本
		// text/html    表示可以转化html文本
		// image/jpeg    图片
		// 响应浏览器必须是以字符串的形式，其他类型不行
		response.setHeader('Content-type', 'text/plain; charset=utf-8');
		response.end(JSON.stringify(infos));
	} else {
		response.end('404 Nod Find');
	}
})
//4, 绑定端口号
server.listen(3000, function() {
	console.log('服务器请求成功了')
})
