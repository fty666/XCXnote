<template>
	<view>
		<view class="font">为何帐号密码在后台可以登录成功，在手机应用中确提示密码错误?</view>
		<view class="font2">
			请不要在帐户密码中包含$-_.+!*()之外的特殊符号，因为许多第三方键盘键入的特殊符号，或者全角特殊符号并不能被手机系统辨识。
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

		}
	}
</script>

<style>
	.font {
		width: 85%;
		height: 160upx;
		font-size: 18px;
		font-family: SourceHanSansCN-Regular;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 70upx;
		margin: 50upx 50upx;
		border-bottom: 1px solid #ddd;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
	}

	.font2 {
		width: 90%;
		font-size: 15px;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 50upx;
		margin: 10upx 50upx;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
	}
</style>
