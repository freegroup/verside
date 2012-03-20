<?php
$nextPage    = "step_database.php";
$currentPage = basename($_SERVER['SCRIPT_FILENAME']);
$error = false;


$filesToCheck[] = "application".DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."db".DIRECTORY_SEPARATOR."verside.sqlite";
$filesToCheck[] = "application".DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR."database.php";
$filesToCheck[] = "application".DIRECTORY_SEPARATOR."controllers".DIRECTORY_SEPARATOR."generated";
$filesToCheck[] = "application".DIRECTORY_SEPARATOR."models".DIRECTORY_SEPARATOR."generated";
$filesToCheck[] = "application".DIRECTORY_SEPARATOR."logs";
$filesToCheck[] = "assets".DIRECTORY_SEPARATOR."images";

$_REAL_BASE_DIR = realpath(dirname(dirname(__FILE__))).DIRECTORY_SEPARATOR; // filesystem path of this file's directory (config.php)
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
  Checking Filesystem permissions
</div>
<div class="subtitle">
  You can modify existing screens and as a matter of course, you can create new screens.
  <br>
  For this feature verside needs write permissions in some folders.  
</div>

<div class="wizard_step">
<table>
<tr>
<th>File Name</th><th>writeable</th><th>readable</th></tr>
<?php

foreach ( $filesToCheck as $fileName){
   $file = $_REAL_BASE_DIR.$fileName;
   echo "<tr>";
   echo "<td><span class='root_path'>".$_REAL_BASE_DIR."</span>".$fileName."</td>";
   if(!is_writeable($file)){
     echo "<td class='error_flag'>X</td>";
     $error = true;
     $nextPage = $currentPage;
   }
   else{	 
     echo "<td class='success_flag'>&#10004;</td>";
   }
   
   if(!is_readable($file)){
     echo "<td class='error_flag'>X</td>";
     $error = true;
     $nextPage = $currentPage;
   }
   else{	 
     echo "<td class='success_flag'>&#10004;</td>";
   }
   echo "</tr>";
}
?>
</table>
<?php
if($error){
	echo "<div class='error'>Please set all required settings before clicking Continue</div>";
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
	
	$("#buttonContinue").button().click(function(){
	   window.location.href ="<?php echo $nextPage?>";
	});
});
</script>
</body>

</html>

