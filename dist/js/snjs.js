"use strict";

$(function () {
	$("#wrap_foot").load("footer.html");
	var jsonzc = [{ "user": "aaaaa", "pass": "aaaaa" }, { "user": "bbbbb", "pass": "123123" }];
	var regname = /^[a-z0-9_-]{3,16}$/;
	var flag1 = false;
	var flag2 = false;
	$("#username").focus(function () {
		$("#errorname").text("");
		if (!regname.test($(this).val())) {
			$("#errorname").text("请输入以字母、数字、_开头的3到16位字符，不支持中文").css("color", "#FF4400");
		}
	});
	$("#password").focus(function () {
		if (!regname.test($(this).val())) {
			$("#errorpassword").text("请输入以字母、数字、_开头的5到16位字符，不支持中文").css("color", "#FF4400");
		}
	});
	$("#username").focusout(function () {
		if (regname.test($(this).val())) {
			for (var i = 0; i < jsonzc.length; i++) {
				console.log($(this).val() == jsonzc[i]["user"]);
				if ($(this).val() == jsonzc[i]["user"]) {
					$("#errorname").text("用户已存在！").css("color", "red");
					break;
				} else {
					$("#errorname").text("");
					flag1 = true;
				}
			}
		} else {
			flag1 = false;
			$("#errorname").text("格式不正确！").css("color", "red");
		}
	});
	$("#password").focusout(function () {
		if (regname.test($(this).val())) {
			$("#errorpassword").text("");
			flag2 = true;
		} else {
			flag2 = false;
			$("#errorpassword").text("格式不正确！").css("color", "red");
		}
	});
	$("#tijao").click(function () {
		$.get("http://datainfo.duapp.com/shopdata/userinfo.php", { status: "register", userID: $("#username").val(), password: $("#password").val() }, function (data) {
			data = JSON.parse(data);
			if (data == 0) {
				$("#errorname").text("用户已存在！").css("color", "red");
			} else if (data == 1) {
				location.href = "denglu.html";
			} else {
				$("#zhucefm").hide().parent().append("<div><a href='zhuce.html'>注册失败，请重试！</a></div>").css({ "height": "100px", "width": "990px", "text-align": "center", "font-size": "18px", "line-height": "100px" });
			}
		});
	});
	//		if(flag1==true&&flag2==true){
	//			$("#zhucefm").hide().parent().append("<div><a href='../index.html'>跳转到去首页</a></div>")
	//			.css({"height":"100px","width":"990px","text-align":"center","font-size":"18px","line-height":"100px"})
	//		}else{
	//			$("#errorname").text("用户名不能为空！").css("color","red");
	//		}

	//登录验证；wx_dl  zh_dl

	$(".login_top a").eq(0).click(function () {
		$(this).addClass("checkon").siblings().removeClass("checkon");
		$(".wx_dl").show();
		$(".zh_dl").hide();
	});
	$(".login_top a").eq(1).click(function () {
		$(this).addClass("checkon").siblings().removeClass("checkon");
		$(".wx_dl").hide();
		$(".zh_dl").show();
	});

	$("#dlbtn").click(function () {
		$.get("http://datainfo.duapp.com/shopdata/userinfo.php", { status: "login", userID: $("#userdl").val(), password: $("#passworddl").val() }, function (data) {
			data = JSON.parse(data);

			if (data == 0) {
				$("#dlerrorname").text("此用户不存在！").css("color", "red");
			} else if (data == 2) {
				$("#dlerrorpassword").text("密码不对!").css("color", "red");
			} else {
				$.cookie("username", data["userID"], { expires: 7, path: "/" });
				location.href = "index.html";
			}
		});
		//		for(var i=0;i<jsonzc.length;i++){
		//			if($("#userdl").val()==jsonzc[i]["user"]){
		//				$("#dlerrorname").text("");
		//				if($("#passworddl").val()==jsonzc[i]["pass"]){
		//					location.href="../index.html";
		//					
		//					break;
		//				}else{
		//					$("#dlerrorpassword").text("密码不对!").css("color","red");
		//					break;
		//				}
		//			}else{
		//				$("#dlerrorname").text("此用户不存在！").css("color","red");
		//			}
		//		}
	});
	$("#userdl").focus(function () {
		$("#dlerrorname").text("");
		$("#dlname label").css("background-position", "-82px -67px").next().removeAttr("placeholder");
	});
	$("#userdl").blur(function () {
		$("#dlname label").css("background-position", "-123px -67px");
	});
	$("#passworddl").focus(function () {
		$("#dlerrorpassword").text("");
		$("#dlpassword label").css("background-position", "-41px -67px").next().removeAttr("placeholder");
	});
	$("#passworddl").blur(function () {
		$("#dlpassword label").css("background-position", "0 -108px");
	});
	//div id="dlname" id="userdl" id="dlerrorname"
	//<div id="dlpassword" id="passworddl" id="dlerrorpassword"
	$("#dl_wang a").eq(0).click(function () {
		$("#dlerrorname").text("");
		$(this).hide().next().show();
		$("#userdl").attr({ placeholder: "手机号码" });
		$("#passworddl").attr({ placeholder: "短信验证码" }).parent().append("<a href='#'>获取验证码</a>");
	});
	$("#dl_wang a").eq(1).click(function () {
		$("#dlerrorname").text("");
		$(this).hide().prev().show();
		$("#passworddl").parent().find("a").remove();
		$("#userdl").attr({ placeholder: "用户名/QQ/微信/易付宝" });
		$("#passworddl").attr({ placeholder: "密码" });
	});
});

