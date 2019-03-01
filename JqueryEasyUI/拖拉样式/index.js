$(function () {
    // 默认为不可拖
    // $.fn.resizable.defaults.disabled=true;
    //拖拉大小组件
    $('#rr').resizable({
        //1，设置拖拉的方向，北：n,东:e,南：s,西：w,东北:ne,东南:se,西北：nw,
        handles:'s,e,nw',
        //2，最小宽度，高度
        minWidth:200,
        minHeight:200,
        //3，最大高度和宽度
        maxWidth:600,
        maxHeight:600,
        //4，可以在哪里开始拖拉区域
        edge:50,
        //事件
        //1,开始调整的时候触发，
        onStartResize:function (e) {
            console.log('开始了')
        },
        //2，调整期间的时候触发
        onResize:function (e) {
            console.log('开始调整了')
        },
        //3,停止调整的时候触发
        onStopResize:function (e) {
            console.log('停止调整了')
        }
    });

});
