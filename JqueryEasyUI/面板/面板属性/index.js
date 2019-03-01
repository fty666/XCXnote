$(function () {
    $('#box').panel({
        //1,标题
        title:'面板',
        //2,长度，高度
        width:400,
        height:100,
        //3,图标
        iconCls:'icon-search',
        // 4,头部class样式
        // headerCls:'className',
        // 内容样式
        // bodyCls:'className',
        // 总体面板样式
        // style:{
        //     'min-height':'200px'
        // }
        //5,设置为true时会自适应
        // fit:true
        //6,外边框是否显示
        // border:false,
        //7,设置是否显示面板标题
        // noheader:true
        //8,修改文本内容
        // content:'修改了'
        //9，是否显示可折叠按钮
        collapsible:true,
        //10,最小化按钮
        minimizable:true,
        //11，最大化按钮
        maximizable:true,
        //12,关闭按钮
        closable:true,
        //13,标题添加样式
        tools:[
            {
                iconCls: 'icon-help',
                handler:function () {
                    // 刷新
                    $('#box').panel('refresh');
                }
            },
        ],
        //14,url读取远程数据显示到面板
        // href:'url地址',
        //15,加载显示的内容标题
        // loadingMessage:'加载中',
        //16，ajax获取数据，然后进行筛选
        // extractor:function (data) {
        //     return data;
        // }

    })
});
