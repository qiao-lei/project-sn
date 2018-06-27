$(function(){
	var goodsid = location.search.split("=")[1];
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsid},function(data){
//		var str = `<img src="${data[0].goodsListImg}">
//					<p>${data[0].goodsName}</p>
//					<p>${data[0].price}</p>
//					<input type= "button" value="添加购物车">
//					`;
//		$(".list_xx").html(str);
		var str="";
//		console.log(JSON.parse(data[0].imgsUrl));
		var arrimg=JSON.parse(data[0].imgsUrl)
		for(var i=0;i<arrimg.length;i++){
			str+=`<img src="${arrimg[i]}">`;
		}
		$(".bottom_pic").html(str);
		$(".min_pic").append(`<img src="${arrimg[0]}">`);
		$(".max_pic").append(`<img src="${arrimg[0]}">`);
		$(".xx_right").html(`<p class="pname">${data[0].goodsName}</p><p class="pprice">￥${data[0].price}</p>`)
		.append(`<div class="xx_shop">
					<span>购买数量</span>
					<div class="num_hid">
						<a href="#" class="addnum"></a>
						<input type="text" name="num_shop" id="num_shop" />
						<a href="#" class="downnum"></a>
					</div>
					<div class="num_show"></div>
					<a href="#">加入购物车</a>
				</div>`);
	    $(".xx_shop>a").click(function(){
	    	console.log("aaaa");
	    	$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:data[0].goodsID},function(data){
	    		if(data==0){
	    			alert("添加失败！");
	    		}
	    		if(data==1){
	    			
	    		}
	    	});
	    });
	});
	$(".min_pic").mouseenter(function(){
		$(".min_kuai").show();
		$(".max_pic").show();
	});
	$(".min_pic").mouseleave(function(){
		$(".min_kuai").hide();
		$(".max_pic").hide();
	});
	$(".min_pic").mousemove(function(e){
		var evt= e||event;
		var xx = evt.pageX-$(".list_xx")[0].offsetLeft;
		var yy = evt.pageY-$(".list_xx")[0].offsetTop;
		var _left=xx-$(".min_kuai")[0].offsetWidth/2;
		var _top=yy-$(".min_kuai")[0].offsetHeight/2;
		var maxleft=$(".min_pic")[0].offsetWidth-$(".min_kuai")[0].offsetWidth;
		var maxtop=$(".min_pic")[0].offsetHeight-$(".min_kuai")[0].offsetHeight;
		if(_left<=0){
			_left=0;
		}
		if(_top<=0){
			_top=0;
		}
		if(_left>=maxleft){
			_left=maxleft;
		}
		if(_top>=maxtop){
			_top=maxtop;
		}
		$(".min_kuai")[0].style.left=_left+"px";
		$(".min_kuai")[0].style.top=_top+"px";
		$(".max_pic>img")[0].style.left=-_left*2+"px";
		$(".max_pic>img")[0].style.top=-_top*2+"px";
	});
});