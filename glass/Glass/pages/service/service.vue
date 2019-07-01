<template>
	<view>
		<view v-if="add==true">
			<!-- 维修详情 -->
			<view class="service flex">
				<view class="font">
					<view class="po">玻璃幕墙破损</view>
					<view class="call flex">
						<view class="title">报警时间:</view>
						<view class="time">2019-06-26 &nbsp;&nbsp;&nbsp;10:30:52</view>
					</view>
					<view class="call flex">
						<view class="title">维修地点:</view>
						<view class="time">A-07</view>
					</view>
				</view>
				<!-- 图片 -->
				<view style="width: 200upx;height: 200upx;">
					<image src="../../static/imgs/early%20warning@2x.png" class="mImg"></image>
				</view>
			</view>
			<!-- 添加内容 -->
			<view class="add" @click="adds">
				添&nbsp;加
			</view>
		</view>
		<!-- 添加内容 -->
		<view v-else>
			<addrecode v-on:fatherFun='save'></addrecode>
		</view>
	</view>
</template>

<script>
	import addrecode from '../../components/addRecode.vue'
	export default {
		data() {
			return {
				add: true
			}
		},
		components: {
			addrecode
		},
		methods: {
			adds(){
				this.add=false;
			},
			save(e){
				this.add=e;
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
	}

	.service {
		background: #FFFFFF;
		width: 100%;
		height: 280upx;
		margin-top: 20upx;
	}

	.font {
		width: 70%;
		height: 100%;
	}

	.po {
		width: 100%;
		font-size: 15px;
		font-weight: 400;
		color: black;
		font-size: 17px;
		margin: 40upx 40upx;
		line-height: 35upx;
	}

	.call {
		width: 100%;
		height: 80upx;
		margin-left: 40upx;
	}

	.title {
		width: 30%;
		color: #8B8A9A;
		font-size: 14px;
	}

	.time {
		width: 70%;
		color: #3E3D67;
		font-size: 15px;
		line-height: 40upx;
	}

	.mImg {
		width: 200upx;
		height: 200upx;
		margin: 50upx 20upx;
	}

	.add {
		width: 420upx;
		height: 88upx;
		background: linear-gradient(0deg, rgba(13, 123, 253, 1) 0%, rgba(88, 197, 255, 1) 100%);
		margin-left: 150upx;
		border-radius: 44px;
		font-size: 17px;
		color: rgba(255, 255, 255, 1);
		line-height: 80upx;
		text-align: center;
		position: fixed;
		bottom: 100upx;
	}
</style>
