$(function(){
	$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
		console.log(data);
		var str="";
		$.each(data, function(index,item) {
			str+=`<tr>
					<td><input type="checkbox"/></td>
					<td><img src="${item.goodsListImg}"/>
						<p>${item.goodsName}</p>
					</td>
					<td>111</td>
					<td>${item.price}</td>
					<td>
						<div class="num_hid">
							<a href="#" class="addnum"></a>
							<input type="text" name="num_shop" id="num_shop" value="${item.number}"/>
							<a href="#" class="downnum"></a>
						</div>
					</td>
					<td>111</td>
					<td><a href="#">移除</a></td>
				</tr>`
		});
		$(".shop_list").append(str);
	});
});