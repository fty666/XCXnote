<template>
	<view>
		<view class="kuan" style="margin-top: 30upx;">
			<view class="flex" style="height: 100upx;width: 100%;" @click="edit()">
				<view class="flex" style="width: 90%;">
					<view class="manage">修改手机号</view>
					<view class="cache" style="text-align: right;margin-right: 25upx;">18834478978</view>
				</view>
				<view>
					<image src="../../static/imgs/more@2x.png" class="right"></image>
				</view>
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
			// 修改手机号
			edit(){
				uni.navigateTo({
					url:'../mobleInfo/mobleInfo'
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
		height: 100upx;
		margin-top: 140upx;
		background: #FFFFFF;
	}

	.manage {
		width: 60%;
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
		margin-top: 45upx;
		align-items: left;
	}


	.cache {
		font-size: 12px;
		color: #8B8A9A;
		width: 35%;
		text-align: left;
		line-height: 50px;
	}

	.kxia {
		width: 100%;
		height: 3upx;
		background: #E5E5E5;
	}
</style>
