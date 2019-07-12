<template>
	<view>
		<view class="font">本手机应用是否支持所有Android设备?</view>
		<view class="font2">
			Android用户在下载本手机应用前，请确认您的设备系统至少为安卓5.0或更高版本。此款软件支持多种Android系统手机设备。如果您的手机设备无法正常运行我们的手机应用，也许是受到了硬件或软件的限制，包括硬件或软件的版本过旧，或者您对软件所做的任何自定义修改。
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
		width: 87%;
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
