$(function () {
    $('#sss').searchbox({
        menu:'#box',
        prompt:"请输入搜索内容",
        searcher:function (name,value) {
            alert(name+'-'+value)
        }
    })
    //获取当前搜索的值
    // console.log($('#sss').searchbox('getValue'));
    //重置内容
    $('#sss').searchbox('reset')
});
