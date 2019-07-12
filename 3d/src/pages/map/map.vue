<template>
  <div>
    <!-- 天气-->
    <div class="weater flex" v-if="viewBlock==2">
      <div class="one dis">
        <div><img src="../../assets/images/inde/fine@2x.png" class="biao"></div>
        <div class="Tfont">{{weather.temperature}}℃</div>
      </div>
      <div class="one dis">
        <div><img src="../../assets/images/inde/humidity@2x.png" class="biao"></div>
        <div class="Tfont">{{weather.humidity}}</div>
      </div>
      <div class="one dis">
        <div><img src="../../assets/images/inde/wind direction@2x.png" class="biao"></div>
        <div class="Tfont">{{weather.windDirection}}风</div>
      </div>
      <div class="one dis">
        <div><img src="../../assets/images/inde/wind speed@2x.png" class="biao"></div>
        <div class="Tfont">{{weather.windPower}}级</div>
      </div>
    </div>
    <div class="map-clock p-r">
      <!--3D地图显示-->
      <div class="w-h-100 " v-if="viewBlock==2">
        <!--地图开始-->
        <div id="container" class="amap-a p-r"></div>
      </div>
      <!--报警详情显示-->
      <div class="w-h-100 " v-if="viewBlock==3">
        <div class="Qcall" @click="callPhone" style="z-index: 999">
          <div class="cfont">A-12</div>
          <div class="cfont">事故类型：高空坠物</div>
          <div class="cfont">发生时间：2019-07-01 15:25</div>
        </div>
        <el-carousel height="700px">
          <el-carousel-item v-for="item in arr" :key="item">
            <div style="position: fixed;top: 50px;left: 150px;z-index: 99">A-05区</div>
            <div  @click="lookCheckMsg(item)">
              <img src="../../assets/images/0190702152230.jpg" style="width: 100%;height:700px" id="ceshiImg">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!--右下角小地图标-->
    <div class="map-mini p-a">
      <!--地图-->
      <img class="w10" src="../../assets/images/inde/3d.png" @click="chooseMap()"  v-if="viewBlock==2">
      <img class="w10" src="../../assets/images/inde/quanjing .png" @click="ddMap()" v-if="viewBlock==3">
      <!--全景-->
<!--      <img class="w10" src="../../assets/images/map2.png" @click="ddMap()">-->
    </div>
    <!--    报警区域-->
    <div class="call" @click="callPhone" v-if="viewBlock==2">
      <div class="cfont">A-12</div>
      <div class="cfont">事故类型：高空坠物</div>
      <div class="cfont">发生时间：2019-07-01 15:25</div>
    </div>
  </div>
</template>
<script>
  import AMap from 'AMap'

  export default {
    name: "map",
    data() {
      return {
        arr: [1, 2, 3],
        viewBlock: 2,
        warnList: [{}, {}],
        geography: '天津滨海新区',
        ruleForm: {
          name: '',
          phone: '',
          addr: '',
          long: '',
          lat: '',
          start_work_time: '',
          end_work_time: '',
        },
        weather: {}
      }
    },
    methods: {
      //点击右边切换小地图
      chooseMap() {
        this.$nextTick(() => {
          this.viewBlock = 3;
        });
      },
      //3d
      ddMap() {
        this.viewBlock = 2;
        this.$nextTick(() => {
          this.init();
        });
      },
      //全景图报警
      lookCheckMsg() {
        uni.navigateTo({
          url: '../service/service?id=3'
        });
        uni.postMessage({
          data: {
            action: 'postMessage',
            userInfo: {
              openId: '我是web端传过来的参数'
            }
          }
        });
      },
      //3d地图报警
      callPhone() {
        uni.navigateTo({
          url: '../service/service?id=3'
        });
        uni.postMessage({
          data: {
            action: 'postMessage',
            userInfo: {
              openId: '我是web端传过来的参数'
            }
          }
        });
        // uni.navigateBack();
      },
      init() {
        var that = this;
        let map = new AMap.Map('container', {
          resizeEnable: true,
          rotateEnable: true,
          pitchEnable: true,
          zoom: 18,
          pitch: 60,  // 地图俯仰角度，有效范围 0 度- 83 度
          maxPitch: 90,   //设置地图的最大倾角
          rotation: -15,  //设置地图的旋转角度
          viewMode: '3D', //开启3D视图,默认为关闭
          buildingAnimation: true,//楼块出现是否带动画
          expandZoomRange: true,
          clickable: true,
          zooms: [10, 20],
          center: [117.681498, 39.032816],
        })
        /*加载工具条*/
        // AMap.plugin(['AMap.ToolBar', 'AMap.ControlBar', 'AMap.Scale'], () => {
        //   /*左上角工具条*/
        //   let toolbar = new AMap.ToolBar()
        //   map.addControl(toolbar)
        //   /*右上角360旋转*/
        //   var controlBar = new AMap.ControlBar({
        //     showZoomBar: false,
        //     showControlButton: true,
        //     position: {
        //       right: '10px',
        //       top: '170px'
        //     }
        //   })
        //   map.addControl(controlBar)
        //   /*比例尺*/
        //   map.addControl(new AMap.Scale());
        // })
        //加载天气查询插件
        AMap.plugin('AMap.Weather', function () {
          //创建天气查询实例
          var weather = new AMap.Weather();
          //执行实时天气信息查询
          weather.getLive('滨海新区', function (err, data) {
            var weather = {};
            weather.temperature = data.temperature;
            weather.humidity = data.humidity;
            weather.windDirection = data.windDirection;
            weather.windPower = data.windPower;
            that.weather = weather;
          });
        });
        /*弧线*/
        var path = [
          // [117.510910, 39.003600],
          // [118.510910, 40.003600],
        ];
        /*标点*/
        var marker = new AMap.Marker({
          position: map.getCenter(),
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          offset: new AMap.Pixel(-13, -30)
        });
        // document.addEventListener('UniAppJSBridgeReady', function () {
        //   var clickHandle = AMap.event.addListener(marker, 'click', function () {
        //     console.log(11111)
        //     uni.navigateTo({
        //       url: '../service/service?id=3'
        //     });
        //     uni.postMessage({
        //       data: {
        //         action: 'postMessage',
        //         userInfo: {
        //           openId: '我是web端传过来的参数'
        //         }
        //       }
        //     });
        //     // uni.navigateBack();
        //   });
        // });
        marker.setMap(map);
        // 设置鼠标划过点标记显示的文字提示
        marker.setTitle('我是marker的title');
        // label默认蓝框白底左上角显示，样式className为：amap-marker-label
        // marker.setLabel({
        //   offset: new AMap.Pixel(20, 20),  //设置文本标注偏移量
        //   content: "<div>" +
        //     "<div>A-12</div><br>" +
        //     "<div>事故类型：高空坠物</div><br>" +
        //     "<div>发生时间：2019-07-01 15:25</div></div>", //设置文本标注内容
        //   direction: 'right' //设置文本标注方位
        // });
      }
    },
    mounted() {
      document.addEventListener('UniAppJSBridgeReady', function () {
      });
      this.init()
    },
  }
