;(function(){
//	console.log("aaaa");
})();
$(function(){
	$(".hoverul").mouseover(function(){
		$(this).children().eq(1).show();
	});
	$(".hoverul").mouseout(function(){
		$(this).children().eq(1).hide();
	});
	$(".brimg1").mouseenter(function(){
		$(this).parent().parent().stop().animate({width:$(".brimg2").outerWidth()+$(this).outerWidth()},500)
	});
	$(".ban_right").mouseleave(function(){
		$(this).stop().animate({width:$(".brimg1").outerWidth()},500)
	});
	$.ajax({
		type:"get",
		url:"https://lib.suning.com/homepage/model/homepage1_326191_lazyload326191.json",
		dataType:"jsonp",
		jsonpCallback:"lazyload326191",
		async:true,
		success:function(data){
			$(".product_wrap").append(data["data"]);
			$("img").each(function(){
			$(this).attr("src",$(this).attr("lazy-src"));
			});
		}
	});
	$.ajax({
		type:"get",
		url:"https://lib.suning.com/api/jsonp/cb/sortList_v6-threeSortLoad.jsonp",
		async:true,
		dataType:"jsonp",
		jsonpCallback:"threeSortLoad",
		success:function(data){
			var result=data["allsort"]["nodes"];
			for(var i=0;i<result.length;i++){
				var lilist=$("<li><i></i></li>");
				for(var k=0;k<result[i]["nodes"][0]["tag"].length;k++){
					lilist.append("<a href='#'>"+result[i]['nodes'][0]['tag'][k]['elementName']+"</a><em>|&nbsp;</em>");
//					lilist.append(result[i]['nodes'][0]['tag'][k]['elementName']);
				}
				$(".list_list").append(lilist).find("em").last().remove();
			}
			$(".list_list>li>em").last().remove();

   		 }
	});
	var $ul = $("<ul></ul>");
	$(".ban_con").append($ul);
	function bannerpp(data){
		var $li= $("<li></li>");
			$li.css("background",data[0]["tone"])
			.append("<a href='#'><img src='"+data[0]["adSrc"]+"'/><a>");
			for(var i=1;i<data.length;i++){
				var $div=$("<div><div></div></div>");
				$div.append("<a href='#'><p class='img_name'>"+data[i]["title"]+"</p><p class='img_desc'>"+data[i]["subtitle"]+"</p><img src='"+data[i]["adSrc"]+"'/></a>");
				$li.append($div);
				$(".ban_nav").append("<a href=''></a>");
			}
			$li.children().last().addClass("little");
			$ul.append($li);
			
	}
	function bannernum(num){
		for(var i=0;i<num.length;i++){
			$.ajax({
				type:"get",
				url:num[i],
				async:true,
				dataType:"jsonp",
				success:function(data){
					bannerpp(data);
				}
			});
		}
	}
	var arrurl=["https://th.suning.com/getCpmDatasGroup?pid=300000005&pid=100003449&pid=100003450&screenType=w",
	"https://th.suning.com/getCpmDatasGroup?pid=300000004&pid=100003446&pid=100003447&screenType=w",
	"https://th.suning.com/getCpmDatasGroup?pid=300000006&pid=100003452&pid=100003453&screenType=w",
	"https://th.suning.com/getCpmDatasGroup?pid=300000026&pid=100003455&pid=100003456&screenType=w",
	"https://th.suning.com/getCpmDatasGroup?pid=300000007&pid=100003449&pid=100003450&screenType=w",
	"https://th.suning.com/getCpmDatasGroup?pid=300000008&pid=100003446&pid=100003447&screenType=w",
	"https://th.suning.com/getCpmDatasGroup?pid=300000003&pid=100003452&pid=100003453&screenType=w",
	"https://th.suning.com/getCpmDatasGroup?pid=300000026&pid=100003455&pid=100003456&screenType=w"]
	bannernum(arrurl);
	var count=0;
	var timer = setInterval(function(){
		count++;
		if(count>$(".ban_con ul>li").length-1){
			count=0;
		}
		$(".ban_con ul>li").hide().eq(count).show();
		$(".ban_nav a").removeClass("current").eq(count).addClass("current");
		
	},3000)
});