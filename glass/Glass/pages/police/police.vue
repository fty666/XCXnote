<template>
	<view>
		<view class="head1">
			<view class="title">玻璃信息</view>
			<view class="flex font">
				<view class="font1">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</view>
				<view class="font2">{{info.warn_no}}</view>
			</view>
			<view class="flex font">
				<view class="font1">破损位置:</view>
				<view class="font2">{{info.warn_area}}</view>
			</view>
			<view class="flex font">
				<view class="font1">监测时间:</view>
				<view class="font2">{{info.create_time}}</view>
			</view>
			<view class="flex font">
				<view class="font1">处理状态:</view>
				<view class="font2" style="color: #F40250;" v-if="info.is_repair==0">未处理</view>
				<view class="font2" style="color: #F40250;" v-if="info.is_repair==1">已处理</view>
			</view>
			<view class="flex font">
				<view class="font1">报警时间:</view>
				<view class="font2">{{info.create_time}}</view>
			</view>
			<view class="flex font">
				<view class="font1">实景图片:</view>
				<view class="img">
					<image :src="picUrl+info.warn_photo"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	export default {
		data() {
			return {
				info: {},
				picUrl: ''
			}
		},
		onLoad(options) {
			var id = options.id;
			this.getInfo(id);
			this.picUrl = common.picUrl
		},
		methods: {
			getInfo(id) {
				var data = {
					page: 1,
					pageSize: 5,
					recordId: id,
				}
				var that = this;
				common.getData('/muqiang/invitation/getWarnList', data, (res) => {
					console.log(res);
					this.info = res.pageInfo.list[0];
				})
			}
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

	.img {
		width: 60%;
		height: 200upx;
		margin-top: 25upx;
	}

	.img image {
		width: 180upx;
		height: 180upx;
	}
</style>
