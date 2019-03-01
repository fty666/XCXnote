$(function () {
    $('#box').window({
        //1,高度，宽度
        width:400,
        height:400,
        //2,标题
        title:'窗口',
        //3,折叠按钮
        collapsible:true,
        //4,最大最小化按钮
        minimizable:true,
        maximizable:true,
        //5,关闭按钮
        closable:false,
        //6，是否可以拖动
        draggable:false,
        //7,是否可以滑动大小
        resizable:true,
        //8,边框是否有阴影
        // shadow:false
        //9,只能操作该窗口
        // modal:true
        //10,
    })
});
