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
	
	
});