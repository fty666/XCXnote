$(function () {
    $('#box').progressbar({
        //进度条的值
        value:0,
        //长度，高度
        width:400,
        height:20,
        //改变事件
        onChange:function (newValue,oldValue) {
            console.log('新'+newValue)
        }
    })
    // setTimeout(function () {
    //     //改变value的值,  setValue
    //     $('#box').progressbar('setValue',70)
    // },1000)

    setInterval(function () {
        //获取当前的值，getValue
        $('#box').progressbar('setValue',$('#box').progressbar('getValue')+5)
    },1000)
});
