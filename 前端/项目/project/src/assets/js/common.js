import axios from 'axios'
import {post, fetch, patch, put} from './http.js'

export default {
  install(Vue,options){
  //请求数据
    Vue.prototype._getData = function (url, option, callback, hedas) {
      if (hedas == undefined) {
        hedas = {}
      }
      post(this.urls + url, option, hedas).then(resp => {
        if (resp.state == 1) {
          if (resp.data == undefined) {
            callback(resp);
          } else {
            if (url == "/v1/admin/admin/signIn") {
              callback(resp);
            } else {
              callback(resp.data);
            }
          }
        } else {
          Vue.prototype.$message({
            message: resp.message,
            type: 'warning'
          });
        }
      }, error => {
        Vue.prototype.$message({
          message: '服务器繁忙，请稍后再试',
          type: 'error'
        });
      })
    }
  //  请求路由
    Vue.prototype.urls = "https://www.zuoancellar.com/"
  //  上传图片阿里服务器配置
    Vue.prototype.$ali = {                                             //阿里云OSS key参数(上传文件和图片需要的)
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI8ygujYgDvLJ9',
      accessKeySecret: 'nLrO1bpn9IOpEu0tt0zyAaChc22j0c',
      bucket: 'jiaoyuvideo'
    }
    //图片的阿里地址
    Vue.prototype.imggerUrl = "http://jiaoyuvideo.oss-cn-beijing.aliyuncs.com/"
  }
}
