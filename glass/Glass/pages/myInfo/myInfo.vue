<template>
	<view>
		<!-- 头像 -->
		<view class="files">
			<view class="photo">
				<image src="" mode=""></image>
			</view>
			<view class="name">陈河</view>
			<view class="phone">18834487978</view>
		</view>
		<!-- 故障数 -->
		<view class="fault">
			<view class="flex-space">
				<view class="content">监测天数</view>
				<view class="content">发现故障</view>
				<view class="content">处理故障</view>
			</view>
			<view class="flex-space">
				<view class="flex day">
					<view class="dnums">128</view>
					<view class="tian">天</view>
				</view>
				<view class="flex day">
					<view class="dnums">128</view>
					<view class="tian">天</view>
				</view>
				<view class="flex day">
					<view class="dnums">128</view>
					<view class="tian">天</view>
				</view>
			</view>
		</view>
		<!-- 条框 -->
		<view class="kuan">
			<view class="flex-space" style="height: 100upx;width: 100%;" @click="dispose()">
				<view>
					<image src="../../static/imgs/record@2x.png" class="book"></image>
				</view>
				<view class="manage">处理记录</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex-space" style="height: 100upx;width: 100%;">
				<view>
					<image src="../../static/imgs/333.png" class="book"></image>
				</view>
				<view class="manage">接收预警</view>
				<view>
					<image src="../../static/imgs/open@2x.png" class="yu"></image>
				</view>
			</view>
		</view>
		<view class="kuan" style="margin-top: 30upx;">
			<view class="flex-space" style="height: 100upx;width: 100%;" @click="myInfo()">
				<view>
					<image src="../../static/imgs/early%20warning@2x.png" class="book"></image>
				</view>
				<view class="manage">关于我们</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
			</view>
			<view class="kxia"></view>
			<view class="flex-space" style="height: 100upx;width: 100%;" @click="set()">
				<view>
					<image src="../../static/imgs/Set%20up@2x.png" class="book"></image>
				</view>
				<view class="manage">设置</view>
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
			// 处理记录
			dispose() {
				uni.navigateTo({
					url: '../dispose/dispose'
				})
			},
			// 设置
			set() {
				uni.navigateTo({
					url: '../setInfo/setInfo'
				})
			},
			// 关于我们
			myInfo(){
				uni.navigateTo({
					url:'../regards/regards'
				})
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
	}

	.files {
		width: 100%;
		height: 452upx;
		background: linear-gradient(0deg, rgba(13, 123, 253, 1), rgba(88, 177, 253, 1));
	}

	.photo {
		width: 100%;
		height: 265upx;
		margin-top: 80upx;
	}

	.photo image {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		background: #FFFFFF;
		margin: 100upx 280upx;

	}

	.name {
		width: 95%;
		height: 35upx;
		font-size: 16px;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 27px;
		text-align: center;
	}

	.phone {
		width: 95%;
		height: 18upx;
		font-size: 14px;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 100upx;
		text-align: center;
	}

	/* 故障 */
	.flex-space {
		display: flex;
		justify-content: space-around;
	}

	.fault {
		width: 90%;
		height: 160upx;
		background: #FFFFFF;
		border-radius: 12px;
		margin: -50upx 35upx;
		z-index: 88;
	}

	.content {
		height: 80upx;
		font-size: 15px;
		color: #8B8A9A;
		line-height: 100upx;
	}

	.day {
		width: 30%;
	}

	.dnums {
		width: 60%;
		height: 30upx;
		font-size: 17px;
		font-weight: 400;
		color: rgba(11, 12, 60, 1);
		line-height: 27px;
		text-align: right;
	}

	.tian {
		width: 35%;
		height: 20upx;
		font-size: 12px;
		font-weight: 400;
		color: rgba(139, 138, 154, 1);
		line-height: 27px;
		text-align: left;
		margin: 5upx 5upx;
	}

	/* 边框 */
	.kuan {
		width: 100%;
		height: 200upx;
		margin-top: 140upx;
		background: #FFFFFF;
	}

	.book {
		width: 50upx;
		height: 50upx;
		margin: 35upx 15upx;
	}

	.manage {
		width: 65%;
		/* margin-left: 10upx; */
		height: 115px;
		font-size: 14px;
		font-weight: 400;
		color: rgba(62, 61, 103, 1);
		line-height: 107upx;
		text-align: left;
	}

	.right {
		width: 25upx;
		height: 25upx;
		margin-top: 35upx;
		align-items: left;
	}

	.yu {
		width: 55upx;
		height: 35upx;
		margin-top: 35upx;
	}

	.kxia {
		width: 90%;
		height: 3upx;
		background: #E5E5E5;
		margin-left: 30upx;
	}
</style>
