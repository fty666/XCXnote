import Vue from 'vue'
import Router from 'vue-router'

//页面路由
import login from '@/pages/login'
import index from '@/pages/index'
import list from '@/pages/list/index'

//首页
import home from '@/pages/home'

//商品管理
import shopList from '@/pages/shop/shopList'
import addShop from '@/pages/shop/addShop'
import shopClass from '@/pages/shop/shopClass'
import shopInfo from '@/pages/shop/shopInfo'

//会员
import member from '@/pages/member/member'
//会员信息
import memberInfo from '@/pages/member/memberInfo'
//加盟商管理
import join from '@/pages/join/join'
//添加加盟商
import addJoin from '@/pages/join/addJoin'
//加盟商库存
import joinStock from '@/pages/join/joinStock'
//加盟商订货
import joinOrder from '@/pages/join/joinOrder'
//编辑加盟商
import editJoin from '@/pages/join/editJoin'
//经销商列表
import dealerList from '@/pages/dealer/dealerList'
//查看经销商详情
import dealerInfo from '@/pages/dealer/dealerInfo'
//购入详情
import buyInfo from '@/pages/dealer/buyInfo'
//资质审核详情
import auditInfo from '@/pages/dealer/auditInfo'
//经销商审核
import dealerAudit from '@/pages/dealer/dealerAudit'
//经销商购入管理
import dealerManage from '@/pages/dealer/dealerManage'
//经销商回购管理
import dealerBuy from '@/pages/dealer/dealerBuy'
//订单管理
import orderList from '@/pages/order/orderList'
//订单信息
import orderInfo from '@/pages/order/orderInfo'
//退款信息
import RefundInfo from '@/pages/order/RefundInfo'
//配货管理
import orderManage from '@/pages/order/orderManage'
//退款管理
import orderRefund from '@/pages/order/orderRefund'
//积分兑换
import integralConvert from '@/pages/integral/integralConvert'
//添加积分商品
import addIntehral from '@/pages/integral/addIntehral'
//领取积分订单
import getIntegral from '@/pages/integral/getIntegral'
//已兑换积分订单
import getConversion from '@/pages/integral/getConversion'
//积分统计
import integralStat from '@/pages/integral/integralStat'
//仓库总览
import warehouseList from '@/pages/warehouse/warehouseList'
//仓库管理
import warehouseManage from '@/pages/warehouse/warehouseManage'
//入库管理
import ruBank from '@/pages/warehouse/ruBank'
//仓库编辑
import editWare from '@/pages/warehouse/editWare'
//库存
import inventoryInfo from '@/pages/warehouse/inventoryInfo'
//内容管理
import contentManage from '@/pages/content/contentManage'
//橱窗商品管理
import shopManage from '@/pages/content/shopManage'
//热门搜索管理
import searchManage from '@/pages/content/searchManage'
//规则提示弹窗管理
import contentRule from '@/pages/content/contentRule'
//反馈设置
import feedbackAdd from '@/pages/feedback/feedbackAdd'
//用户反馈查看
import feedbackUser from '@/pages/feedback/feedbackUser'
//平台营业额统计
import financeList from '@/pages/finance/financeList'
//加盟商业绩统计
import performance from '@/pages/finance/performance'
//提现记录
import withdraw from '@/pages/finance/withdraw'
//交易统计
import dealerStat from '@/pages/stat/dealStat'
//酒品统计
import wineStat from '@/pages/stat/wineStat'
//权限管理
import power from '@/pages/power/power'
//添加账号
import addPower from '@/pages/power/addPower'
//修改账号
import editPower from '@/pages/power/editPower'


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
          path:'/list/index',
          name:'list',
          component:list
        },
        {
        //  商品列表
          path:'/shop/shopList',
          name:'shopList',
          component:shopList
        },
        {
          //添加商品
          path:'/shop/addShop',
          name:'addShop',
          component:addShop
        },
        {
          //商品分类
          path:'/shop/shopClass',
          name:'shopClass',
          component:shopClass
        },
        //商品详情
        {
          path:'/shop/shopInfo',
          name:'shopInfo',
          component:shopInfo
        },
        {
        //  会员列表
          path:'/member/member',
          name:'member',
          component:member
        },
        {
          //  会员信息
          path:'/member/memberInfo',
          name:'memberInfo',
          component:memberInfo
        },
        //加盟商列表
        {
          path:'/join/join',
          name:'join',
          component:join
        },
        //添加加盟商
        {
          path:'/join/addJoin',
          name:'addJoin',
          component:addJoin
        },
      //  编辑加盟商
        {
          path:'/join/editJoin',
          name:'editJoin',
          component:editJoin
        },
      //  加盟商库存
        {
          path:'/join/joinStock',
          name:'joinStock',
          component:joinStock
        },
      //  加盟商订货
        {
          path:'/join/joinOrder',
          name:'joinOrder',
          component:joinOrder
        },
      //  经销商列表
        {
          path:'/dealer/dealerList',
          name:'dealerList',
          component:dealerList
        },
      //  经销商详情
        {
          path:'/dealer/dealerInfo',
          name:'dealerInfo',
          component:dealerInfo
        },
      //  资质审核
        {
          path:'/dealer/auditInfo',
          name:'auditInfo',
          component:auditInfo
        },
      //  购入详情,订单
        {
          path:'/dealer/buyInfo',
          name:'buyInfo',
          component:buyInfo
        },
      //  经销商审核
        {
          path:'/dealer/dealerAudit',
          name:'dealerAudit',
          component:dealerAudit
        },
      //  经销商购入管理
        {
          path:'/dealer/dealerManage',
          name:'dealerManage',
          component:dealerManage
        },
      //  回购管理
        {
          path:'/dealer/dealerBuy',
          name:'dealerBuy',
          component:dealerBuy
        },
      //  订单管理
        {
          path:'/order/orderList',
          name:'orderList',
          component:orderList
        },
      //  订单信息
        {
          path:'/order/orderInfo',
          name:'orderInfo',
          component:orderInfo
        },
      //  配货管理
        {
          path:'/order/orderManage',
          name:'orderManage',
          component:orderManage
        },
      //退款处理
        {
          path:'/order/orderRefund',
          name:'orderRefund',
          component:orderRefund
        },
      //  退款信息
        {
          path:'/order/RefundInfo',
          name:'RefundInfo',
          component:RefundInfo
        },
      //  积分兑换设置
        {
          path:'/integral/integralConvert',
          name:'integralConvert',
          component:integralConvert
        },
      //  领取积分订单
        {
          path:'/integral/getIntegral',
          name:'getIntegral',
          component:getIntegral
        },
      //  添加积分商品
        {
          path:'/integral/addIntehral',
          name:'addIntehral',
          component:addIntehral
        },
      //  兑换积分订单
        {
          path:'/integral/getConversion',
          name:'getConversion',
          component:getConversion
        },
      //  积分统计
        {
          path:'/integral/integralStat',
          name:'integralStat',
          component:integralStat
        },
      //  仓库总览
        {
          path:'/warehouse/warehouseList',
          name:'warehouseList',
          component:warehouseList
        },
        //入库管理
        {
          path:'/warehouse/ruBank',
          name:'ruBank',
          component:ruBank
        },
      //  仓库管理
        {
          path:'/warehouse/warehouseManage',
          name:'warehouseManage',
          component:warehouseManage
        },
      //  仓库编辑
        {
          path:'/warehouse/editWare',
          name:'editWare',
          component:editWare
        },
      //  库存
        {
          path:'/warehouse/inventoryInfo',
          name:'inventoryInfo',
          component:inventoryInfo
        },
      //  内容管理
        {
          path:'/content/contentManage',
          name:'contentManage',
          component:contentManage
        },
      //  橱窗商品管理
        {
          path:'/content/shopManage',
          name:'shopManage',
          component:shopManage
        },
      //  热门搜索管理
        {
          path:'/content/searchManage',
          name:'searchManage',
          component:searchManage
        },
      //  规则提示弹窗管理
        {
          path:'/content/contentRule',
          name:'contentRule',
          component:contentRule
        },
      //  反馈设置
        {
          path:'/feedback/feedbackAdd',
          name:'feedbackAdd',
          component:feedbackAdd
        },
      //  用户反馈查看
        {
          path:'/feedback/feedbackUser',
          name:'feedbackUser',
          component:feedbackUser
        },
      //  平台营业额统计
        {
          path:'/finance/financeList',
          name:'financeList',
          component:financeList
        },
      //  加盟商业绩统计
        {
          path:'/finance/performance',
          name:'performance',
          component:performance
        },
      //  提现记录
        {
          path:'/finance/withdraw',
          name:'withdraw',
          component:withdraw
        },
      //  交易统计
        {
          path:'/stat/dealStat',
          name:'dealerStat',
          component:dealerStat
        },
      //  酒品统计
        {
          path:'/stat/wineStat',
          name:'wineStat',
          component:wineStat
        },
      //  权限管理
        {
          path:'/power/power',
          name:'power',
          component:power
        },
      //  添加账号
        {
          path:'/power/addPower',
          name:'addPower',
          component:addPower
        },
        //  修改账号
        {
          path:'/power/editPower',
          name:'editPower',
          component:editPower
        },
      ],
    }
  ]
})
