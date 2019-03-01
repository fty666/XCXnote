$(function () {
    //修改默认提示名
    $.messager.defaults={
        width:200,
        height:200,
        ok:'是',
        cancel:'否'
    },

    //警告框
    // $.messager.alert('警告框','这是一个提示','info',function () {
    //     alert('警告框')
    // })

    //确认框
    $.messager.confirm('确认框','你真的要删除吗',function (flag) {
        if(flag){
            alert('删除了')
        }else{
            alert('取消删除')
        }
    })

    //提示框，可输入内容
    // $.messager.prompt('提示框','请输入你的名字',function (content) {
    //     if(content){
    //         alert(content)
    //     }
    // })

    //进度条消息框
    // $.messager.progress({
    //     title:"加载中",
    //     //进度条加载时间
    //     interval:1000
    // })
    // console.log($.messager.progress('bar'))
    // //关闭消息框
    // $.messager.progress('close')

    //自定义消息框
    $.messager.show({
        title:'我的消息',
        msg:'消息5秒关闭',
        //关闭时间
        timeout:5000,
        //关闭样式
        showType: 'fade',
        //关闭方向
        // style:{
        //     top:0
        // }
    })
});
