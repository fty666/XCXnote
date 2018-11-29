import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
// 商品列表
import commodityList from '@/components/commodity/commodityList'
// 分类列表
import classificationList from '@/components/classification/classificationList'
// 订单列表
import orderList from '@/components/order/orderList'
//待接单
import waitingList from '@/components/waiting/waitingList'
// 优惠券列表
import couponsList from '@/components/coupons/couponsList'
//评论列表
import evaluationList from '@/components/evaluation/evaluationList'
// 满减列表
import reductionList from '@/components/reduction/reductionList'
import merchantsList from '@/components/merchants/merchants'
import withdrawal from '@/components/withdrawal/withdrawal'
import bankCard from '@/components/bankCard/bankCardList'

Vue.use(Router)

const router =  new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: login
    // },
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/commodity',
      name: 'commodity',
      component: index,
      children: [
        { //商品列表
          path: '/commodity/commodityList',
          name: 'commodityList',
          component: commodityList
        },
        //分类列表
        {
          path: '/classification',
          name: 'classificationList',
          component: classificationList
        },
        // 订单列表
        {
          path: '/order',
          name: 'orderList',
          component: orderList
        },
        // 待接单列表
        {
          path: '/waitingList',
          name: 'waitingList',
          component: waitingList
        },
        // 满减列表  reductionList
        {
          path: '/reductionList',
          name: 'reductionList',
          component: reductionList
        },
        //优惠券列表
        {
          path: '/couponsList',
          name: 'couponsList',
          component: couponsList
        },
        //评论列表
        {
          path: '/evaluationList',
          name: 'evaluationList',
          component: evaluationList
        },
        //店铺信息
        {
          path: '/merchantsList',
          name: 'merchantsList',
          component: merchantsList
        },
        //银行卡提现
        {
          path: '/withdrawal',
          name: 'withdrawal',
          component: withdrawal
        },
        // 银行卡列表 bankCard
        {
          path: '/bankCard',
          name: 'bankCard',
          component: bankCard
        }
      ]
    }

  ]
})
// // 全局路由守卫
// router.beforeEach((to, from, next) => {
//
//   // to: Route: 即将要进入的目标 路由对象
//   // from: Route: 当前导航正要离开的路由
//   // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
//
//   const nextRoute = ['index'];
//   let isLogin = sessionStorage.getItem('id');  // 是否登录
//   // 未登录状态；当路由到nextRoute指定页时，跳转至login
//   if (nextRoute.indexOf(to.name) >= 0) {
//     console.log(isLogin)
//     if (isLogin === null) {
//       router.push({ name: 'login' });
//       return false;
//     }
//   }
//   next();
// });

export default router;