$(function () {
	var goodsid = location.search.split("=")[1];
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?", { goodsID: goodsid }, function (data) {
		//		var str = `<img src="${data[0].goodsListImg}">
		//					<p>${data[0].goodsName}</p>
		//					<p>${data[0].price}</p>
		//					<input type= "button" value="添加购物车">
		//					`;
		//		$(".list_xx").html(str);
		var str = "";
		//		console.log(JSON.parse(data[0].imgsUrl));
		var arrimg = JSON.parse(data[0].imgsUrl);
		for (var i = 0; i < arrimg.length; i++) {
			str += "<img src=\"" + arrimg[i] + "\">";
		}
		$(".bottom_pic").html(str);
		$(".min_pic").append("<img src=\"" + arrimg[0] + "\">");
		$(".max_pic").append("<img src=\"" + arrimg[0] + "\">");
		$(".xx_right").html("<p class=\"pname\">" + data[0].goodsName + "</p><p class=\"pprice\">\uFFE5" + data[0].price + "</p>").append("<div class=\"xx_shop\">\n\t\t\t\t\t<span>\u8D2D\u4E70\u6570\u91CF</span>\n\t\t\t\t\t<div class=\"num_hid\">\n\t\t\t\t\t\t<a href=\"#\" class=\"addnum\"></a>\n\t\t\t\t\t\t<input type=\"text\" name=\"num_shop\" id=\"num_shop\" />\n\t\t\t\t\t\t<a href=\"#\" class=\"downnum\"></a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"num_show\"></div>\n\t\t\t\t\t<a href=\"#\">\u52A0\u5165\u8D2D\u7269\u8F66</a>\n\t\t\t\t</div>");
		$(".xx_shop>a").click(function () {
			console.log("aaaa");
			$.get("http://datainfo.duapp.com/shopdata/updatecar.php", { userID: $.cookie("username"), goodsID: data[0].goodsID }, function (data) {
				if (data == 0) {
					alert("添加失败！");
				}
				if (data == 1) {}
			});
		});
	});
	$(".min_pic").mouseenter(function () {
		$(".min_kuai").show();
		$(".max_pic").show();
	});
	$(".min_pic").mouseleave(function () {
		$(".min_kuai").hide();
		$(".max_pic").hide();
	});
	$(".min_pic").mousemove(function (e) {
		var evt = e || event;
		var xx = evt.pageX - $(".list_xx")[0].offsetLeft;
		var yy = evt.pageY - $(".list_xx")[0].offsetTop;
		var _left = xx - $(".min_kuai")[0].offsetWidth / 2;
		var _top = yy - $(".min_kuai")[0].offsetHeight / 2;
		var maxleft = $(".min_pic")[0].offsetWidth - $(".min_kuai")[0].offsetWidth;
		var maxtop = $(".min_pic")[0].offsetHeight - $(".min_kuai")[0].offsetHeight;
		if (_left <= 0) {
			_left = 0;
		}
		if (_top <= 0) {
			_top = 0;
		}
		if (_left >= maxleft) {
			_left = maxleft;
		}
		if (_top >= maxtop) {
			_top = maxtop;
		}
		$(".min_kuai")[0].style.left = _left + "px";
		$(".min_kuai")[0].style.top = _top + "px";
		$(".max_pic>img")[0].style.left = -_left * 2 + "px";
		$(".max_pic>img")[0].style.top = -_top * 2 + "px";
	});
});
;(function () {
	//	console.log("aaaa");
})();
$(function () {
	$("#wrap_foot").load("footer.html");
	$(".hoverul").mouseover(function () {
		$(this).children().eq(1).show();
	});
	$(".hoverul").mouseout(function () {
		$(this).children().eq(1).hide();
	});
	$(".brimg1").mouseenter(function () {
		$(this).parent().parent().stop().animate({ width: $(".brimg2").outerWidth() + $(this).outerWidth() }, 500);
	});
	$(".ban_right").mouseleave(function () {
		$(this).stop().animate({ width: $(".brimg1").outerWidth() }, 500);
	});

	//	搜索框
	$(".soso_result>i").click(function () {
		$(this).parent().hide();
	});
	$("#soname").focus(function () {
		$(".soso_result").show();
	});
	$("#soname").blur(function () {
		$(".soso_result").hide();
	});
	$("#soname").on("input", function () {
		$(".result").html("");
		$.ajax({
			type: "get",
			url: "https://ds.suning.cn/ds/his/new/-" + $(this).val() + "-0-1_0-autoComplateCallback_184b31b125a59d8c382d3d8382d23350.jsonp",
			dataType: "jsonp",
			jsonpCallback: "autoComplateCallback_184b31b125a59d8c382d3d8382d23350",
			async: true,
			success: function success(data) {
				for (var i = 0; i < data["words"].length; i++) {
					var $li = $("<li></li>");
					$li.append(data["words"][i]["keyname"]);
					$(".result").append($li);
				}
			}
		});
	});
	//固定搜索框；
	//	$(".header").append($(".index_all").clone(true).addClass("index_all")).append($(".sousuo_nei").clone(true).addClass("sousuo_nei"));

	$.ajax({
		type: "get",
		url: "https://lib.suning.com/homepage/model/homepage1_326191_lazyload326191.json",
		dataType: "jsonp",
		jsonpCallback: "lazyload326191",
		async: true,
		success: function success(data) {
			$(".product_wrap").append(data["data"]);
			$("img").each(function () {
				$(this).attr("src", $(this).attr("lazy-src"));
			});
		}
	});
	//https://lib.suning.com/homepage/model/homepage1_326445_lazyload326445.json?callback=lazyload326445&_=1530025564371
	$.ajax({
		type: "get",
		url: "https://lib.suning.com/homepage/model/homepage1_326445_lazyload326445.json",
		dataType: "jsonp",
		jsonpCallback: "lazyload326445",
		async: true,
		success: function success(data) {
			$(".meiwei_wrap").append(data["data"]);
			$("img").each(function () {
				$(this).attr("src", $(this).attr("lazy-src"));
			});
		}
	});
	//https://lib.suning.com/homepage/model/homepage1_326446_lazyload326446.json?callback=lazyload326446&_=1530025591073
	$.ajax({
		type: "get",
		url: "https://lib.suning.com/homepage/model/homepage1_326446_lazyload326446.json",
		dataType: "jsonp",
		jsonpCallback: "lazyload326446",
		async: true,
		success: function success(data) {
			$(".mm_wrap").append(data["data"]);
			$("img").each(function () {
				$(this).attr("src", $(this).attr("lazy-src"));
			});
		}
	});
	//	全部商品菜单
	$.ajax({
		type: "get",
		url: "https://lib.suning.com/api/jsonp/cb/sortList_v6-threeSortLoad.jsonp",
		async: true,
		dataType: "jsonp",
		jsonpCallback: "threeSortLoad",
		success: function success(data) {
			var result = data["allsort"]["nodes"];
			for (var i = 0; i < result.length; i++) {
				var lilist = $("<li><i></i></li>");
				for (var k = 0; k < result[i]["nodes"][0]["tag"].length; k++) {
					lilist.append("<a href='#'>" + result[i]['nodes'][0]['tag'][k]['elementName'] + "</a><em>|&nbsp;</em>");
					//					lilist.append(result[i]['nodes'][0]['tag'][k]['elementName']);
				}
				$(".list_list").append(lilist).find("em").last().remove();
			}
			$(".list_list>li>em").last().remove();
			$(".list_list>li").mouseenter(function () {
				$(".list_detal").html("").stop().animate({ width: "999px" }, 300);
				var index = $(this).index();
				var $div = $("<div class='detal_title'></div");
				for (var i = 0; i < result[index]["nodes"][1]["tag"].length; i++) {
					$div.append("<a href='#'>" + result[index]["nodes"][1]["tag"][i]["elementName"] + "</a>");
				}
				var $condiv = $("<ul class='detal_con'></ul>");
				$.get("http://datainfo.duapp.com/shopdata/getclass.php", function (data) {
					data = JSON.parse(data);
					console.log(data);
					var str = "";
					$.each(data, function (index, item) {
						str += "<li><a href=\"list.html?classID=" + item.classID + "\">" + item.className + "<a></li>";
					});
					$condiv.html(str);
				});
				$(".list_detal").append($div).append($condiv);
			});

			$(".list_detal").mouseleave(function () {
				$(this).stop().animate({ width: 0 }, 300);
			});
		}
	});
	var $ul = $("<ul></ul>");
	$(".ban_con").append($ul);
	function bannerpp(data) {
		var $li = $("<li></li>");
		$li.css("background", data[0]["tone"]).append("<a href='#'><img src='" + data[0]["adSrc"] + "'/><a>");
		for (var i = 1; i < data.length; i++) {
			var $div = $("<div><div></div></div>");
			$div.append("<a href='#'><p class='img_name'>" + data[i]["title"] + "</p><p class='img_desc'>" + data[i]["subtitle"] + "</p><img src='" + data[i]["adSrc"] + "'/></a>");
			$li.append($div);
		}
		$li.children().last().addClass("little");
		$ul.append($li);
	}
	function bannernum(num) {
		for (var i = 0; i < num.length; i++) {
			$.ajax({
				type: "get",
				url: num[i],
				async: true,
				dataType: "jsonp",
				success: function success(data) {
					bannerpp(data);
					$(".ban_nav").append("<a href='#'></a>");
					$(".ban_nav a").eq(0).addClass("current");
				}
			});
		}
	}
	var arrurl = ["https://th.suning.com/getCpmDatasGroup?pid=300000005&pid=100003449&pid=100003450&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000004&pid=100003446&pid=100003447&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000006&pid=100003452&pid=100003453&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000026&pid=100003455&pid=100003456&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000007&pid=100003449&pid=100003450&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000008&pid=100003446&pid=100003447&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000003&pid=100003452&pid=100003453&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000026&pid=100003455&pid=100003456&screenType=w"];
	bannernum(arrurl);
	var count = 0;
	function bannmove() {
		count++;
		if (count == $(".ban_con ul>li").length) {
			count = 0;
		}
		if (count == -1) {
			count = $(".ban_con ul>li").length - 1;
		}
		$(".ban_con ul>li").hide().eq(count).show();
		$(".ban_nav a").removeClass("current").eq(count).addClass("current");
	}
	var timer = setInterval(function () {
		bannmove();
	}, 3000);
	$(".banner").mouseover(function () {
		clearInterval(timer);
		$(".ban_nav a").mouseover(function () {
			$(this).addClass("current");
			count = $(this).index() - 1;
			bannmove();
		});
	});
	$(".banner").mouseout(function () {
		timer = setInterval(function () {
			bannmove();
		}, 3000);
	});
	$(".btn_left").click(function () {
		count -= 2;
		bannmove();
	});
	$(".btn_right").click(function () {
		bannmove();
	});
});
//聚惠好货部分https://ju.suning.com/ajax/getCommListForCmsJsonp_LFHFYSY__PC_15_yscb.html，
$(function () {
	$.ajax({
		type: "get",
		url: "https://ju.suning.com/ajax/getCommListForCmsJsonp_LFHFYSY__PC_15_yscb.html",
		dataType: "jsonp",
		jsonpCallback: "yscb",
		async: true,
		success: function success(data) {
			//			$(".ju_ul");
			var arrlist = data["commInfoList"];
			for (var i = 0; i < arrlist.length; i++) {
				var $julist = $("<li></li>");
				$julist.append("<a href=\"#\">\n\t\t\t\t\t\t\t\t<img src=\"" + arrlist[i]['grppurDetailUrl'] + "\"/>\n\t\t\t\t\t\t\t\t<p class=\"name\">" + arrlist[i]['grppurName'] + "</p>\n\t\t\t\t\t\t\t\t<p class=\"ju_price\">\n\t\t\t\t\t\t\t\t\t<span class=\"price\">\n\t\t\t\t\t\t\t\t\t\t<i>\uFFE5</i>\n\t\t\t\t\t\t\t\t\t\t<em>" + arrlist[i]['gbPrice'] + "</em>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t<span class=\"line\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t");
				$(".ju_ul").append($julist);
			}
			$(".ju_ul").width(arrlist.length * 200);
		}
	});
	//	好或部分
	(function () {
		for (var i = 0; i < 6; i++) {
			var $li = $("<li></li>");
			$li.append("\n\t\t\t\t<a href=\"#\">\n\t\t\t\t\t<p>\u827E\u56E0\u513F\u7AE5\u6905</p>\n\t\t\t\t\t<p>382\u4EBA\u8BF4\u597D</p>\n\t\t\t\t\t<img src=\"https://image3.suning.cn/uimg/b2c/qrqm/0000000000000000000141604532_200x200.jpg?ver=2004&from=mobile\"/>\n\t\t\t\t\t</a>\n\t\t\t\t");
			$(".hh_ul").append($li);
		}
		$(".hh_ul li:odd").css("border-right", "none");
	})();
});

$(function () {
	var classid = location.search.split("=")[1];
	$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?", { classID: classid }, function (data) {
		//		data=JSON.parse(data);
		var str = "";
		$.each(data, function (index, item) {
			str += "<div>\n\t\t\t\t\t<a href=\"xiangxi.html?id=" + item.goodsID + "\">\n\t\t\t\t\t<img src=\"" + item.goodsListImg + "\">\n\t\t\t\t\t<p>" + item.goodsName + "</p>\n\t\t\t\t\t<p>\uFFE5" + item.price + "</p>\n\t\t\t\t\t</a>\n\t\t\t\t\t</div>";
		});
		$(".listmore").html(str);
	});
});