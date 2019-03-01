$(function () {
    $.fn.draggable.defaults.cursor='text';
    //放置组件
    $('#dd').droppable({
        //1，确认可以接受的元素
        accept:'#box',
        //2，拖置到区域时触发
        // onDragEnter:function (e,source) {
        //     $(this).css('background','blue');
        // }
        //3,但凡经过区域就会触发，onDragEnter只会触发一次，onDragOver会多次触发
        // onDragOver:function (e,source) {
        //     $(this).css('background','blue');
        // }
        //4，离开区域时触发
        // onDragLeave:function (e,source) {
        //     $(this).css('background','red');
        // }
        //5，当放入到区域时触发，鼠标放下时触发
        onDrop:function (e,source) {
            $(this).css('background','black');
        }
    });

    //拖置的
    $('#box').draggable({
    });


});
