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
			$("#errorpassword").text("请输入以字母、数字、_开头的6到16位字符，不支持中文").css("color","#FF4400");
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
});

