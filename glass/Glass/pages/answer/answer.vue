<template>
	<view>
		<view class="font">如果软件不能正常使用，找谁来解决?</view>
		<view class="font2">
			1.在软件设置关于中找到联系电话
		</view>
		<view class="font2">
			在软件点击【我的】-【设置】-【关于软件】，找到联
			系电话，然后拨打电话。
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
