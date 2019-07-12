<template>
	<view>
		<view class="nows">希望接收</view>
		<view class="kuan" style="margin-top: 30upx;height: 200upx;">
			<view class="flex" style="height: 100upx;width: 100%;">
				<view class="manage">接收玻璃幕墙破损通知</view>
				<view>
					<image src="../../static/imgs/shut@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;">
				<view class="manage">接收高空掷物通知</view>
				<view>
					<image src="../../static/imgs/shut@2x.png" class="right"></image>
				</view>
			</view>
		</view>
		<view class="kuan" style="margin-top: 30upx;height: 100upx;margin-top: 30upx;">
			<view class="flex" style="height: 100upx;width: 100%;margin-top: 30upx;">
				<view class="manage">信息推送</view>
				<view>
					<image src="../../static/imgs/shut@2x.png" class="right"></image>
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
		width: 80%;
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
		width: 50upx;
		height: 25upx;
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
