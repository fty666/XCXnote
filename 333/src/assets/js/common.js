import axios from 'axios'
import {post, fetch, patch, put} from './http.js'

export default {
  install(Vue, options) {
    Vue.prototype.url = "http://39.107.70.80:8080/",
      // Vue.prototype.url= "http://192.168.3.65:8080/org.zsl.hnust/",
      // Vue.prototype.url1= "192.168.3.116:8080/",

      Vue.prototype.imggerUrl = "http://jiaoyuvideo.oss-cn-beijing.aliyuncs.com/"
    //请求接口的
    Vue.prototype._getData = function (url, option, callback) {
      post("http://39.107.70.80:8080/treasure1.0/" + url, option).then(resp => {
        if (resp.state == 1) {
          callback(resp.data);
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
  }
}
