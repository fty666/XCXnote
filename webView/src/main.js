// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import CommonJs from './assets/js/common.js'
import './assets/css/public.css'
import './assets/css/table.css'
import './assets/css/geo.css'
import './assets/css/page.css'

import './assets/css/hey_ui.less';
import HeyUI from 'heyui';
Vue.config.productionTip = false

Vue.use(CommonJs)
Vue.use(HeyUI);
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})
