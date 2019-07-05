import axios from 'axios'
import {post, get, patch, put} from './http.js'

export default {
  install(Vue, options) {
    Vue.uniapp = document.addEventListener('UniAppJSBridgeReady', function () {
      console.log(11111)
      var id= sessionStorage.getItem('id');
      console.log(id)
      uni.navigateTo({
        url: '../service/service?id='+id,
      });
      uni.postMessage({
        data: {
          action: 'postMessage',
          userInfo: {
            openId: '我是web端传过来的参数'
          }
        }
      });
      uni.navigateBack();
    }),
    // Vue.prototype.urls = "http://39.107.70.80:8080/treeAdmin/",
    Vue.prototype._url = "http://47.93.224.76:8080/treeAdmin/",
      Vue.prototype._http = {post, get, patch, put},                   //axiox封装请求函数
      Vue.prototype._ali = {                                             //阿里云OSS key参数
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAI8ygujYgDvLJ9',
        accessKeySecret: 'nLrO1bpn9IOpEu0tt0zyAaChc22j0c',
        bucket: 'back-green'
      },
      Vue.prototype._aliurl = 'https://back-green.oss-cn-beijing.aliyuncs.com/', //阿里云拼接路径
      Vue.prototype._ajax = function (url, option, callback) {
        post(Vue.prototype._url + url, option).then(resp => {
          if (resp.state == 1) {
            if (resp.data) {
              callback(resp.data);
            } else {
              callback(resp);
            }
          } else {
            Vue.prototype.$Message({
              text: resp.message,
              type: 'warn'
            })
          }
        }, error => {
          Vue.prototype.$Message({
            text: 'error!',
            type: 'error'
          })
        })
      },
      Vue.prototype._commaSplit = function (str, mark) {
        if (str === undefined) {
          return [];
        } else {
          let lastStr = str.charAt(str.length - 1);
          let arrStr = str.split(mark);
          if (lastStr === mark) {
            arrStr.pop();
          }
          return arrStr;
        }
      },
      Vue.prototype._joinArr = function (arr, key) {
        let str = ''
        if (typeof arr === 'object') {
          arr.forEach(item => {
            str += item[key] + ','
          })
        } else {
          console.warn('拆分数组--接受类型错误!')
        }
        return str;
      }
  }
}
