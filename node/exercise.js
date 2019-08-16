// 基础用法输出
var foo='hello word';
console.log(foo);
var fs=require('fs');
// 读取某个文件
fs.readFile('./a.txt',function(error,data){
	if(error){
		console.log('文件读取失败')
		return;
	}else{
		console.log(data.toString());
	}
});
// 写入文件
fs.writeFile('./hello.md','大家好,这是一个美好的错误',function(error){
	console.log(error)
})

