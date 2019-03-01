$(function () {
    //拖动时鼠标的样式
    $.fn.draggable.defaults.cursor='text';
    $('#box').draggable({
        //1,拖动结束后回到原始位置
        // revert:true,
        // 2,设置从哪里开始才能拖动
        //     handle:'#pox'
        //3，设置拖动容器可以拖动的宽度
        // edge:30
        //4,设置拖动的方向，垂直还是水平  v:上下，  h:垂直
        // axis:'h'
        //5，拖动时克隆一个新的拖动
        // proxy:'clone',
        //拖动后鼠标的位置
        // deltaX:10,
        // deltaY:10,
        //6，回调函数，选的改ID的元素标签
        // proxy:function (source) {
        //     var p=$('<div style="width: 400px;height: 400px;border: 1px dashed #ddd"></div>');
        //     // p.appendTo('body');  //将样式插入到页面
        //     p.html($(source).html()).appendTo('body');  //获取拖动样式里面的内容
        //     return p;
        // }

        // 事件
        //1,拖动前触发
        // onBeforeDrag:function (e) {
        //     alert('拖动前触发');
        //     return false;//禁止拖动
        // }
        // 2，拖动过程触发
        // onDrag:function (e) {
        //     alert('触发')
        // }
        //3,拖动结束时触发
        // onStopDrag:function (e) {
        //     alert('结束了');
        // }
    });
    //方法
    //1,取消拖动和开始拖动
    // $('#box').draggable('disable');
    // $('#box').draggable('enable');
    //2，获取属性值
    // console.log($('#box').draggable('options'))

});
