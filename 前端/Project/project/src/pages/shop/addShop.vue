<template>
  <div class="body" style="text-align: left;">
    <div style="margin: 5% 12%;">
      <!--<h2>商品编号</h2>-->
      <el-form :inline="true" :model="goodsForm1" :rules="rules" ref="goodsForm1" label-width="100px">
        <el-form-item label="商品分类">
          <el-select v-model="yiji" placeholder="请选择商品分类" @change="getErji">
            <el-option label="洋酒" value="洋酒"></el-option>
            <el-option label="葡萄酒" value="葡萄酒"></el-option>
            <el-option label="红酒套装" value="红酒套装"></el-option>
            <el-option label="酒具周边" value="酒具周边"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="goodsForm1.goods_groupId" placeholder="请选择二级分类">
            <el-option v-for="(item, index) in erjiList" :label="item.name" :value="item.id"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="goodsForm1.goods_name" style="width:220px;" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品标签" prop="goods_label">
          <el-input v-model="goodsForm1.goods_label" style="width:220px;" placeholder="请输入商品分类"></el-input>
          <p style="line-height: 12px;font-size: 12px;color:#3c6bff;">使用逗号或空格分隔每个标签</p>
        </el-form-item>
      </el-form>
      <el-form v-if="yiji == '洋酒'" :inline="true" :model="goodsForm2" :rules="rules1" ref="goodsForm2"
               label-width="100px">
        <el-form-item label="酒品类型">
          <el-select v-model="goodsForm2.genre1" placeholder="请选择酒品类型">
            <el-option label="请选择" value="''"></el-option>
            <el-option label="白兰地" value="白兰地"></el-option>
            <el-option label="威士忌" value="威士忌"></el-option>
            <el-option label="朗姆酒" value="朗姆酒"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <!--<el-select v-model="goodsForm2.genre7" placeholder="品牌">-->
          <!--<el-option label="请选择" value="''"></el-option>-->
          <!--<el-option label="拿破仑" value="拿破仑"></el-option>-->
          <!--<el-option label="卡普" value="卡普"></el-option>-->
          <!--<el-option label="克雷德" value="克雷德"></el-option>-->
          <!--<el-option label="ArtGlass" value="ArtGlass"></el-option>-->
          <!--<el-option label="其他" value="其他"></el-option>-->
          <!--</el-select>-->
          <el-input v-model="goodsForm2.genre7" style="width:220px;" placeholder="请输入商品品牌"></el-input>
        </el-form-item>
        <el-form-item label="产地">
          <el-select v-model="goodsForm2.genre2" placeholder="产地">
            <el-option label="请选择" value="''"></el-option>
            <el-option label="法国" value="法国"></el-option>
            <el-option label="智利" value="智利"></el-option>
            <el-option label="南非" value="南非"></el-option>
            <el-option label="西班牙" value="西班牙"></el-option>
            <el-option label="德国" value="德国"></el-option>
            <el-option label="澳大利亚" value="澳大利亚"></el-option>
            <el-option label="加拿大" value="加拿大"></el-option>
            <el-option label="匈牙利" value="匈牙利"></el-option>
            <el-option label="葡萄牙" value="葡萄牙"></el-option>
            <el-option label="美国" value="美国"></el-option>
            <el-option label="意大利" value="意大利"></el-option>
            <el-option label="摩尔多瓦" value="摩尔多瓦"></el-option>
            <el-option label="格鲁吉亚" value="格鲁吉亚"></el-option>
            <el-option label="英国" value="英国"></el-option>
            <el-option label="乌克兰" value="乌克兰"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="genre5">
          <el-input placeholder="请输入内容" v-model="goodsForm2.genre5" style="width:220px;">
            <el-select v-model="select" style="width:80px;" slot="append" placeholder="请选择单位">
              <el-option label="ML" value="ML"></el-option>
              <el-option label="L" value="L"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
      </el-form>
      <el-form v-else-if="yiji == '葡萄酒'" :inline="true" :model="goodsForm3" :rules="rules2" ref="goodsForm3"
               label-width="100px">
        <el-form-item label="酒品类型">
          <el-select v-model="goodsForm3.genre1" placeholder="请选择酒品类型">
            <el-option label="请选择" value="''"></el-option>
            <el-option label="红葡萄酒" value="红葡萄酒"></el-option>
            <el-option label="白葡萄酒" value="白葡萄酒"></el-option>
            <el-option label="桃红葡萄酒" value="桃红葡萄酒"></el-option>
            <el-option label="起泡酒" value="起泡酒"></el-option>
            <el-option label="香槟" value="香槟"></el-option>
            <el-option label="冰酒" value="冰酒"></el-option>
            <el-option label="贵腐" value="贵腐"></el-option>
            <el-option label="甜酒" value="甜酒"></el-option>
            <el-option label="果酒" value="果酒"></el-option>
            <el-option label="白兰地" value="白兰地"></el-option>
            <el-option label="威士忌" value="威士忌"></el-option>
            <el-option label="伏特加" value="伏特加"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="葡萄品种">
          <el-select v-model="goodsForm3.genre3" placeholder="请输入葡萄品种">
            <el-option label="请选择" value="''"></el-option>
            <el-option label="赤霞珠" value="赤霞珠"></el-option>
            <el-option label="丹魄" value="丹魄"></el-option>
            <el-option label="白皮诺" value="白皮诺"></el-option>
            <el-option label="白诗南" value="白诗南"></el-option>
            <el-option label="黑皮诺" value="黑皮诺"></el-option>
            <el-option label="灰皮诺" value="灰皮诺"></el-option>
            <el-option label="佳美娜" value="佳美娜"></el-option>
            <el-option label="蓝佛朗克" value="蓝佛朗克"></el-option>
            <el-option label="雷司令" value="雷司令"></el-option>
            <el-option label="马尔贝克" value="马尔贝克"></el-option>
            <el-option label="梅洛" value="梅洛"></el-option>
            <el-option label="皮诺塔奇" value="皮诺塔奇"></el-option>
            <el-option label="品丽珠" value="品丽珠"></el-option>
            <el-option label="琼瑶浆" value="琼瑶浆"></el-option>
            <el-option label="赛美蓉" value="赛美蓉"></el-option>
            <el-option label="麝香" value="麝香"></el-option>
            <el-option label="神索" value="神索"></el-option>
            <el-option label="西拉" value="西拉"></el-option>
            <el-option label="霞多丽" value="霞多丽"></el-option>
            <el-option label="仙粉黛" value="仙粉黛"></el-option>
            <el-option label="长相思" value="长相思"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产地">
          <el-select v-model="goodsForm3.genre2" placeholder="产地">
            <el-option label="请选择" value="''"></el-option>
            <el-option label="法国" value="法国"></el-option>
            <el-option label="智利" value="智利"></el-option>
            <el-option label="南非" value="南非"></el-option>
            <el-option label="西班牙" value="西班牙"></el-option>
            <el-option label="德国" value="德国"></el-option>
            <el-option label="澳大利亚" value="澳大利亚"></el-option>
            <el-option label="加拿大" value="加拿大"></el-option>
            <el-option label="匈牙利" value="匈牙利"></el-option>
            <el-option label="葡萄牙" value="葡萄牙"></el-option>
            <el-option label="美国" value="美国"></el-option>
            <el-option label="意大利" value="意大利"></el-option>
            <el-option label="摩尔多瓦" value="摩尔多瓦"></el-option>
            <el-option label="格鲁吉亚" value="格鲁吉亚"></el-option>
            <el-option label="英国" value="英国"></el-option>
            <el-option label="乌克兰" value="乌克兰"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌">
          <!--<el-select v-model="goodsForm3.genre7" placeholder="品牌">-->
          <!--<el-option label="请选择" value="''"></el-option>-->
          <!--<el-option label="赤霞珠" value="赤霞珠"></el-option>-->
          <!--<el-option label="梅洛" value="梅洛"></el-option>-->
          <!--<el-option label="西拉" value="西拉"></el-option>-->
          <!--<el-option label="黑皮诺" value="黑皮诺"></el-option>-->
          <!--<el-option label="马尔贝克" value="马尔贝克"></el-option>-->
          <!--<el-option label="佳美娜" value="佳美娜"></el-option>-->
          <!--<el-option label="霞多丽" value="霞多丽"></el-option>-->
          <!--<el-option label="长相思" value="长相思"></el-option>-->
          <!--<el-option label="雷司令" value="雷司令"></el-option>-->
          <!--<el-option label="内比奥罗" value="内比奥罗"></el-option>-->
          <!--<el-option label="桑娇维塞" value="桑娇维塞"></el-option>-->
          <!--<el-option label="仙粉黛" value="仙粉黛"></el-option>-->
          <!--<el-option label="皮诺塔吉" value="皮诺塔吉"></el-option>-->
          <!--<el-option label="佳美" value="佳美"></el-option>-->
          <!--<el-option label="蛇龙珠" value="蛇龙珠"></el-option>-->
          <!--<el-option label="品丽珠" value="品丽珠"></el-option>-->
          <!--<el-option label="莫斯卡托" value="莫斯卡托"></el-option>-->
          <!--<el-option label="麝香" value="麝香"></el-option>-->
          <!--<el-option label="琼瑶浆" value="琼瑶浆"></el-option>-->
          <!--<el-option label="西万尼" value="西万尼"></el-option>-->
          <!--<el-option label="白诗南" value="白诗南"></el-option>-->
          <!--<el-option label="灰皮诺" value="灰皮诺"></el-option>-->
          <!--<el-option label="赛美容" value="赛美容"></el-option>-->
          <!--<el-option label="维欧尼" value="维欧尼"></el-option>-->
          <!--<el-option label="白玉霓" value="白玉霓"></el-option>-->
          <!--<el-option label="歌海娜" value="歌海娜"></el-option>-->
          <!--<el-option label="天帕尼罗" value="天帕尼罗"></el-option>-->
          <!--<el-option label="巴贝拉" value="巴贝拉"></el-option>-->
          <!--<el-option label="多姿桃" value="多姿桃"></el-option>-->
          <!--<el-option label="混合" value="混合"></el-option>-->
          <!--<el-option label="丹魂" value="丹魂"></el-option>-->
          <!--<el-option label="黑玛尔维萨" value="黑玛尔维萨"></el-option>-->
          <!--<el-option label="艾格尼科" value="艾格尼科"></el-option>-->
          <!--<el-option label="巴贝拉" value="巴贝拉"></el-option>-->
          <!--<el-option label="慕斯卡" value="慕斯卡"></el-option>-->
          <!--<el-option label="兰弗兰克" value="兰弗兰克"></el-option>-->
          <!--<el-option label="其他" value="其他"></el-option>-->
          <!--</el-select>-->
          <el-input v-model="goodsForm3.genre7" style="width:220px;" placeholder="请输入商品品牌"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="genre5">
          <el-input placeholder="请输入内容" v-model="goodsForm3.genre5" style="width:220px;">
            <el-select v-model="select" style="width:80px;" slot="append" placeholder="请选择单位">
              <el-option label="ML" value="ML"></el-option>
              <el-option label="L" value="L"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="年份">
          <el-input v-model="goodsForm3.genre6" style="width:220px;" placeholder="请输入年份"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else-if="yiji == '酒具周边'" :inline="true" :model="goodsForm4" :rules="rules3" ref="goodsForm4"
               label-width="100px">
        <el-form-item label="产地">
          <el-select v-model="goodsForm4.genre8" placeholder="产地">
            <el-option label="请选择" value="''"></el-option>
            <el-option label="法国" value="法国"></el-option>
            <el-option label="智利" value="智利"></el-option>
            <el-option label="南非" value="南非"></el-option>
            <el-option label="西班牙" value="西班牙"></el-option>
            <el-option label="德国" value="德国"></el-option>
            <el-option label="澳大利亚" value="澳大利亚"></el-option>
            <el-option label="加拿大" value="加拿大"></el-option>
            <el-option label="匈牙利" value="匈牙利"></el-option>
            <el-option label="葡萄牙" value="葡萄牙"></el-option>
            <el-option label="美国" value="美国"></el-option>
            <el-option label="意大利" value="意大利"></el-option>
            <el-option label="摩尔多瓦" value="摩尔多瓦"></el-option>
            <el-option label="格鲁吉亚" value="格鲁吉亚"></el-option>
            <el-option label="英国" value="英国"></el-option>
            <el-option label="乌克兰" value="乌克兰"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 酒品图片 -->
      <el-form :model="goodsForm5" :rules="rules4" ref="goodsForm5" label-width="100px">
        <el-form-item label="商品图片">
          <div style="display: flex;">
            <AliImg ref="jiuImg1" style="margin: 8px;"></AliImg>
            <AliImg ref="jiuImg2" style="margin: 8px;"></AliImg>
            <AliImg ref="jiuImg3" style="margin: 8px;"></AliImg>
            <AliImg ref="jiuImg4" style="margin: 8px;"></AliImg>
            <AliImg ref="jiuImg5" style="margin: 8px;"></AliImg>
          </div>
        </el-form-item>
        <el-form-item label="列表缩略图">
          <div style="display: flex;">
            <AliImg ref="liebiao" style="margin: 8px;"></AliImg>
          </div>
        </el-form-item>
        <el-form-item label="小视频介绍">
          <div style="display: flex;">
            <videos ref="shipin" style="margin: 8px;"></videos>
          </div>
        </el-form-item>
        <el-form-item label="商品详情">
          <div style="display: flex;">
            <AliImg ref="xiangqing" style="margin: 8px;"></AliImg>
          </div>
        </el-form-item>
      </el-form>
      <!-- 印象标签 -->
      <el-form :inline="true" :model="goodsForm6" :rules="rules5" ref="goodsForm6" label-width="160px">
        <el-form-item label="印象标签">
          <el-input v-model="goodsForm6.label" style="width:480px;" placeholder="印象标签"></el-input>
          <p style="line-height: 12px;font-size: 12px;color:#3c6bff;">使用逗号或空格分隔每个标签</p>
        </el-form-item>
        <el-form-item label="市场价格" prop="original_price">
          <el-input-number v-model="goodsForm6.original_price" :min="0" :controls="false"
                           label="请输入市场价格"></el-input-number>
        </el-form-item>
        <el-form-item label="会员价格" prop="member_price">
          <el-input-number v-model="goodsForm6.member_price" :min="0" :controls="false"
                           label="请输入市场价格"></el-input-number>
        </el-form-item>
        <el-form-item label="是否成为经销商">
          <el-checkbox v-model="goodsForm6.is_dealer">是否成为经销商</el-checkbox>
        </el-form-item>
        <el-form-item label="经销商价格" prop="trade_price">
          <el-input-number v-model="goodsForm6.trade_price" :min="0" :controls="false"
                           label="请输入经销商价格"></el-input-number>
        </el-form-item>
        <el-form-item label="经销商最低购入数量" prop="dealer_num">
          <el-input-number v-model="goodsForm6.dealer_num" :min="0" :controls="false"
                           label="经销商最低购入数量"></el-input-number>
        </el-form-item>
        <el-form-item label="经销商可申请回购天数" prop="buyBack_num">
          <el-input-number v-model="goodsForm6.buyBack_num" :min="0" :controls="false"
                           label="经销商可申请回购天数"></el-input-number>
        </el-form-item>
        <el-form-item label="可获得积分" prop="integral">
          <el-input-number v-model="goodsForm6.integral" :min="0" :controls="false"
                           label="可获得积分"></el-input-number>
        </el-form-item>
        <el-form-item label="上架数量" prop="num">
          <el-input-number v-model="goodsForm6.num" :min="0" :controls="false"
                           label="上架数量"></el-input-number>
        </el-form-item>
        <el-form-item label="前台销量" prop="salesVolume">
          <el-input-number v-model="goodsForm6.salesVolume" :min="0" :controls="false"
                           label="前台销量"></el-input-number>
        </el-form-item>
        <el-form-item label="缺货提醒阈值" prop="warn_num">
          <el-input-number v-model="goodsForm6.warn_num" :min="0" :controls="false"
                           label="前台销量"></el-input-number>
        </el-form-item>
        <el-form-item label="加盟商缺货提醒阈值" prop="dealer_warn_num">
          <el-input-number v-model="goodsForm6.dealer_warn_num" :min="0" :controls="false"
                           label="加盟商缺货提醒阈值"></el-input-number>
        </el-form-item>
      </el-form>
      
      <el-button type="primary" @click="submitForm">确定添加</el-button>
    </div>
  </div>
