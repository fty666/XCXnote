<template>
	<view>
		<view class="title">登录</view>
		<view class="phone">
			<input type="text" placeholder="请输入手机号码" @blur="phone" />
		</view>
		<view class="number">
			<input type="password" placeholder="请输入密码" @blur="code" />
		</view>
		<view class="out" @click="goLogin()">
			登录
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	export default {
		data() {
			return {
				phones: '',
				codes: ''
			}
		},
		onLoad(options) {
			var names = uni.getStorageSync('data');
			if (names != '') {
				uni.switchTab({
					url: '../index/index'
				})
			}
		},
		methods: {
			// 获取input值
			phone(e) {
				var mobile = e.detail.value;
				this.phones = mobile;
			},
			code(e) {
				var yzm = e.detail.value;
				this.codes = yzm;
			},
			goLogin() {
				// if (common.regular(1, this.phones) == false) {
				// 	uni.showToast({
				// 		title: '手机号输入有误',
				// 		icon: 'none'
				// 	})
				// 	return false;
				// }
				var that = this;
				var data = {
					account: that.phones,
					password: that.codes
				}
				common.getData('/muqiang/invitation/userLogin', data, (res) => {
					if (res.state == 0) {
						uni.showToast({
							title: '账号或密码输入有误',
							icon: 'none'
						})
					} else{
						uni.setStorageSync('data', res.name);
						uni.setStorageSync('mobile', res.mobile);
						uni.setStorageSync('status', res.roles);
						uni.switchTab({
							url: '../index/index'
						})
					}
				})
			}
		}
	}
</script>

<style>
	body {
		background: #FFFFFF;
	}

	.title {
		width: 50%;
		height: 100upx;
		font-size: 20px;
		font-family: SourceHanSansCN-Bold;
		font-weight: bold;
		color: rgba(62, 61, 103, 1);
		margin: 80upx 80upx;
	}

	.flex {
		display: flex;
	}

	.phone {
		width: 80%;
		height: 50upx;
		margin: 20upx 80upx;
		border-bottom: 1px solid #DFDFDD;
		font-size: 15px;
	}

	.number {
		width: 80%;
		height: 50upx;
		margin: 80upx 80upx;
		font-size: 15px;
		border-bottom: 1px solid #DFDFDD;
	}

	.yzm {
		width: 150upx;
		height: 80upx;
		margin-top: 30upx;
	}

	.out {
		width: 85%;
		height: 100upx;
		background: linear-gradient(0deg, rgba(13, 123, 253, 1) 0%, rgba(88, 197, 255, 1) 100%);
		border-radius: 30px;
		font-size: 16px;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		line-height: 100upx;
		text-align: center;
		margin-top: 350upx;
		margin-left: 60upx;
	}
</style>
