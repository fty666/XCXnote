<template>
	<view>
		<view class="head1">
			<view class="title">玻璃信息</view>
			<view class="flex font">
				<view class="font1">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</view>
				<view class="font2">43r-000071-07</view>
			</view>
			<view class="flex font">
				<view class="font1">破损位置:</view>
				<view class="font2">A区&nbsp;A-12</view>
			</view>
			<view class="flex font">
				<view class="font1">监测时间:</view>
				<view class="font2">43r-000071-07</view>
			</view>
			<view class="flex font">
				<view class="font1">处理状态:</view>
				<view class="font2" style="color: #F40250;">未处理</view>
			</view>
			<view class="flex font">
				<view class="font1">报警时间:</view>
				<view class="font2">2019-06-26&nbsp;&nbsp;10:30:52</view>
			</view>
			<view class="flex font">
				<view class="font1">实景图片:</view>
				<view class="img">
					<image src="../../static/logo.png"></image>
				</view>
			</view>
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
	.head1 {
		width: 92%;
		height: 670upx;
		background: #FFFFFF;
		margin: 20upx 30upx;
	}

	.flex {
		display: flex;
	}

	.title {
		width: 90%;
		height: 100upx;
		margin: 10upx 43upx;
		font-size: 16px;
		font-weight: 400;
		line-height: 130upx;
		color: rgba(11, 12, 60, 1);
	}

	.font {
		width: 100%;
		height: 50upx;
		font-size: 14px;
		margin: 10upx 20upx;
	}

	.font1 {
		text-align: center;
		width: 25%;
		color: #8B8A9A;
	}

	.font2 {
		text-align: left;
		width: 65%;
		color: #3E3D67;
	}
	.img{
		width: 60%;
		height: 200upx;
		margin-top: 25upx;
	}
	.img image{
		width: 180upx;
		height: 180upx;
	}
</style>
