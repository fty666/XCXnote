<template>
    <view style="width: 100%;height: 100%;margin-top: 30upx;background: #0D7BFD;">
        <web-view src="https://www.baidu.com"></web-view>
    </view>
</template>
<script>
var wv;//计划创建的webview
export default {
    onReady() {
        // #ifdef APP-PLUS
        var currentWebview = this.$mp.page.$getAppWebview() //获取当前页面的webview对象
        setTimeout(function() {
            wv = currentWebview.children()[0]
            wv.setStyle({top:50,height:750})
        }, 1000); //如果是页面初始化调用时，需要延时一下
        // #endif
        }
    };
</script>