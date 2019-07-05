<template>
	<view>
		<!-- 记录切换 -->
		<view class="cut flex">
			<view class="font font1" v-bind:class="[xia==1?'xia':'']" @click="worn">破损</view>
			<view class="font font2" v-bind:class="[xia==2?'xia':'']" @click="full">掷物</view>
		</view>
		<!-- 记录 -->
		<view style="width: 100%;height: 1120upx;">
			<scroll-view scroll-y="true" style="width:100%;height: 100%;" @scrolltolower="lower">
				<view v-for="item in record" :key='index'>
					<view class="flex record">
						<view class="recordFont">
							<view class="flex rFont">
								<view class="rimg">
									<image src="../../static/imgs/posun@2x.png" class="rimg" mode=""></image>
								</view>
								<view class="po">
									玻璃幕墙破损
								</view>
							</view>
							<view class="flex rFont2">
								<view class="number">编号：{{item.warn_no}}</view>
								<view class="number2">报警时间：{{item.create_time}}</view>
							</view>
						</view>
						<view class="dispose" @click="goInfo" v-if="item.is_repair==0" v-bind:id="item.recordId">
							<view class="dfont">
							待处理
							</view>
						</view>
						<view class="dispose" @click="goInfo" v-if="item.is_repair==1" v-bind:id="item.recordId">
							<view class="dfont2">
								已完成
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	export default {
		data() {
			return {
				record: [],
				xia: 1,
				page: 1,
				pageSize: 10,
				warnType: 1
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			// 获取报警记录
			getList() {
				var data = {
					page: this.page,
					pageSize: this.pageSize,
					isCheck: 1,
					warnType: this.warnType,
				}
				var that = this;
				common.getData('/muqiang/invitation/getWarnList', data, (res) => {
					this.record = res.pageInfo.list;
				})
			},
			// 下拉滑动
			lower() {
				var pageSize = this.pageSize;
				pageSize = pageSize + 10;
				this.pageSize = pageSize;
				this.getList();
			},
			// 底部下划线
			worn() {
				this.xia = 1;
				this.warnType = 1;
				this.getList();
			},
			full() {
				this.xia = 2;
				this.warnType = 2;
				this.getList();
			},
			// 跳转已完成详情
			goInfo(e) {
				var id = e.currentTarget.id;
				uni.navigateTo({
					url: '../service/service?id='+id
				})
			},
			// 跳转报警详情
			police(e) {
				var id = e.currentTarget.id;
				uni.navigateTo({
					url: '../police/police?id='+id
				})
			}
		}
	}
</script>

<style>
	.flex {
		display: flex;
	}

	.cut {
		width: 100%;
		height: 100upx;
		background: #FFFFFF;
	}

	.font {
		font-size: 17px;
		font-weight: 500;
		color: rgba(11, 12, 60, 1);
		line-height: 50px;
		width: 100upx;
		height: 80upx;
		text-align: center;
	}

	.font1 {
		margin-left: 250upx;
	}

	.font2 {
		margin-left: 70upx;
	}

	.xia {
		border-bottom: 2upx solid #0D7BFD;
	}

	/* 记录 */
	.record {
		margin-top: 25upx;
		margin-left: 10upx;
		background: #FFFFFF;
		width: 94%;
		height: 200upx;
		border-radius: 10upx;
	}

	/* 记录破损 */
	.recordFont {
		width: 85%;
	}

	.rFont {
		width: 100%;
		height: 80upx;
		margin-top: 30upx; 
		margin-left: 15upx;
	}

	.rimg {
		width: 30upx;
		height: 40upx;
		margin-top: 10upx;
	}

	.po {
		font-size: 15px;
		font-weight: 400;
		line-height: 80upx;
		margin-left: 15upx;
	}

	.rFont2 {
		width: 100%;
		height: 80upx;
		margin: 15upx 15upx;
	}

	.number {
		width: 30%;
		height: 23px;
		font-size: 12px;
		font-weight: 400;
		color: rgba(139, 138, 154, 1);
		margin-left: 40upx;
	}

	.number2 {
		width: 65%;
		height: 23px;
		font-size: 11px;
		font-weight: 400;
		color: rgba(139, 138, 154, 1);
		margin-left: 10upx;
	}

	/* 待处理 */
	.dispose {
		width: 18%;
		height: 100%;
	}

	.dfont {
		height: 50upx;
		margin-top: 60upx;
		margin-left: 20upx;
		border: 1px solid red;
		border-radius: 35upx;
		font-size: 11px;
		text-align: center;
		color: #F3003F;
		line-height: 50upx;
	}

	.dfont2 {
		height: 50upx;
		margin-top: 60upx;
		margin-left: 20upx;
		border-radius: 35upx;
		font-size: 11px;
		text-align: center;
		color: #F8F8F8;
		line-height: 50upx;
		background: linear-gradient(0deg, rgba(13, 123, 253, 1) 0%, rgba(88, 197, 255, 1) 100%);
		box-shadow: 0px 3px 6px 0px rgba(2, 99, 215, 0.3);
	}
</style>
