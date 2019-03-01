$(function () {
    $('#box').panel({
        title:'面板',
        href:'./1.php',
        //1，加载数据之前触发
        // onBeforeLoad:function () {
        //     alert('加载前触发')
        // }
        //2,加载数据时触发
        onLoad:function (data) {
            console.log(data)
            alert('加载时触发')
        },
        //3,取消远程加载
        // onBeforeLoad:function () {
        //     alert('取消数据加载')
        // }
        //4，关闭之前触发
        onBeforeClose:function () {
            alert('关闭之前触发');
        },
        //5,关闭之后触发
        onClose:function () {
          alert('关闭之后触发');
        },
        //6,销毁之前触发
        onBeforeDestroy:function () {
            alert('销毁之前触发');
            return false;
        },
        //7，毁灭之后触发
        onDestroy:function () {
            alert('毁灭之后触发')
        },
        //8，折叠之前触发
        onBeforeCollapse:function () {
            alert('折叠之前触发')
        },
        onCollapse:function () {
            alert('折叠之后触发')
        },
        //9，展开之后触发
        onExpand:function () {
            alert('展开之后触发');
        },
        //10，窗口最大化时触发
        onMaximize:function () {
            alert('窗口最大化触发')
        },
        //11，窗口还原时触发
        onRestore:function () {
            alert('窗口还原时触发')
        },
        //窗口最小化时触发
        onMinimize:function () {
            alert('窗口最小化时触发')
        }
    })
});
