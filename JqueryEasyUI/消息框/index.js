$(function () {
    $('#box').dialog({
        width:400,
        height:400,
        title:'窗口',
        toolbar:[
            {
                text:'编辑',
                iconCls:'icon-edit',
                handler:function () {
                    alert('8888');
                }
            },
        ],
        buttons:[
            {
            text: '确定',
            iconCls: 'icon-ok'
            },
            {
                text:'取消',
                iconCls:'icon-cancel'
            }
            ],
        onClose:function () {
            alert('关闭')
        }
    })
});
