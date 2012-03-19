<?php
$nextPage    = "step_database.php";
$currentPage = basename($_SERVER['SCRIPT_FILENAME']);

$filesToCheck[] = "application/config/db/verside.sqlite";
$filesToCheck[] = "application/controllers/generated";
$filesToCheck[] = "application/models/generated";
$filesToCheck[] = "application/logs";
$filesToCheck[] = "assets/images";


ini_set('max_execution_time', 0);

$_REAL_SCRIPT_DIR = realpath(dirname($_SERVER['SCRIPT_FILENAME'])); // filesystem path of this page's directory (page.php)
$_REAL_BASE_DIR = realpath(dirname(dirname(__FILE__))).DIRECTORY_SEPARATOR; // filesystem path of this file's directory (config.php)
$error = false;
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
   Welcome to Verside's Installation Wizard!
</div>
<div class="subtitle">
   Checking Filesystem permissions
</div>

<div class="wizard_step">
<table>
<td>File Name</td><td>writeable</td><td>readable</td></tr>
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
     echo "<td>&#10004;</td>";
   }
   
   if(!is_readable($file)){
     echo "<td class='error_flag'>X</td>";
     $error = true;
     $nextPage = $currentPage;
   }
   else{	 
     echo "<td>&#10004;</td>";
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

