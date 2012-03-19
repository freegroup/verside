<?php
$nextPage    = "step_database.php";
$currentPage = basename($_SERVER['SCRIPT_FILENAME']);

$error = false;
$phpVersion = "6.3.0";
$sqliteVersion ="2.8.0";

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
   Checking PHP version and configuration
</div>

<div class="wizard_step">
<table>
<tr><td>Configuration</td><td>Required</td><td>Existing</td><td></td></tr>
<?php

   echo "<tr>";
   echo "<td>PHP Version</td>";
   
   if (version_compare(PHP_VERSION, $phpVersion) >= 0) {
     echo "<td>".$phpVersion."</td><td>".PHP_VERSION."</td><td>&#10004;</td>";
   }
   else{	 
     echo "<td>".$phpVersion."</td><td>".PHP_VERSION."</td><td class='error_flag'>X</td>";
     $error = true;
     $nextPage = $currentPage;
   }
   echo "</tr>";



   echo "<tr>";
   echo "<td>SQLite Version</td>";
   if (version_compare(sqlite_libversion(), $sqliteVersion) >= 0) {
     echo "<td>".$sqliteVersion."</td><td>".sqlite_libversion()."</td><td>&#10004;</td>";
   }
   else{	 
     echo "<td>".$sqliteVersion."</td><td>".sqlite_libversion()."</td><td class='error_flag'>X</td>";
     $error = true;
     $nextPage = $currentPage;
   }
   echo "</tr>";


   echo "<tr>";
   echo "<td>PDO </td>";
   if (extension_loaded ('PDO' )) {
     echo "<td>installed</td><td>installed</td><td>&#10004;</td>";
   }
   else{	 
     echo "<td>installed</td><td>missed</td><td class='error_flag'>X</td>";
     $error = true;
     $nextPage = $currentPage;
   }
   echo "</tr>";


   echo "<td>PDO mySql </td>";
   if (extension_loaded ('pdo_mysql' )) {
     echo "<td>installed</td><td>installed</td><td>&#10004;</td>";
   }
   else{	 
     echo "<td>installed</td><td>missed</td><td class='error_flag'>X</td>";
     $error = true;
     $nextPage = $currentPage;
   }
   echo "</tr>";

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

