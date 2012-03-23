<?php

require_once('../application/libraries/phpass-0.3/PasswordHash.php');

$nextPage    = "step_success.php";
$currentPage = basename($_SERVER['SCRIPT_FILENAME']);
$error = false;
$currentDir = realpath(dirname(__FILE__)).DIRECTORY_SEPARATOR; // filesystem path of this file's directory (config.php)
$parentDir = realpath(dirname(dirname(__FILE__))).DIRECTORY_SEPARATOR; // filesystem path of this file's directory (config.php)

$action = trim($_POST['command']);
$errorMessage = null;
$username = "";
$password = "";

if ($action == "test") {
	$username = trim($_POST['username']);
	$password   = trim($_POST['password']);

    if($username !="" && $password!=""){

// Connect to the database with PDO
try {
    $db = new PDO('sqlite:'.$parentDir .'/application/config/db/verside.sqlite');
} catch (Exception $e) {
    die ($e);
}
 
    try {
    		//Hash user_pass using phpass
		$hasher = new PasswordHash(8, true);
		$user_pass_hashed = $hasher->HashPassword($password);

	
        // Create a prepared statement
        $stmt = $db->prepare("INSERT INTO user (username, password) VALUES (:username, :password);");
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $user_pass_hashed);
 
        $stmt->execute();
    } catch (Exception $e) {
        die ($e);
    }

         ?>
		<html>
		<head>
		<meta http-equiv="REFRESH" content="0;url=<?php echo $nextPage; ?>">
		</head>
		</html>
		<?php
	}
	
}
else{
?>

<html>
<head>

<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />

<link type="text/css" rel="stylesheet" href="../css/aristo/jquery-ui-1.8.16.custom.css" />

<style>
<?php include("includes/style.css");?>
</style>

<script type="text/javascript" src="../js/lib/jquery-1.6.4.js"></script>
<script type="text/javascript" src="../js/lib/jquery-ui-1.8.16.custom.min.js"></script>


</head>
<body>
<?php include("includes/header.html");?>
<div id="container_content">
<div class="title">
   Add an initial User Account
</div>

<div class="wizard_step">
<form action="<?php echo $currentPage; ?>" method="post" id="connection_data">
<table style="padding:30px">

<tr><td>
   <div class="input-box mysql_params">
        <label for="user">User Name <span class="required">*</span></label><br>
        <input autocomplete="off" type="text" class="required-entry input-text" title="Database user name" value="<?php echo $username?>" id="username" name="username">
    </div>
</td>
<tr>
</tr>
<td>
<div class="input-box mysql_params">
        <label for="password">User Password</label><br>
        <input autocomplete="off" type="password" class="input-text" title="Database user password" value="<?php echo $password?>" id="password" name="password">
    </div>
</td>
</tr>
</table>
       <input type="hidden" value="test" name="command">
</form>
<?php
if($error){
	echo "<div class='error'>".$errorMessage."</div>";
}
?>
</div>

<div class="divider"></div>

<button id="buttonContinue">Continue</button>
<div class="push"></div>

</div>

<?php include("includes/footer.html");?>

<script>

$(document).ready(function() {
	
    $(".demo_params").hide();
	$("#buttonContinue").button().click(function(){
	   $("#connection_data").submit();
	});

});
</script>
</body>

</html>

<?php 
} 
?>