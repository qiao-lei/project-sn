"use strict";

$(function () {
	$("#wrap_foot").load("footer.html");
	var jsonzc = [{ "user": "aaaaa", "pass": "aaaaa" }, { "user": "bbbbb", "pass": "123123" }];
	var regname = /^[a-z0-9_-]{3,16}$/;
	var flag1 = false;
	var flag2 = false;
	$("#username").focus(function () {
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
		if (flag1 == true && flag2 == true) {
			$("#zhucefm").hide().parent().append("<div><a href='../index.html'>跳转到去首页</a></div>").css({ "height": "100px", "width": "990px", "text-align": "center", "font-size": "18px", "line-height": "100px" });
		} else {
			$("#errorname").text("用户名不能为空！").css("color", "red");
		}
	});
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
		for (var i = 0; i < jsonzc.length; i++) {
			if ($("#userdl").val() == jsonzc[i]["user"]) {
				$("#dlerrorname").text("");
				if ($("#passworddl").val() == jsonzc[i]["pass"]) {
					location.href = "../index.html";

					break;
				} else {
					$("#dlerrorpassword").text("密码不对!").css("color", "red");
					break;
				}
			} else {
				$("#dlerrorname").text("此用户不存在！").css("color", "red");
			}
		}
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

;(function () {
	//	console.log("aaaa");
})();
$(function () {
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
			$(".ban_nav").append("<a href=''></a>");
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
				}
			});
		}
	}
	var arrurl = ["https://th.suning.com/getCpmDatasGroup?pid=300000005&pid=100003449&pid=100003450&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000004&pid=100003446&pid=100003447&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000006&pid=100003452&pid=100003453&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000026&pid=100003455&pid=100003456&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000007&pid=100003449&pid=100003450&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000008&pid=100003446&pid=100003447&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000003&pid=100003452&pid=100003453&screenType=w", "https://th.suning.com/getCpmDatasGroup?pid=300000026&pid=100003455&pid=100003456&screenType=w"];
	bannernum(arrurl);
	var count = 0;
	var timer = setInterval(function () {
		count++;
		if (count > $(".ban_con ul>li").length - 1) {
			count = 0;
		}
		$(".ban_con ul>li").hide().eq(count).show();
		$(".ban_nav a").removeClass("current").eq(count).addClass("current");
	}, 3000);
});