</template>

<script>
  import AliImg from '@/components/upload-ali'
  import videos from '@/components/video'
  
  export default {
    name: "",
    components: {
      AliImg,
      videos
    },
    data() {
      return {
        yiji: '洋酒',
        erjiList: [],
        goodsForm1: {
          goods_groupId: '',
          goods_name: '',
          goods_label: ''
        },
        rules: {
          goods_groupId: [
            {required: true, message: '必填项不能为空', trigger: 'blur'},
          ],
          goods_name: [
            {required: true, message: '必填项不能为空', trigger: 'blur'},
          ]
        },
        rules1: {},
        select: 'ML',
        goodsForm2: {},
        rules2: {},
        goodsForm2: {},
        goodsForm3: {},
        rules3: {},
        goodsForm4: {},
        rules4: {},
        goodsForm5: {},
        rules5: {
          member_price: [
            {required: true, message: '必填项不能为空', trigger: 'blur'},
          ],
          original_price: [
            {required: true, message: '必填项不能为空', trigger: 'blur'},
          ]
        },
        goodsForm6: {},
        videos: false
      }
    },
    watch: {
    },
    created() {
      this.getErji(this.yiji)
    },
    methods: {
      getErji(option) {
        this._getData('/api/v1/goods_group/getSub', {
          group_name: option
        }, data => {
          this.erjiList = data;
          this.goodsForm1.goods_groupId = data.length === 0 ? '' : data[0].id;
        })
      },
      submitForm() {
        this.$refs.goodsForm1.validate((valid) => {
          if (valid) {
            this.$refs.goodsForm6.validate((valid6) => {
              if (valid6) {
                let imgArr = [];
                let subObj = new Object();
                for (let i = 1; i <= 5; i++) {
                  let img = this.$refs['jiuImg' + i].fileArr;
                  if (img.length !== 0) {
                    imgArr.push(img[0])
                  }
                }
                let lbImg = this.$refs.liebiao.fileArr;
                let spImg = this.$refs.shipin.fileArr;
                let xqImg = this.$refs.xiangqing.fileArr;
                if (lbImg.length === 0) {
                  this.$message({
                    showClose: true,
                    message: '列表图片为必填项!!',
                    type: 'error'
                  });
                  return false;
                }
                subObj.goods_groupId = this.goodsForm1.goods_groupId;
                subObj.goods_name = this.goodsForm1.goods_name;
                subObj.goods_label = this.goodsForm1.goods_label;
                subObj.goods_img = imgArr.join(',');
                subObj.list_img = lbImg[0];
                subObj.video = spImg[0] || "";
                subObj.details_img = xqImg[0] || "";
                subObj.warn_num = this.goodsForm6.warn_num;
                subObj.is_dealer = this.goodsForm6.is_dealer ? 1 : 0;
                subObj.dealer_num = this.goodsForm6.dealer_num;
                subObj.buyBack_num = this.goodsForm6.buyBack_num;
                subObj.label = this.goodsForm6.label;
                subObj.salesVolume = this.goodsForm6.salesVolume;
                subObj.num = this.goodsForm6.num;
                subObj.integral = this.goodsForm6.integral;
                subObj.member_price = this.goodsForm6.member_price;
                subObj.trade_price = this.goodsForm6.trade_price;
                subObj.original_price = this.goodsForm6.original_price;
                subObj.dealer_warn_num = this.goodsForm6.dealer_warn_num;
                if (this.yiji == '洋酒') {
                  subObj.genre1 = this.goodsForm2.genre1;
                  subObj.genre2 = this.goodsForm2.genre2;
                  subObj.genre5 = this.goodsForm2.genre5 + this.select;
                  subObj.genre7 = this.goodsForm2.genre7;
                } else if (this.yiji == '葡萄酒') {
                  subObj.genre1 = this.goodsForm3.genre1;
                  subObj.genre2 = this.goodsForm3.genre2;
                  subObj.genre3 = this.goodsForm3.genre3;
                  subObj.genre5 = this.goodsForm3.genre5 + this.select;
                  subObj.genre6 = this.goodsForm3.genre6;
                  subObj.genre7 = this.goodsForm3.genre7;
                } else if (this.yiji == '酒具周边') {
                  subObj.genre8 = this.goodsForm4.genre8;
                }
                subObj.status = 1;
                this._getData('/api/v1/goods/create', subObj, data => {
                  this.$message({
                    showClose: true,
                    message: '商品添加成功',
                    type: 'success'
                  });
                  this.$router.push({name:'shopList'})
                  this.$refs.goodsForm1.resetFields();
                  if (this.yiji == '洋酒') {
                    this.$refs.goodsForm2.resetFields();
                  } else if (this.yiji == '葡萄酒') {
                    this.$refs.goodsForm3.resetFields();
                  } else if (this.yiji == '酒具周边') {
                    this.$refs.goodsForm4.resetFields();
                  }
                  this.$refs.goodsForm5.resetFields();
                  this.$refs.goodsForm6.resetFields();
                  for (let j = 1; j <= 5; j++) {
                    this.$refs['jiuImg' + j].clearUrl();
                  }
                  this.$refs['liebiao'].clearUrl();
                  this.$refs['shipin'].clearUrl();
                  this.$refs['xiangqing'].clearUrl();
                })
              } else {
                this.$message({
                  showClose: true,
                  message: '请完善表单后提交!!',
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              showClose: true,
              message: '请完善表单后提交!!',
              type: 'error'
            });
            return false;
          }
        });
      }
    },
  }
</script>

<style scoped>
  .tops {
    margin: 20px 0px 0px 30px;
  }
  
  .inputs {
    width: 350px;
  }
  
  .inputs2 {
    width: 180px;
  }
  
  .fen {
    margin: 25px 0px 0px 5px;
  }
  
  .selec {
    width: 300px;
    margin: 20px 0px 0px 15px;
  }
  
  .xin {
    color: red;
    margin: 28px 0px 0px 30px;
  }
  
  .ti {
    margin: 0px 0px 0px 14px;
    font-size: 13px;
    color: #9999;
  }
</style>
