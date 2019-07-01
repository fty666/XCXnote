<template>
	<view>
		<view class="text">
			<textarea @blur="detail" placeholder-class="font" placeholder="写下工作内容" />
			</view>
		<view class="add" @click="add()">保&nbsp;存</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adds:false
			}
		},
		methods: {
			detail(){},
			add(){
				var that=this;
				this.$emit('fatherFun',true)
			}
		}
	}
</script>

<style>
	page{
		background: #F8F8F8;
	}
	.text{
		width: 95%;
		height: 300upx;
		background: #FFFFFF;
		margin:20upx 20upx;
	}
	.font{
		width: 100%;
		font-size: 15px;
		margin-left: 30upx;
	}
</style>