</script>
<style scoped>
  .weater {
    position: fixed;
    top: 50px;
    left: 12px;
    z-index: 999;
    width: 95%;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 10px 0px rgba(38, 104, 224, 0.1);
    opacity: 1;
    border-radius: 12px;
  }

  .dis {
    display: flex;
  }

  .flex {
    display: flex;
    justify-content: space-between;
  }

  .one {
    width: 25%;
    height: 100%;
  }

  .biao {
    width: 22px;
    height: 22px;
    margin-top: 13px;
    margin-left: 10px;
  }

  .Tfont {
    font-size: 13px;
    font-weight: 400;
    color: black;
    line-height: 50px;
    margin-left: 3px;
  }

  .Tfont2 {
    width: 60px;
    font-size: 13px;
    font-weight: 400;
    color: black;
    line-height: 50px;
    margin-left: 5px;
  }

  /*地图开始*/
  .map-clock {
    width: 100%;
    height: 700px;
    /*margin: 50px auto;*/
    /*border: 1px solid #00E5FF;*/
  }

  .w-h-100 {
    width: 100%;
    height: 100%;
  }

  .amap-a {
    width: 100%;
    height: 100%;
  }

  .amap-b {
    width: 304px;
    min-height: 172px;
    background: rgba(238, 77, 65, 1);
    border: 1px solid rgba(157, 25, 14, 1);
    box-shadow: 0px 0px 7px 2px rgba(46, 119, 166, 0.72);
    opacity: 0.57;
    color: rgba(255, 255, 255, 1);
    z-index: 2;
    top: 70px;
    left: 65px;
  }

  .amap-b-img {
    width: 100%;
    height: 51px;
    top: 0;
  }

  /*标注样式*/
  .amap-marker-label {
    position: absolute;
    z-index: 2;
    border: 1px solid #ccc;
    background-color: red;
    white-space: nowrap;
    cursor: default;
    padding: 3px;
    font-size: 12px;
  }

  .info {
    position: relative;
    top: 0;
    right: 0;
    min-width: 0;
  }

  /*右下角小地图标*/
  .map-mini {
    width: 110px;
    z-index: 2;
    position: fixed;
    right: 13px;
    top: 425px;
  }

  .middle_Box_one {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .middle_Box_one img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .middle_Box_one .check_true {
    border: 1px solid rgba(157, 25, 14, 1);
    width: calc(100% / 3);
    height: 4.3rem;
  }

  .middle_Box_one .check_false {
    border: 1px solid rgba(157, 25, 14, 1);
    background: rgba(255, 93, 79, 0.45);
    /*width: 3.21rem;*/
    width: calc(100% / 3);
    height: 4.3rem;
    cursor: pointer;
  }

  .middle_Box_one .videoOne {
    display: flex;
    flex-flow: row wrap;
  }

  .call {
    position: fixed;
    top: 100px;
    left: 20px;
    width: 200px;
    height: 120px;
    background-image: url("../../assets/images/inde/red.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  /*全景图定位*/
  .Qcall {
    position: fixed;
    top: 100px;
    left: 80px;
    width: 200px;
    height: 120px;
    background-image: url("../../assets/images/inde/red.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .cfont {
    width: 100%;
    font-size: 11px;
    margin-top: 13px;
    margin-left: 15px;
  }
</style>
