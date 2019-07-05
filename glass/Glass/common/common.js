const picUrl = 'https://muqiang.oss-cn-beijing.aliyuncs.com/';
const getData = function(url, data,calback) {
	uni.request({
		url: 'http://39.106.155.211:8080/' + url,
		data: data,
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		method: 'POST',
		success: (res) => {
			if(res.data.data){
				calback(res.data.data)
			}else{
				calback(res.data)
			}
		}
	})
}
const regular = function(num,data) {
	var reg=null;
	switch(num){
		case 1:
			reg=/^1[34578]\d{9}$/
			break;
	}
	return reg.test(data)
}
export default {
	picUrl,
	getData,
	regular
}
