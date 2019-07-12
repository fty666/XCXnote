<template>
	<view>
		<view class="font">如何在手机应用中退出登录帐户?</view>
		<view class="font2">
			若要在手机应用中退出登录帐户，您只需在“设置”中退出登录即可。一旦退出登录，系统将自动清除手机上的帐户信息。当您重新登录后，您的帐户信息会自动恢复。
		</view>
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
