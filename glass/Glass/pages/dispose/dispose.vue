<template>
	<view>
		<view v-for="item in arr" :key='index'>
			<view class="head1">
				<view class="title">2019-06-26&nbsp;10:30:52</view>
				<view class="flex font">
					<view class="font1">工作人员:</view>
					<view class="font2">赵克生</view>
				</view>
				<view class="flex font">
					<view class="font1">维修区域:</view>
					<view class="font2">A-12</view>
				</view>
				<view class="flex font">
					<view class="font1">工作内容:</view>
					<view class="font2">玻璃幕墙破损</view>
				</view>
				<view class="flex font">
					<view class="font1">工作状态:</view>
					<view class="font2" style="color: #1769FF;">已完成</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [1, 2, 3, 4]
			}
		},
		methods: {

		}
	}
</script>

<style>
	.head1 {
		width: 92%;
		height: 360upx;
		background: #FFFFFF;
		margin: 20upx 30upx;
		border-radius: 12px;
	}

	.flex {
		display: flex;
	}

	.title {
		width: 90%;
		height: 100upx;
		margin: 10upx 48upx;
		font-size: 14px;
		line-height: 130upx;
		color: #3E3D67;
	}

	.font {
		width: 100%;
		height: 50upx;
		font-size: 16px;
		margin: 10upx 20upx;
	}

	.font1 {
		text-align: center;
		width: 30%;
		color: #8B8A9A;
	}

	.font2 {
		text-align: left;
		width: 65%;
		color: #3E3D67;
	}
</style>
