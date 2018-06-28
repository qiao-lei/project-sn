$(function(){
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",function(data){
//		console.log(data);
		var str="";
		$.each(data, function(index,item) {
			str += `<div>
				<a href="xiangxi.html?id=${item.goodsID}">
				<img src="${item.goodsListImg}">
				<p>${item.goodsName}</p>
				</a>
				</div>`;
		});
		$(".listmore").append(str);
	});
	var classid=location.search.split("=")[1];
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{classID:classid},function(data){
//		data=JSON.parse(data);
		var str="";
		$.each(data, function(index,item) {
			str += `<div>
					<a href="xiangxi.html?id=${item.goodsID}">
					<img src="${item.goodsListImg}">
					<p>${item.goodsName}</p>
					</a>
					</div>`;
		});
		$(".listmore").prepend(str);
	});
	
});