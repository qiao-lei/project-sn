;(function(){
//	console.log("aaaa");
})();
$(function(){
	$(".top a").mouseenter(function(){
		$(this).next().show();
	});
	$(".top a").mouseleave(function(){
		$(this).next().hide();
	});
})