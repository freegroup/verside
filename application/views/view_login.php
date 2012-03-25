<html>
<head>
  <title>Login Page</title>
  <base href="<?php echo base_url() ?>" />
  
   <link type="text/css" rel="stylesheet" href="css/aristo/jquery-ui-1.8.16.custom.css" />
   <link type="text/css" rel="stylesheet/less" href="css/core_login.less" />
   <script type="text/javascript" src="js/lib/jquery-1.6.4.js"></script>
   <script type="text/javascript" src="js/lib/jquery-ui-1.8.16.custom.min.js"></script>
   <script type="text/javascript" src="js/lib/jquery-inputhints.js"></script>
   
   <script type="text/javascript" src="js/lib/less-1.2.2.js"></script>

<script>
$(document).ready(function() {
    $('input[title]').ezpz_hint();
    $("#username").focus();
	$("#submitForm").button().click(function(e){
	    var username=$("#username").val();
	    var password=$("#password").val();
	    $.getJSON("index.php/controller_core_secure/login/"+username+"/"+password,function(){
			window.location.href="./";
	    });
		e.preventDefault();
	});
	$("#fork_banner").click(function(e){
		window.open("https://github.com/freegroup/verside");
	});
});
</script>

</head>

<body>
   <div id="registration">
      <h2><img src="images/logo.png" height="50">Login</h2>
      <form id="registerUserForm">
      	  <fieldset>
      		<p><input title="username" autocomplete="off" class="textfield" id="username"  type="text" required="required" />  </p>
      		<p><input title="password" autocomplete="off" class="textfield" id="password"  type="password"  required="required" /></p>
      		<p><button id="submitForm" />Login</button></p>
          </fieldset>
      </form>
	</div>

<div id="footer">
Help Us to Keep Verside Healthy - <a href="https://github.com/freegroup/verside/issues" target="_new">Report All Bugs</a>
</div>

<img id="fork_banner" src="images/fork_me_banner.png">
</body>
</html>