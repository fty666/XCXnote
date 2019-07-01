<template>
	<view>
		<view class="nows">常见问题</view>
		<view class="kuan" style="margin-top: 30upx;height: 410upx;">
			<view class="flex" style="height: 100upx;width: 100%;" @click="answer()">
				<view class="manage">玻璃幕墙破损通知会以什么方式通知用户</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;">
				<view class="manage">当玻璃幕墙破损时多久会有人进行维修</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;">
				<view class="manage">如果软件不能正常使用，找谁来解决</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;">
				<view class="manage">检测系统如何确定范围</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
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
			// 常见问题
			answer() {
				uni.navigateTo({
					url: '../answer/answer'
				})
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
	}

	.nows {
		width: 100%;
		height: 60upx;
		font-size: 13px;
		font-weight: 400;
		color: rgba(139, 138, 154, 1);
		line-height: 80upx;
		margin: 10upx 40upx;
	}

	/* 边框 */
	.kuan {
		width: 100%;
		height: 200upx;
		margin-top: 140upx;
		background: #FFFFFF;
	}

	.manage {
		width: 80%;
		height: 115px;
		font-size: 14px;
		font-weight: 400;
		color: #0B0C3C;
		line-height: 107upx;
		margin-left: 50upx;
	}

	.right {
		width: 20upx;
		height: 20upx;
		margin-top: 35upx;
		align-items: left;
	}

	.yu {
		width: 55upx;
		height: 35upx;
		margin-top: 35upx;
	}

	.cache {
		font-size: 12px;
		color: #8B8A9A;
		width: 80upx;
		text-align: left;
		line-height: 40px;
	}

	.kxia {
		width: 100%;
		height: 3upx;
		background: #E5E5E5;
	}

	.out {
		width: 90%;
		height: 100upx;
		background: linear-gradient(0deg, rgba(13, 123, 253, 1) 0%, rgba(88, 197, 255, 1) 100%);
		border-radius: 30px;
		font-size: 16px;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 100upx;
		text-align: center;
		margin-top: 300upx;
		margin-left: 30upx;
	}
</style>
