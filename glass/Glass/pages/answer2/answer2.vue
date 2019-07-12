<template>
	<view>
		<view class="font">在哪里可以下载iOS版和Android版手机应用?</view>
		<view class="font2">
			iOS用户可以在Apple App Store免费下载本手机应用。Android用户可通过下载链接免费下载本手机应用。
		</view>
		<!-- 		<view class="font2">
			在软件点击【我的】-【设置】-【关于软件】，找到联
			系电话，然后拨打电话。
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.font {
		width: 85%;
		height: 160upx;
		font-size: 18px;
		font-family: SourceHanSansCN-Regular;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 70upx;
		margin: 50upx 50upx;
		/* text-indent:2em; */
		border-bottom: 1px solid #ddd;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
	}

	.font2 {
		width: 90%;
		font-size: 15px;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 50upx;
		margin: 10upx 50upx;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
	}
</style>
