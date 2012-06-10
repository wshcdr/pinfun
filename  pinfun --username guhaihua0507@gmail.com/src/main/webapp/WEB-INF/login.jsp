<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录</title>
<link href="css/css.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
	function login() {
		var id = document.getElementById('name').value;
		var psd = document.getElementById('password').value;
		if (id.length == 0) {
			alert('请输入用户名');
			return;
		}
		if (psd.length == 0) {
			alert('请输入密码');
			return;
		}
		
		document.form_login.submit();
	}
</script>
</head>
<body bgcolor="#ffffff" background="bg.gif" text="#000000">

<div align="center" style="height: 50;width: 100%;"></div>
<form name='form_login' action="login.do" method="post">

<table align="center">
	
	<tr>
	  <td align="right">用户名:</td>
	  <td align="left"><input type='text' name="name" id='name'></td>
	</tr>
	<tr>
	  <td align="right">密码:</td>
	  <td align="left"><input type='password' name="password" id='password'></td>
	</tr>
	<tr>
	  <td colspan="2" align="center">

	     <input type="button" value="登录" onclick="login()">
	     <a href="regist.jsp">注册</a>

	     

	     
	  </td>
	</tr>
 
</table>

</form>
</body>
</html>