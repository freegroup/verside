 <?php
  
 error_reporting(0);
 if(isset($_GET["dir"]))
 {
 	$dir = $_GET["dir"];
 	$dir = preg_replace('/[^0-9a-z\_\-]/i','',$dir);
 	
    highlight_file( "./".$dir."/run.php" ); 
 }
 ?>