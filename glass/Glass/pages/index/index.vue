<template>
	<view>
		<view>
			<web-view src="http://39.106.155.211:8080/glass/#/" @message="handleMessage"></web-view>
		</view>
	</view>
</template>
<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.1.js"></script>
<script>
	export default {
		onReady() {
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
			console.log(currentWebview)
			setTimeout(function() {
				var wv = currentWebview.children()[0]
				console.log(wv)
				wv.setStyle({
					top: 50,
					height: 650
				})
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
		},
		data() {
			return {
				log: '1111'
			}
		},
		methods: {
			handleMessage(evt) {
				this.log = JSON.stringify(evt.detail);
				// uni.navigateTo({
				// 	url: '../login/login'
				// })
			},
		}
	};
</script>
