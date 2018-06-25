$(function(){
	$("#wrap_foot").load("footer.html");
	var jsonzc=[{"user":"aaaaa","pass":"aaaaa"},{"user":"bbbbb","pass":"123123"}];
	var regname=/^[a-z0-9_-]{3,16}$/;
	var flag1=false;
	var flag2=false;
	$("#username").focus(function(){
		if(!regname.test($(this).val())){
			$("#errorname").text("请输入以字母、数字、_开头的3到16位字符，不支持中文").css("color","#FF4400");
		}
	});
	$("#password").focus(function(){
		if(!regname.test($(this).val())){
			$("#errorpassword").text("请输入以字母、数字、_开头的5到16位字符，不支持中文").css("color","#FF4400");
		}
	});
	$("#username").focusout(function(){
		if(regname.test($(this).val())){
			for(var i=0;i<jsonzc.length;i++){
				console.log($(this).val()==jsonzc[i]["user"]);
				if($(this).val()==jsonzc[i]["user"]){
					$("#errorname").text("用户已存在！").css("color","red");
					break;
				}else{
					$("#errorname").text("");
					flag1=true;
				}
			}
		}else{
			flag1=false;
			$("#errorname").text("格式不正确！").css("color","red");
		}
	});
	$("#password").focusout(function(){
		if(regname.test($(this).val())){
			$("#errorpassword").text("");
			flag2=true;
		}else{
			flag2=false;
			$("#errorpassword").text("格式不正确！").css("color","red");
		}
	});
	$("#tijao").click(function(){
		if(flag1==true&&flag2==true){
			$("#zhucefm").hide().parent().append("<div><a href='../index.html'>跳转到去首页</a></div>")
			.css({"height":"100px","width":"990px","text-align":"center","font-size":"18px","line-height":"100px"})
		}else{
			$("#errorname").text("用户名不能为空！").css("color","red");
		}
	});
//登录验证；wx_dl  zh_dl
	
	$(".login_top a").eq(0).click(function(){
		$(this).addClass("checkon").siblings().removeClass("checkon");
		$(".wx_dl").show();
		$(".zh_dl").hide();
	});
	$(".login_top a").eq(1).click(function(){
		$(this).addClass("checkon").siblings().removeClass("checkon");
		$(".wx_dl").hide();
		$(".zh_dl").show();
	});
	
	$("#dlbtn").click(function(){
		for(var i=0;i<jsonzc.length;i++){
			if($("#userdl").val()==jsonzc[i]["user"]){
				$("#dlerrorname").text("");
				if($("#passworddl").val()==jsonzc[i]["pass"]){
					location.href="../index.html";
					
					break;
				}else{
					$("#dlerrorpassword").text("密码不对!").css("color","red");
					break;
				}
			}else{
				$("#dlerrorname").text("此用户不存在！").css("color","red");
			}
		}
	});
	$("#userdl").focus(function(){
		$("#dlerrorname").text("");
		$("#dlname label").css("background-position","-82px -67px")
		.next().removeAttr("placeholder");
		
	});
	$("#userdl").blur(function(){
		$("#dlname label").css("background-position","-123px -67px");
	});
	$("#passworddl").focus(function(){
		$("#dlerrorpassword").text("");
		$("#dlpassword label").css("background-position","-41px -67px")
		.next().removeAttr("placeholder");
	});
	$("#passworddl").blur(function(){
		$("#dlpassword label").css("background-position","0 -108px");
	});
	//div id="dlname" id="userdl" id="dlerrorname"
	//<div id="dlpassword" id="passworddl" id="dlerrorpassword"
	$("#dl_wang a").eq(0).click(function(){
		$("#dlerrorname").text("");
		$(this).hide().next().show();
		$("#userdl").attr({placeholder:"手机号码"});
		$("#passworddl").attr({placeholder:"短信验证码"}).parent()
		.append("<a href='#'>获取验证码</a>");
	});
	$("#dl_wang a").eq(1).click(function(){
		$("#dlerrorname").text("");
		$(this).hide().prev().show();
		$("#passworddl").parent().find("a").remove();
		$("#userdl").attr({placeholder:"用户名/QQ/微信/易付宝"});
		$("#passworddl").attr({placeholder:"密码"});
	});
});


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