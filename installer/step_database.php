<?php
$nextPage    = "step_success.php";
$currentPage = basename($_SERVER['SCRIPT_FILENAME']);
$error = false;


$action = trim($_POST['command']);
$errorMessage = null;
$hostname = "127.0.0.1";
$username = "";
$password = "";
$database = "dbname";
$driver   = "mysql";

if ($action == "test") {
	$hostname = trim($_POST['hostname']);
	$username = trim($_POST['username']);
	$password = trim($_POST['password']);
	$database = trim($_POST['database']);
	$driver   = trim($_POST['driver']);

    if($driver =="mysql"){
  	   $link = mysql_connect($hostname, $username, $password);
	   if (!$link) {
		  $errorMessage ="Could not connect to the server '" . $hostname . "'";
       	  $error = true;
	   }
	
	   if ($link && !$database) {
		   $errorMessage = "no database name was given";
		  /*
		  $db_list = mysql_list_dbs($link);
		  echo "<pre>\n";
		  while ($row = mysql_fetch_array($db_list)) {
     	  	echo $row['Database'] . "\n";
		  }
		  echo "</pre>\n";
		  */
	   }
	   if ($database) {
          $dbcheck = mysql_select_db("$database");
		  if (!$dbcheck) {
		    $errorMessage = "Unable to connect database '".$database."'";
        	$error = true;
		  }
	   }
	}
	if($error==false){
	    $config = file_get_contents("./templates/database.txt");
	    if($driver=="mysql"){
	       $config = str_replace("%HOSTNAME%", $hostname, $config);
	       $config = str_replace("%DATABASE%", "'".$database."'", $config);
	       $config = str_replace("%USERNAME%", $username, $config);
	       $config = str_replace("%PASSWORD%", $password, $config);
	       $config = str_replace("%DRIVER%",   "mysql", $config);
	    }
	    else if($driver=="sqlite"){
	       $database = '$path.\'/db/verside.sqlite\'';
	       $config = str_replace("%HOSTNAME%", "", $config);
	       $config = str_replace("%DATABASE%", '$path.\'/db/demo.sqlite\'', $config);
	       $config = str_replace("%USERNAME%", "", $config);
	       $config = str_replace("%PASSWORD%", "", $config);
	       $config = str_replace("%DRIVER%",   "sqlite", $config);
	    }
	    file_put_contents("../application/config/database.php", $config);
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
   Database Connection
</div>
<div class="subtitle">
  Enter your connection data or select an embedded database for demo.
</div>

<div class="wizard_step">
<form action="<?php echo $currentPage; ?>" method="post" id="connection_data">
<table>
<tr><td>
     <div class="input-box">
        <label for="prefix">Database Type</label><br>
        <select id="database_selection">
           <option selected="selected" value="mysql">MySQL</option>
           <option value="sqlite">Verside Inmemory Demo DB</option>
        </select>
    </div>
</td>
<td></td>
</tr>

<tr><td>
    <div class="input-box mysql_params" style="position:absolute">
        <label for="host">Host <span class="required">*</span></label><br>
        <input type="text" class="required-entry input-text" title="Database host" value="<?php echo $hostname?>" id="hostname" name="hostname">
        <p style="margin-top:4px; line-height:1.3em; color:#666;">
            <small>(You can specify server port, ex.: localhost:3307)</small>
        </p>
    </div>
    <div class="input-box demo_params" style="position:absolute">
       Using a SQLite demo database with some example screens. 
    </div>

</td>
<td>
    <div class="input-box mysql_params">
        <label for="dbname">Database Name <span class="required">*</span></label><br>
        <input type="text" class="required-entry input-text" title="Database Name" value="<?php echo $database?>" id="database" name="database">
    </div>
</td>
</tr>
<tr><td>
   <div class="input-box mysql_params">
        <label for="user">User Name <span class="required">*</span></label><br>
        <input type="text" class="required-entry input-text" title="Database user name" value="<?php echo $username?>" id="username" name="username">
    </div>
</td>
<td>
<div class="input-box mysql_params">
        <label for="password">User Password</label><br>
        <input type="password" class="input-text" title="Database user password" value="<?php echo $password?>" id="password" name="password">
    </div>
</td>

</tr>
</table>
       <input type="hidden" value="<?php echo $driver; ?>" name="driver" id="driver">
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
	   $("#connection_data").submit();// ="<?php echo $nextPage?>";
	});

	$("#database_selection").change(function(){
	  var driver = $("#database_selection").val();
	  if(driver==="mysql"){
	      $(".demo_params").fadeOut(300);
	      $(".mysql_params").fadeIn(300);
	  }
	  else{
	      $(".demo_params").fadeIn(300);
	      $(".mysql_params").fadeOut(300);
	  }
      $("#driver").val(driver);
	});
});
</script>
</body>

</html>

<?php 
} 
?>