<template>
	<view>
		<view class="text">
			<textarea @blur="getwork" placeholder-class="font" maxlength='140' placeholder="写下工作内容" />
			</view>
		<view class="flex">
			<!-- 显示上传的图片 -->
			<view v-if="show==true" style="position: relative;">
					<!-- <icon type="clear" style="position: absolute;right: 0upx;top: 20upx;"></icon> -->
					<image :src="picUrl+imgs" class="img" @click="big" v-bind:id="picUrl+imgs"></image>
			</view>
			<view>
				<image :src="picUrl+'201907111036594800.png'" class="img" @click="addimg"></image>
			</view>
<!-- 			<view v-for="item in imgs" :key="index" v-if="imgs.length>0">
				<view style="position: relative;">
						<icon type="clear" style="position: absolute;right: 0upx;top: 20upx;" @click="del" v-bind:id='item'></icon>
						<image :src="picUrl+item" class="img" @click="big" v-bind:id="picUrl+item"></image>
				</view>
			</view>
			<view v-if="imgs.length<3">
				<image :src="picUrl+'201907111036594800.png'" class="img" @click="addimg"></image>
			</view> -->
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
								// var imgs=that.imgs;
								// imgs.push(res.data.img);
								// that.imgs=imgs;
								that.imgs=res.data.img;
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
						// 删除图片
			del(e){
				var img=e.currentTarget.id;
				var arr=this.imgs;
				var that=this;
				var newArr=[];
				for(let i=0;i<arr.length;i++){
					if(img==arr[i]){}else{
						newArr.push(arr[i])
					}
				}
				that.imgs=newArr;
			},
			// 查看大图片
			big(e){
				var imgs=e.currentTarget.id;
				var arr=[];
				arr.push(imgs)
				uni.previewImage({
					current:imgs,
					urls: arr,
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
	.dels{
		position: absolute;
		top:5upx;
		right: 10upx;
		z-index: 99;
	}
</style>
