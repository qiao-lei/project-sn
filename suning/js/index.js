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
	
});