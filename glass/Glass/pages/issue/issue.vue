<template>
	<view>
		<view class="nows">常见问题</view>
		<view class="kuan" style="margin-top: 30upx;height: 900upx;">
			<view class="flex" style="height: 100upx;width: 100%;background: #FFFFFF;" @click="answer2()">
				<view class="manage">在哪里可以下载iOS版和Android版手机应用</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;background: #FFFFFF;" @click="answer3()">
				<view class="manage">本手机应用是否支持所有iOS设备</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;background: #FFFFFF;" @click="answer4()">
				<view class="manage">本手机应用是否支持所有Android设备</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;background: #FFFFFF;" @click="answer()">
				<view class="manage">如果软件不能正常使用，找谁来解决</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;background: #FFFFFF;" @click="answer5()">
				<view class="manage">不想再使用手机时如何清除手机里的个人数据</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;background: #FFFFFF;" @click="answer6()">
				<view class="manage">如何在手机应用中登录我的帐户</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;background: #FFFFFF;" @click="answer7()">
				<view class="manage">如何在手机应用中退出登录帐户</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 140upx;width: 100%;background: #FFFFFF;" @click="answer8()">
				<view class="manage" style="line-height: 65upx;">为何帐号密码在后台可以登录成功在手机应用中确提示密码错误</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right" style="margin-top: 60upx;"></image>
				</view>
			</view>
			<view class="kxia"></view>
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
			// 常见问题,软件不能使用
			answer() {
				uni.navigateTo({
					url: '../answer/answer'
				})
			},
			// 在哪里下载版本
			answer2() {
				uni.navigateTo({
					url: '../answer2/answer2'
				})
			},
			//问题3
			answer3() {
				uni.navigateTo({
					url: '../answer3/answer3'
				})
			},
			// 问题4
			answer4() {
				uni.navigateTo({
					url: '../answer4/answer4'
				})
			},
			// 问题5
			answer5() {
				uni.navigateTo({
					url: '../answer5/answer5'
				})
			},
			// 问题6
			answer6() {
				uni.navigateTo({
					url: '../answer6/answer6'
				})
			},
			// 问题7
			answer7() {
				uni.navigateTo({
					url: '../answer7/answer7'
				})
			},
			// 问题8
			answer8() {
				uni.navigateTo({
					url: '../answer8/answer8'
				})
			},
		}
	}
</script>

<style>
	.flex {
		display: flex;
	}

	.nows {
		width: 60%;
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
	}

	.manage {
		width: 85%;
		height: 115px;
		font-size: 14px;
		font-weight: 400;
		color: #0B0C3C;
		line-height: 107upx;
		margin-left: 50upx;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
	}

	.right {
		width: 20upx;
		height: 20upx;
		margin-top: 35upx;
		margin-left: 15upx;
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
