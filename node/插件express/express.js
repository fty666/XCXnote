
//首先安装   
//npm install express --save
//引入模板
var express =require('express');

// express 相当于创建一个http服务
var app=express();

//开放某些公共目录
app.use('/public/', express.static('./public/'))

//GET请求数据
app.get('/',function(req,res){
	//req.query   相当于获取get请求的参数
	var datas=req.query;
	res.send(datas);
})

// POST请求
//POS获取路由请求
//1,安装插件: npm install body-parser
//2,引包： var bodyParser=require('body-parser');   
//3，配置：app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())
// 4,获取: var comment=req.body;
app.post('/protog',function(){
})

//监听端口号
app.listen('3000',function(err){
	console.log('请求服务成功')
})