<template>
	<view>
		<view>
			<view class="img">
				<image src="../../static/imgs/logo.png" mode=""></image>
			</view>
			<view class="font">玻璃幕墙智慧监测系统</view>
		</view>
		<view class="botom">
			<view class="font1">版本信息：&nbsp;&nbsp;V1.1.00&nbsp;&nbsp;联系电话:&nbsp;&nbsp;000-400-600</view>
			<view class="font2">Copyright © 2019-2020 天津传清科技集团有限公司</view>
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
	.img image {
		width: 220upx;
		height: 220upx;
		margin-top: 300upx;
		margin-left: 250upx;
	}

	.font {
		font-size: 20px;
		font-weight: 400;
		color: rgba(11, 12, 60, 1);
		line-height: 100upx;
		text-align: center;
	}

	.botom {
		width: 100%;
		position: fixed;
		bottom: 0px;
		height: 200upx;
	}

	.font1 {
		width: 100%;
		height: 60upx;
		font-size: 15px;
		font-weight: 400;
		color:#666666;
		line-height: 27upx;
		text-align: center;
	}

	.font2 {
		width: 100%;
		height: 60upx;
		font-size: 12px;
		font-weight: 400;
		color: rgba(139, 138, 154, 1);
		line-height: 27upx;
		text-align: center;
	}
</style>
