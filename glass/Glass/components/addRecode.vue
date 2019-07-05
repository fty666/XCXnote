<template>
	<view>
		<view class="text">
			<textarea @blur="getwork" placeholder-class="font" maxlength='140' placeholder="写下工作内容" />
			</view>
		<view class="flex">
			<!-- 显示上传的图片 -->
			<view v-if="show==true">
				<image :src="picUrl+imgs" class="img"></image>
			</view>
			<view style="background: #F8F8F8;">
				<image src="../static/imgs/img.png" class="img" @click="addimg"></image>
			</view>
		</view>
		<view class="add" @click="add()">保&nbsp;存</view>
	</view>
</template>

<script>
	import common from '../common/common.js'
	export default {
		data() {
			return {
				adds:false,
				work:'',
				show:'false',
				imgs:'',
				warNno:this.warnno,
				picUrl:''
			}
		},
		mounted() {
			this.picUrl=common.picUrl;
		},
		props: {
			warnno:{
				type:String,
				default() {
						return {
						}
					}
			}
		},
		methods: {
			// 获取工作内容
			getwork(e){
				this.work=e.detail.value;
			},
			// 上传图片
			addimg(){
				var that=this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: function(res) {
						// console.log(res.tempFilePaths[0])
						let files = res.tempFilePaths[0];
						console.log(files)
						uni.uploadFile({
							url: 'http://39.106.155.211:8080/muqiang/invitation/UploadFiles',
							filePath: files, //将小程序返回的路径上传给服务器
							name: 'file',
							formData: {
								'user': 'test'
							},
							success(res) {
								var res =JSON.parse(res.data);
								that.imgs=res.data.img
								that.show=true;
							},
							fail(res){
								uni.showToast({
									title:'上传失败',
									icon:'none'
								})
							}
						})
					}
				});
			},
			// 子传父值
			add(){
				var repairMan=uni.getStorageSync('data');
				var data={
					repairMan:repairMan,
					warnNo:this.warNno,
					repairReason1:this.work,
					repairPhoto1:this.imgs
				}
				common.getData('/muqiang/invitation/addRepairRecord', data, (res) => {
					if(res.state==1){
						this.$emit('fatherFun',true)
					}else{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}
				})
				
			}
		}
	}
</script>

<style>
	page{
		background: #F8F8F8;
	}
	.flex{
		display: flex;
	}
	.text{
		width: 95%;
		height: 300upx;
		font-size: 13px;
		background: #FFFFFF;
		margin:20upx 20upx;
		line-height: 5upx;
	}
	.font{
		width: 100%;
		font-size: 13px;
		margin-left: 30upx;
	}
	.img{
		width: 160upx;
		height: 160upx;
		margin-top: 20upx;
		margin-left:50upx;
	}
</style>
