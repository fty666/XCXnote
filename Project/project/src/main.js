// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import common from '@/assets/js/common.js'
import VCharts from 'v-charts'

Vue.config.productionTip = false
import elxel from './assets/js/elxel'
Vue.use(elxel)

Vue.use(ElementUI)
Vue.use(common)
Vue.use(VCharts)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
