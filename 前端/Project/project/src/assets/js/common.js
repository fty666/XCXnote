import axios from 'axios'
import {post, fetch, patch, put} from './http.js'

export default {
  install(Vue, options) {
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
    //遍历对象
    Vue.prototype.circulation = function (val, callback) {
      var arr = [];
      for (let k in val) {
        arr[0] = val;
      }
      callback(arr);
    }
    //获取年月
    Vue.prototype.getTimes = function (val, callback) {
      var MyDate = new Date();
      var Gyear = '';
      var Gmonth = '';
      switch (val) {
        case 'Y':
          Gyear = MyDate.getFullYear();
          callback(Gyear)
          break;
        case 'M':
          Gyear = MyDate.getFullYear();
          Gmonth = MyDate.getMonth() + 1;
          callback(Gyear + '-' + Gmonth);
          break;
      }
    }
    //  请求路由
    //   Vue.prototype.urls = "http://192.168.3.146/redwin_app/public/index.php"
    //   Vue.prototype.urls = "http://192.168.3.146/redwin_app/public/index.php"
    Vue.prototype.urls = "http://39.106.52.121:8666"
    //  上传图片阿里服务器配置
    Vue.prototype.$ali = {                                             //阿里云OSS key参数(上传文件和图片需要的)
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI8ygujYgDvLJ9',
      accessKeySecret: 'nLrO1bpn9IOpEu0tt0zyAaChc22j0c',
      bucket: 'zuoanzac'
    }
    //图片的阿里地址
    // Vue.prototype.imggerUrl = "http://jiaoyuvideo.oss-cn-beijing.aliyuncs.com/"
    Vue.prototype.imggerUrl = "https://zuoanzac.oss-cn-beijing.aliyuncs.com/"
    Vue.prototype.dataType = []
    //  选择背景颜色
    Vue.prototype.Tselect = function (flag) {
      this.yday = false;
      this.Qday = false;
      this.Tday = false;
      switch (flag) {
        case 1:
          this.yday = true;
          break;
        case 2:
          this.Qday = true;
          break;
        case 3:
          this.Tday = true;
          break;
      }
    }
  }
}
