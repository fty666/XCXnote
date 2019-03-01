$(function () {
    $('#box').tabs({
        //1,长度高度
        width:300,
        height:300,
        tools:[
            {
                iconCls:'icon-add',
                handler:function () {
                    //新增加面板
                    $('#box').tabs('add',{
                        id:'bbb',
                        title:'新选项卡',
                        content:'新面板'
                    })
                }
            }
            ],
    }).css('display','none');

    //重置css样式，点击出现
    $(document).click(function () {
        $('#box').tabs().css('display','block');
        $('#box').tabs('resize');
    })
});
