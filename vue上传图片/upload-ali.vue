<template>
	<div class="clearfix">
		<div
			v-for="(item, index) in fileArr"
			class="hj-upload f-l hj-show" :style="'width:'+imgWidth+'px;height:'+imgHeight+'px;'">
			<img :src="imggerUrl + item">
			<i class="el-icon-search hj-icon" @click="magnifier(item)"></i>
			<i class="el-icon-delete hj-icon" @click="remoFile(index)"></i>
		</div>
		<!-- 上传图片组件(阿里云) -->
		<div class="hj-upload f-l" v-if="fileArr.length != fileNumber" :style="'width:'+imgWidth+'px;height:'+imgHeight+'px;'">
			<!--<input
					multiple="multiple"
				type="file"
				class="hj-ipt"
				:style="'width:'+imgWidth+'px;height:'+imgHeight+'px;'"
				@change="uploadAli($event)"
				:accept="fileType">-->
			<input
					multiple="multiple"
				type="file"
				class="hj-ipt"
				:style="'width:'+imgWidth+'px;height:'+imgHeight+'px;'"
				@change="uploadAli($event)"
				accept="image/jpeg,image/jpg,image/png">
			<i class="el-icon-plus hj-load"></i>
		</div>
	</div> 
</template>

<script type="text/javascript">
	import OSS from 'ali-oss';
	import { Message } from 'element-ui';
	export default {
		name: 'UploadAli',
		data () {
			return {
				fileName: [],
				fileArr: [],
			}
		},
		created() {
			if (this.defaultImg !== "") {
				this.fileArr.push(this.defaultImg);
			}
		},
		watch: {
			fileArr (val, oldval) {
				this.$emit('getUrl', val);
			},
			defaultImg(val, oldval) {
				console.log(this.fileArr);
				this.fileArr = [];
				if (this.defaultImg !== '') {
            		this.fileArr.push(this.defaultImg);
        		}
			}
		},
		methods: {
			clearUrl () {
				this.fileArr = [];
			},
			remoFile (index) {
				this.fileArr.splice(index, 1);
				this.fileName.splice(index, 1);
				// this.fileArr = [];
				// this.fileName = [];
                //禁止点击上传取消
                this.upSee = true;
			},
			imgError (e) {                             //图片加载失败函数;
				e.target.src = '../../assets/logo.png';
			},
			magnifier (url) {                          //查看大图函数;
			const h = this.$createElement;
				this.$msgbox({
					title: '图片查看',
					message: h('img', {
						attrs: {
							src: this.imggerUrl + url
						},
						style: {
							width: '100%'
						},
						on: {
							error (e) {
								e.target.src = '../../assets/logo.png'
							}
						}
					})
		        }).catch(action => {
		            this.$message({
		              type: 'info',
		              message: '停留在当前页面'
		            })
		          });
			},
			uploadAli (event) {
			    console.log(555)
                //

			    //上传至阿里云OSS函数
				const _this = this;
				const file = event.srcElement.files[0];
				if (file == undefined) {return;}
				/*if (_this.fileName.indexOf(file.name) >= 0) {   //检测图片是否上传过,如果长传过提示并退出;
					// _this.$message({
     //                    message: '你好像上传过这张图片了!',
     //                    type: 'warning'
     //                });
     				Message.warning({message: '你已经上传过这张图片了!'})
                    return;
				}*/
				//创建名称
				_this.fileName.push(file.name);
				let file_suffix = file.name.substr(file.name.lastIndexOf("."));
				////限制火狐浏览器————上传图片限制
                let suffix = ['.jpeg','.jpg','.png','.PNG','.JPG','JPEG','.gif'];
				console.log(file_suffix)
				if(suffix.indexOf(file_suffix)<0){
                   /* this.$notify.error({
                        title: '警告',
                        message: '上传文件格式不正确',
                        position: 'bottom-right',
                    });*/
                    Message.error({message: '上传文件格式不正确!'})
				    return;
				}
				//
				let file_name = (Date.parse(new Date()) / 1000) + file_suffix;
				const client = new OSS.Wrapper(this.$ali);
				client.multipartUpload(file_name, file, {
					progress: function* (p) {
    				  console.log('Progress: ' + p);
    				}
				}).then(function (result) {
                    Message.success({message: '上传成功!'});
                    _this.fileArr.push(result.name);
                }).catch(function (err) {
                    Message.error({message: '上传失败!'});
                });
			}
		},
		props: {
			fileType: {
				type: String,
				default () {
					return 'image/jpg,image/png,image/gif,image/jpeg'
				}
			},
			fileNumber: {
				type: Number,
				default () {
					return 1;
				}
			},
			defaultImg: {
				type: String,
				default() {
					return "";
				}
			},
			imgWidth: {
				type: Number,
				default() {
					return 170;
				}
			},
			imgHeight: {
				type: Number,
				default() {
					return 105;
				}
			}
		}
	}
</script>

<style type="text/css" scoped>
	.clearfix::after{
		content: ".";
        clear: both;
        display: block;
        overflow: hidden;
        font-size: 0;
        height: 0;
	}
	.f-l{
		float: left;
	}
	.hj-upload{
		width: 175px;
		height: 105px;
		// border: 1px dashed #8c939d;
		border-radius: 6px;
		position: relative;
		display: flex;
		align-items: center;
		overflow: hidden;
	}
	.hj-upload>img{
		height: 100%;
		width: 100%;
		position: absolute;
	}
	.hj-load{
		color: #8c939d;
		font-weight: 700;
		width: 60px;
		height: 60px;
		font-size: 60px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -30px;
		margin-top: -30px;
	}
	.hj-upload:hover{
		// border-style: solid;
	}
	.hj-ipt{
		position: absolute;
		width: 175px;
		height: 105px;
		z-index: 999;
		opacity: 0;
	}
	.hj-icon{
		color: #000;
		margin-left: 16px;
		font-size: 22px;
		display: none;
		position: relative;
		left: 37px;
		top: 0;
		z-index: 999;
	}
	.hj-show:hover .hj-icon{
		display: block;
	}
</style>