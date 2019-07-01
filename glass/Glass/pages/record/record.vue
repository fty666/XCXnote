<template>
	<view>
		<!-- 记录切换 -->
		<view class="cut flex">
			<view class="font font1" v-bind:class="[xia==1?'xia':'']" @click="worn">破损</view>
			<view class="font font2" v-bind:class="[xia==2?'xia':'']" @click="full">掷物</view>
		</view>
		<!-- 记录 -->
		<view v-for="item in record" :key='index'>
			<view class="flex record">
				<view class="recordFont"  @click="police">
					<view class="flex rFont">
						<view class="rimg">
							<image src="../../static/imgs/333.png" class="rimg" mode=""></image>
						</view>
						<view class="po">
							玻璃墙破损
						</view>
					</view>
					<view class="flex rFont2">
						<view class="number">编号：B-12</view>
						<view class="number2">报警电话：06-24 10:30</view>
					</view>
				</view>
				<view class="dispose"  @click="goInfo">
					<view class="dfont">
						待处理
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
				record: [1, 2, 3, 4, 5],
				xia: 1
			}
		},
		methods: {
			// 底部下划线
			worn() {
				this.xia = 1;
			},
			full() {
				this.xia = 2;
			},
			// 跳转已完成详情
			goInfo() {
				uni.navigateTo({
					url: '../service/service'
				})
			},
			// 跳转报警详情
			police() {
				uni.navigateTo({
					url: '../police/police'
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
		/* background: linear-gradient(0deg, rgba(13, 123, 253, 1), rgba(87, 196, 255, 1)); */
		/* border-radius: 4px; */
	}

	/* 记录 */
	.record {
		margin: 25upx 30upx;
		background: #FFFFFF;
		width: 92%;
		height: 200upx;
		border-radius: 10upx;
	}

	/* 记录破损 */
	.recordFont {
		width: 75%;
	}

	.rFont {
		width: 100%;
		height: 80upx;
		margin: 15upx 15upx;
	}

	.rimg {
		width: 40upx;
		height: 40upx;
	}

	.po {
		font-size: 15px;
		font-weight: 400;
		line-height: 50upx;
		margin-left: 10upx;
	}

	.rFont2 {
		width: 100%;
		height: 80upx;
		margin: 15upx 15upx;
	}

	.number {
		width: 30%;
		height: 23px;
		font-size: 13px;
		font-weight: 400;
		color: rgba(139, 138, 154, 1);
		margin-left: 40upx;
	}

	.number2 {
		width: 60%;
		height: 23px;
		font-size: 13px;
		font-weight: 400;
		color: rgba(139, 138, 154, 1);
		margin-left: 10upx;
	}

	/* 待处理 */
	.dispose {
		width: 25%;
		height: 100%;
	}

	.dfont {
		height: 50upx;
		margin: 60upx 10upx;
		border: 1px solid red;
		border-radius: 35upx;
		font-size: 15px;
		text-align: center;
		color: #F3003F;
	}
</style>
