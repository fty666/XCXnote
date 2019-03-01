$(function () {
    $('#box').accordion({
        //1,宽度高度
        width:400,
        height:'auto',
        //2,折叠显示是否用动画效果
        animate:false,
        //3,展开显示为黄色
        multiple:true,
        //4,初始化时展开哪一个
        selected:1,
        //5，展开时触发事件
        // onSelect:function () {
        //     alert('展开了')
        // }
        //6,折叠时触发事件
        // onUnselect:function () {
        //   alert('折叠了')
        //  }
    }).hide();

    //显示隐藏，并重新调整大小
    $(document).click(function () {
        $('#box').accordion().show();
        $('#box').accordion('resize');
    })
});
