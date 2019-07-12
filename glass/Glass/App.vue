<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			uni.getProvider({
				service: 'push',
				success: function(res) {
					console.log(res.provider)
					// 个推的名称为 igexin
					if (~res.provider.indexOf('igexin')) {
						uni.subscribePush({
							provider: 'igexin',
							success: function(res) {
								console.log('success:' + JSON.stringify(res));
							}
						});
					}
				}
			});
			uni.onPush({
				provider: 'igexin',
				success: function() {
					console.log('监听透传成功');
				},
				callback: function(data) {
					console.log("接收到透传数据：" + JSON.stringify(data));
				}
			});
			plus.push.addEventListener("click", function(msg) {
				plus.ui.alert("click:" + JSON.stringify(msg));
				plus.ui.alert(msg.payload);
				// plus.ui.alert(JSON.stringify(msg));  

			}, false);
			// 监听在线消息事件    
			plus.push.addEventListener("receive", function(msg) {
				// plus.ui.alert(2);  
				plus.ui.alert("recevice:" + JSON.stringify(msg))
			}, false);
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style>
	/*每个页面公共css */
	body {
		background: #F8F8F8;
	}
</style>
