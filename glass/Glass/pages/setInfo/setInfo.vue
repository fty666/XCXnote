<template>
	<view>
		<!-- 一 -->
		<view class="kuan" style="margin-top: 30upx;">
			<view class="flex" style="height: 100upx;width: 100%;" @click="moble()">
				<view class="manage">账号和安全</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;" @click="gnews()">
				<view class="manage">新消息通知</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
		</view>
		<!-- 二 -->
		<view class="kuan" style="margin-top: 30upx;height: 300upx;">
			<view class="flex" style="height: 100upx;width: 100%;">
				<view class="manage">清理缓存</view>
				<view class="cache" style="width: 195upx;">
					10.5M
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;" @click="isSue()">
				<view class="manage">常见问题</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex" style="height: 100upx;width: 100%;">
				<view class="flex" style="width: 85%;">
					<view class="manage">关于软件</view>
					<view class="cache" style="text-align: right;margin-right: 25upx;">1.1.00</view>
				</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
		</view>
		<!-- 退出 -->
		<view class="out">
			退出登录
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
			// 修改手机号
			moble() {
				uni.navigateTo({
					url: '../editMoble/editMoble'
				})
			},
			// 常见问题
			isSue(){
				uni.navigateTo({
					url:'../issue/issue'
				})
			},
			// 消息通知
			gnews(){
				uni.navigateTo({
					url:'../news/news'
				})
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
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
		background:linear-gradient(0deg,rgba(13,123,253,1) 0%,rgba(88,197,255,1) 100%);
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
