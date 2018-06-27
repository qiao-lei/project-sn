$(function(){
	var goodsid = location.search.split("=")[1];
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsid},function(data){
		var str = `<img src="${data[0].goodsListImg}">
					<p>${data[0].goodsName}</p>
					<p>${data[0].price}</p>
					<input type= "button" value="添加购物车">
					`;
		$(".list_xx").html(str);
	});
});