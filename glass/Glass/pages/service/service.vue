<template>
	<view>
		<view v-if="add==true">
			<!-- 维修详情 -->
			<view class="service flex">
				<view class="font">
					<view class="po">玻璃幕墙破损</view>
					<view class="call flex">
						<view class="title">报警时间:</view>
						<view class="time">{{info.create_time}}</view>
					</view>
					<view class="call flex">
						<view class="title">维修地点:</view>
						<view class="time">{{info.warn_area}}</view>
					</view>
				</view>
				<!-- 图片 -->
				<view style="width: 200upx;height: 200upx;">
					<image :src="picUrl+info.warn_photo" class="mImg"></image>
				</view>
			</view>
			<!-- 补充 -->
			<view class="replenish">
				<scroll-view scroll-y="true" style="width:100%;height: 100%;" @scrolltolower="lower">
					<view class="bodys" v-for="item in replenish" :key='index'>
						<view class="times flex">
							<view class="refont">维修时间:</view>
							<view class="cause">{{item.create_time}}</view>
						</view>
						<view class="times flex">
							<view class="refont">工作内容:</view>
							<view class="cause">
								<view class="casuFont">
									{{item.repair_reason1}}
								</view>
								<view class="caImg">
									<image :src="picUrl+item.repair_photo1" @click="big" v-bind:id="picUrl+item.repair_photo1"></image>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>

			</view>
			<!-- 添加内容 -->
			<view class="add" @click="adds">
				添&nbsp;加
			</view>
		</view>
		<!-- 添加内容 -->
		<view v-else>
			<addrecode v-on:fatherFun='save' :warnno='info.warn_no'></addrecode>
		</view>
	</view>
</template>

<script>
	import addrecode from '../../components/addRecode.vue'
	import common from '../../common/common.js'
	export default {
		data() {
			return {
				add: true,
				id: '', //警告id
				info: {}, //已完成详情
				replenish: [], //添加补充
				warnNo: '', //报警编号
				picUrl: '',
				page: 1,
				pageSize: 10,
			}
		},
		components: {
			addrecode
		},
		onLoad(options) {
			var id = options.id;
			this.id = id;
			var status = uni.getStorageSync('status');
			if (status == 2) {
				uni.redirectTo({
					url: '../police/police?id=' + id
				})
			}
			this.picUrl = common.picUrl;
			this.getInfo(id);
		},
		methods: {
			// 获取已完成信息
			getInfo(id) {
				var data = {
					page: 1,
					pageSize: 1,
					recordId: id,
				}
				var that = this;
				common.getData('/muqiang/invitation/getWarnList', data, (res) => {
					that.info = res.pageInfo.list[0];
					var warnNo = res.pageInfo.list[0].warn_no;
					that.warnNo = warnNo;
					that.getAdd(warnNo)
				})
			},
			getAdd(warnNo) {
				var that = this;
				var data = {
					page: 1,
					pageSize: that.pageSize,
					warnNo: warnNo,
				}
				var that = this;
				common.getData('/muqiang/invitation/getDetailRepairList', data, (res) => {
					this.replenish = res.pageInfo.list;
					// console.log(res)
				})
			},
			// 查看大图片
			big(e) {
				console.log(e.currentTarget.id)
				var imgs = e.currentTarget.id;
				var arr = [];
				arr.push(imgs)
				uni.previewImage({
					current: imgs,
					urls: arr,
				});
			},
			// 下拉加载补充
			lower() {
				var that = this;
				var pageSize = that.pageSize;
				pageSize = pageSize + 10;
				that.pageSize = pageSize;
				var warnNo = that.warnNo;
				that.getAdd(warnNo);
			},
			// 添加按钮
			adds() {
				this.add = false;
			},
			// 子组件传递过来
			save(e) {
				var id = this.id;
				this.getInfo(id)
				this.add = e;
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
		margin: 50upx 0upx;
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
		/* position: fixed; */
		/* bottom: 70upx; */
		margin-top: 55upx;
	}

	.replenish {
		width: 90%;
		height: 685upx;
		background: #FFFFFF;
		margin-top: 40upx;
		margin-left: 40upx;
		border-radius: 12upx;
	}

	.bodys {
		width: 90%;
		height: 320upx;
		margin-top: 20upx;
		margin-left: 20upx;
		border: 1px solid #DCDCDC;
	}

	.times {
		width: 100%;
		margin-top: 10upx;
	}

	.refont {
		width: 20%;
		font-size: 12px;
		font-weight: 400;
		color: rgba(139, 138, 154, 1);
		line-height: 70upx;
		margin-left: 40upx;
	}

	.cause {
		width: 65%;
		margin-top: 15upx;
		font-size: 13px;
		font-family: SourceHanSansCN-Regular;
		font-weight: 400;
		color: rgba(62, 61, 103, 1);
	}

	.casuFont {
		width: 100%;
		font-size: 13px;
		font-family: SourceHanSansCN-Regular;
		font-weight: 400;
		color: rgba(62, 61, 103, 1);
		margin-top: 4upx;
		height: 100upx;
		/* line-height:27px; */
		overflow-y: auto;
		/* white-space: wrap; */
		word-break: break-all;
	}

	.caImg {
		width: 80upx;
		height: 80upx;
		margin-top: 10upx;
	}

	.caImg image {
		width: 80upx;
		height: 80upx;
	}
</style>
