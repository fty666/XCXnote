<template>
	<view style="width: 100%;height: 100%;">
		<scroll-view scroll-y="true" style="width:100%;height: 100%;" @scrolltolower="lower">
			<view v-for="item in monitor" :key='index'>
				<view class="head1">
					<view class="title">{{item.repairTime}}</view>
					<view class="flex font">
						<view class="font1">工作人员:</view>
						<view class="font2">{{item.repair_man}}</view>
					</view>
					<view class="flex font">
						<view class="font1">维修区域:</view>
						<view class="font2">{{item.warn_area}}</view>
					</view>
					<view class="flex font">
						<view class="font1">工作内容:</view>
						<view class="font2" v-if="item.warn_type==1">玻璃幕墙破损</view>
						<view class="font2" v-if="item.warn_type==2">高空抛物</view>
					</view>
					<view class="flex font">
						<view class="font1">工作状态:</view>
						<view class="font2" style="color: #1769FF;">已完成</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	export default {
		data() {
			return {
				page: 1,
				pageSize: 10,
				monitor: []
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				var repairMan = uni.getStorageSync('data');
				var that = this;
				var data = {
					page: that.page,
					pageSize: that.pageSize,
					repairMan: repairMan
				}
				common.getData('/muqiang/invitation/getRepairRecord', data, (res) => {
					// console.log(res)
					that.monitor = res.pageInfo.list;
				})
			},
			// 滚动加载
			lower(){
				var that=this;
				var pageSize=that.pageSize;
				pageSize=pageSize+10;
				that.pageSize=pageSize;
				that.getList();
			}
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
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
