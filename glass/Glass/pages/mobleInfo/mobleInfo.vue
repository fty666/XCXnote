<template>
	<view>
		<view class="now">
			当前用手机号
		</view>
		<!-- 手机验证 -->
		<view class="head1 flex">
			<view class="font1">+86</view>
			<view class="fen">|</view>
			<view class="number">13466646464</view>
		</view>
		<view class="head1 flex" style="margin-top: 25upx;">
			<view class="font1" style="width: 18%;">
				<image src="../../static/imgs/phone.png" mode=""></image>
			</view>
			<view class="fen">|</view>
			<view class="number" style="display: flex;margin-left: 0px;">
				<view class="input">
					<input type="text" placeholder="验证码" />
				</view>
				<view class="yzm">
					<image src="../../static/imgs/yanzhen@2x.png"></image>
				</view>
			</view>
		</view>
		<!-- 下一步 -->
		<view class="next">
			下一步
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
			handleMessage(evt) {
				console.log(evt)
				this.log('接收到的消息：' + JSON.stringify(evt.detail));
			},

		}
	}
</script>

<style>
	.flex {
		display: flex;
		justify-content: space-between;
	}

	.now {
		width: 100%;
		height: 160upx;
		text-align: center;
		line-height: 160upx;
		font-size: 20px;
		font-weight: 400;
		color: #0B0C3C;
	}

	.head1 {
		width: 90%;
		height: 120upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4px 10px 0px rgba(38, 104, 224, 0.1);
		border-radius: 10px;
		margin: 15upx 35upx;
	}

	.font1 {
		width: 20%;
		font-size: 15px;
		font-weight: 400;
		color: rgba(11, 12, 60, 1);
		line-height: 120upx;
		text-align: center;
	}

	.font1 image {
		width: 35upx;
		height: 50upx;
		margin: 35upx 35upx;
	}

	.fen {
		width: 10%;
		line-height: 110upx;
		color: #DFDFDD;
	}

	.number {
		width: 60%;
		font-size: 16px;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 120upx;
		margin-left: 40upx;
	}

	.input {
		width: 60%;
		font-size: 16px;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 120upx;
		margin: 30upx 10upx;
	}

	.yzm {
		width: 35%;

	}

	.yzm image {
		width: 120upx;
		height: 60upx;
		margin: 35upx 5upx;
	}

	.next {
		width: 90%;
		height: 100upx;
		background: rgba(139, 138, 154, 1);
		border-radius: 30px;
		font-size: 16px;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 100upx;
		text-align: center;
		margin: 350upx 30upx;
	}
</style>
