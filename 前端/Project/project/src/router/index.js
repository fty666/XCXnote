import Vue from 'vue'
import Router from 'vue-router'

//页面路由
import login from '@/pages/login'
import index from '@/pages/index'
import list from '@/pages/list/index'

//首页
import home from '@/pages/home'


Vue.use(Router)


export default new Router({
  routes: [
    //登录页面
    {
      path: '/',
      name: 'login',
      component: login
    },
  //  后台页面
    {
      path:'/index',
      name:'index',
      component:index,
      children:[
        {
          //  首页
          path:'/home',
          name:'home',
          component:home
        },
        {
        //  列表
          path:'/list/index',
          name:'list',
          component:list
        }
      ],
    }
  ]
})
