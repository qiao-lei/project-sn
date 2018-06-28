;(function(){
//	console.log("aaaa");
})();
$(function(){
	$("#wrap_foot").load("footer.html");
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
	
//	搜索框
	$(".soso_result>i").click(function(){
		$(this).parent().hide();
	});
	$("#soname").focus(function(){
		$(".soso_result").show();
	});
	$("#soname").blur(function(){
		$(".soso_result").hide();
	});
	$("#soname").on("input",function(){
		$(".result").html("");
		$.ajax({
			type:"get",
			url:"https://ds.suning.cn/ds/his/new/-"+$(this).val()+"-0-1_0-autoComplateCallback_184b31b125a59d8c382d3d8382d23350.jsonp",
			dataType:"jsonp",
			jsonpCallback:"autoComplateCallback_184b31b125a59d8c382d3d8382d23350",
			async:true,
			success:function(data){
				for(var i=0;i<data["words"].length;i++){
					var $li=$("<li></li>");
					$li.append(data["words"][i]["keyname"]);
					$(".result").append($li);
				}
			}
		});
	});
	//固定搜索框；
//	$(".header").append($(".index_all").clone(true).addClass("index_all")).append($(".sousuo_nei").clone(true).addClass("sousuo_nei"));
	
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
	//https://lib.suning.com/homepage/model/homepage1_326445_lazyload326445.json?callback=lazyload326445&_=1530025564371
	$.ajax({
		type:"get",
		url:"https://lib.suning.com/homepage/model/homepage1_326445_lazyload326445.json",
		dataType:"jsonp",
		jsonpCallback:"lazyload326445",
		async:true,
		success:function(data){
			$(".meiwei_wrap").append(data["data"]);
			$("img").each(function(){
			$(this).attr("src",$(this).attr("lazy-src"));
			});
		}
	});
	//https://lib.suning.com/homepage/model/homepage1_326446_lazyload326446.json?callback=lazyload326446&_=1530025591073
	$.ajax({
		type:"get",
		url:"https://lib.suning.com/homepage/model/homepage1_326446_lazyload326446.json",
		dataType:"jsonp",
		jsonpCallback:"lazyload326446",
		async:true,
		success:function(data){
			$(".mm_wrap").append(data["data"]);
			$("img").each(function(){
			$(this).attr("src",$(this).attr("lazy-src"));
			});
		}
	});
//	全部商品菜单
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
			$(".list_list>li").mouseenter(function(){
				$(".list_detal").html("").stop().animate({width:"999px"},300);
			   	var index=$(this).index();
			   var $div=$("<div class='detal_title'></div");
				for(var i=0;i<result[index]["nodes"][1]["tag"].length;i++){
					$div.append("<a href='#'>"+result[index]["nodes"][1]["tag"][i]["elementName"]+"</a>");
				}
				var $condiv=$("<ul class='detal_con'></ul>");
				$.get("http://datainfo.duapp.com/shopdata/getclass.php",function(data){
					data=JSON.parse(data);
//					console.log(data)
					var str="";
					$.each(data, function(index,item) {
						str+=`<li><a href="list.html?classID=${item.classID}">${item.className}<a></li>`;
					});
					$condiv.html(str);
				});
				$(".list_detal").append($div).append($condiv);
			});
			
			$(".list_detal").mouseleave(function(){
				$(this).stop().animate({width:0},300);
			});
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
					$(".ban_nav").append("<a href='#'></a>");
					$(".ban_nav a").eq(0).addClass("current");
					
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
	function bannmove(){
		count++;
		if(count==$(".ban_con ul>li").length){
			count=0;
		}
		if(count==-1){
			count=$(".ban_con ul>li").length-1;
		}
		$(".ban_con ul>li").hide().eq(count).show();
		$(".ban_nav a").removeClass("current").eq(count).addClass("current");
	}
	var timer = setInterval(function(){
		bannmove();
	},3000);
	$(".banner").mouseover(function(){
		clearInterval(timer);
		$(".ban_nav a").mouseover(function(){
			$(this).addClass("current");
			count=$(this).index()-1;
			bannmove();
		});
	});
	$(".banner").mouseout(function(){
		timer=setInterval(function(){
			bannmove();
		},3000);
	});
	$(".btn_left").click(function(){
		count-=2;
		bannmove();
	});
	$(".btn_right").click(function(){
		bannmove();
	});

});
//聚惠好货部分https://ju.suning.com/ajax/getCommListForCmsJsonp_LFHFYSY__PC_15_yscb.html，
$(function(){
	$.ajax({
		type:"get",
		url:"https://ju.suning.com/ajax/getCommListForCmsJsonp_LFHFYSY__PC_15_yscb.html",
		dataType:"jsonp",
		jsonpCallback:"yscb",
		async:true,
		success:function(data){
//			$(".ju_ul");
			var arrlist=data["commInfoList"];
			for(var i=0;i<arrlist.length;i++){
				var $julist=$("<li></li>");
				$julist.append(`<a href="#">
								<img src="${arrlist[i]['grppurDetailUrl']}"/>
								<p class="name">${arrlist[i]['grppurName']}</p>
								<p class="ju_price">
									<span class="price">
										<i>￥</i>
										<em>${arrlist[i]['gbPrice']}</em>
									</span>
								</p>
								<span class="line"></span>
							</a>
					`);
				$(".ju_ul").append($julist);	
			}
			$(".ju_ul").width(arrlist.length*200);
		}
	});
//	好或部分
	(function(){
		for(var i=0;i<6;i++){
			var $li=$("<li></li>");
			$li.append(`
				<a href="#">
					<p>艾因儿童椅</p>
					<p>382人说好</p>
					<img src="https://image3.suning.cn/uimg/b2c/qrqm/0000000000000000000141604532_200x200.jpg?ver=2004&from=mobile"/>
					</a>
				`);
			$(".hh_ul").append($li);	
		}
		$(".hh_ul li:odd").css("border-right","none");
	})();
});
