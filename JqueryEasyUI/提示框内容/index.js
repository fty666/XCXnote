$(function () {
    //默认提示内容的方向
    $.fn.tooltip.defaults.position='top';
    //内容提示框
    $('#box').tooltip({
        //1,提示内容
        content:'<strong>内容提示框</strong>',
        //2，提示的方向
        // position:'top'
        //3,跟随鼠标的移动，内容移动
        // trackMouse:true,
        //4，内容提示的距离内容的距离
        // deltaX:100,
        // deltaY:100,
        //5,触发内容事件
        // showEvent:'click',
        // hideEvent:'dblclick'
        // //6,提示内容延迟
        // showDelay:1500,
        // hideDelay:1500,

        //事件
        //1，显示的时候触发
        // onShow:function (e) {
        //     alert('显示了');
        // }
        //2，隐藏的时候触发
        // onHide:function (e) {
        //     alert('隐藏了');
        // }
        //3，提示框内容更新是触发
        // onUpdate:function (content) {
        //     alert(content)
        // }
        //4，在提示框位置改变时触发
        onPosition:function (left,top) {
            console.log(left)
        }
    });

    //默认显示提示框
    $('#box').tooltip('show');
    //默认隐藏提示框
    $('#box').tooltip('hide ');
});
