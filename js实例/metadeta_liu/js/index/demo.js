$(function(){
	//计算内容区域高度
	var calcHeight = function(){
        $("iframe").css("height",$(window).height()-110)
        $("iframe").css("width",$(".col-sm-10").width())
	};
	//菜单点击
	$('a',$('#menuSideBar')).on('click', function(e) {
		e.stopPropagation();
		var li = $(this).closest('li');
		console.log($(this))
		$(this).parent("li").addClass("bgColer").siblings().removeClass("bgColer").parent("ul").parent("li").siblings("li").children("ul").children("li").removeClass("bgColer");
		// $(this).addClass("bgColer").siblings().removeClass("bgColer").parent("ul").parent("li").siblings("li").children("ul").children("li").removeClass("bgColer");
		var menuId = $(li).attr('mid');
		var url = $(li).attr('funurl');
		var title = $(this).text();
		var _this=$(this)
		$('#mainFrameTabs').bTabsAdd(menuId,title,url,_this);
		
		//计算Tab可用区域高度
		calcHeight();
	});
	
	//初始化
	$('#mainFrameTabs').bTabs();
});