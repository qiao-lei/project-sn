$(function(){
	
	$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
//		console.log(data);
		var str="";
		$.each(data, function(index,item) {
			var price=item.price*item.number;
			
			str+=`<tr data-id="${item.goodsID}">
					<td><input class="checkbox_c" type="checkbox"/></td>
					<td><img src="${item.goodsListImg}"/>
						<p><a href="xiangxi.html?id=${item.goodsID}">${item.goodsName}</a></p>
					</td>
					<td>111</td>
					<td><span class="d_price">${item.price}</span></td>
					<td>
						<div class="num_hid">
							<a href="javascript:void(0)" class="addnum"></a>
							<input type="text" class="num_shop" value="${item.number}" disabled="disabled"/>
							<a href="javascript:void(0)" class="downnum"></a>
						</div>
					</td>
					<td><span class="p_price">${price}</span></td>
					<td><a href="javascript:void(0)" class="delete_shop">移除</a></td>
				</tr>`
		});
		$(".shop_list").append(str);
		$("input[type='checkbox']").prop("checked",true);
		function isDigit(){
			var summ=0;
			var zprice=0;
			$(".checkbox_c:checked").each(function(){
				summ+=parseInt($(".num_shop").eq($(this).index(".checkbox_c")).val());
				zprice+=parseFloat($(".p_price").eq($(this).index(".checkbox_c")).text());
			});
			$(".num_all").text(summ);
			$(".price_all").text(zprice);
		}
		isDigit();
	 	$("#checkall").click(function(){
	 		$(".checkbox_c").prop("checked",$(this).prop("checked"));
			isDigit();
	 	});
		$(".checkbox_c").click(function(){
			if($(".checkbox_c:checked").length==$(".checkbox_c").length){
				$("#checkall").prop("checked",true);
			}else{
				$("#checkall").prop("checked",false);
			}
			isDigit();
		});
//		数量加
		$(".downnum").click(function(){
			var dprice=$(".d_price").eq($(this).index(".downnum")).text();
			var numadd=$(this).prev().val();
			numadd++;
			$(this).prev().val(numadd);
			$(".p_price").eq($(this).index(".downnum")).text(parseFloat(dprice)*numadd);
//			console.log($(this).prev().val());
			isDigit();
//			console.log($(this).parents("tr").attr("data-id"));
			
		});
//		数量减
		$(".addnum").click(function(){
			var dprice=$(".d_price").eq($(this).index(".addnum")).text();
			var numdown=$(this).next().val();
			numdown--;
			if(numdown<=0){
				numdown=0;
			}
			$(this).next().val(numdown);
			$(".p_price").eq($(this).index(".addnum")).text(parseFloat(dprice)*numdown);
			isDigit();
		});
//		删除数据
		$(".delete_shop").click(function(){
			$(this).parent().parent().remove();
			var goodsid=$(this).parent().parent().attr("data-id")
//			console.log($(this).parent().parent().attr("data-id"));
			isDigit();
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:goodsid,number:0},function(data){
				if(data==1){
					
				}
				if(data==0){
					location.reload();
				}
			});
		});
//		付款
		$(".pay_pay").click(function(){
			$(".checkbox_c").each(function(){
				var goodsid=$(this).parent().parent().attr("data-id");
				var num=$(this).parent().parent().find(".num_shop").val();
//				console.log($(this).parent().parent().attr("data-id"));
//				console.log($(this).parent().parent().find(".num_shop").val());
				$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:goodsid,number:num},function(data){
					if(data==1){
						alert("钱已付，坐等收货啦啦啦啦！");
					}
					if(data==0){
						alert("付款失败！")
					}
				});
			});
		});
	});
});