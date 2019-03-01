$(function () {
    $('#box').tabs({
        //1,长度高度
        width:300,
        height:300,
        //标题宽度，高度
        tabHeight:20,
        //2,全屏布满
        // fit:true,
        //3，不要边框
        // border:fale
        //4，滚动条设置
        // tabWidth:300,
        //5，滚动的位置大小
        scrollIncrement:300,
        //6,滚动的时长
        scrollDuration:100,
        //7，添加
        // tools:[
        //     {
        //         iconCls:'icon-add',
        //         handler:function () {
        //             alert('555')
        //         }
        //     }
        //     ],
        //8，标题的方向
        tabPosition:'top',
        //9，选中时触发的事件
        // onSelect:function (title,index) {
        //     alert(title+'|'+index)
        // },
        //10，取消选中时触发
        // onUnselect:function (title,index) {
        //     alert(title + '|' +index)
        // }
        //11,关闭时触发
        onBeforeClose:function (title,index) {
            alert(title+'|'+index)
        },
        //12，关闭后触发
        onClose:function () {
            alert('关闭之后')
        }
    })
});
