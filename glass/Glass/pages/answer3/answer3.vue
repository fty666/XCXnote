<template>
	<view>
		<view class="font">本手机应用是否支持所有iOS设备?</view>
		<view class="font2">
			iOS用户在下载本手机应用前，请确认您的设备至少为iPhone 4或iPod Touch 3，并且操作系统为iOS 10.0或更高版本。
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
		height: 100upx;
		font-size: 18px;
		font-family: SourceHanSansCN-Regular;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 100upx;
		margin: 20upx 50upx;
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
