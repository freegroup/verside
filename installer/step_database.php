<?php
$nextPage    = "step_database.php";
$currentPage = basename($_SERVER['SCRIPT_FILENAME']);



ini_set('max_execution_time', 0);
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
   Database Connection
</div>
<div class="subtitle">
   Database Connection
</div>

<div class="wizard_step">
            <div class="input-box">
                <label for="prefix">Database Type</label><br>
                <select>
                     <option selected="selected" value="mysql4">MySQL</option>
                </select>
            </div>
<br>
    <div class="input-box">
        <label for="host">Host <span class="required">*</span></label><br>
        <input type="text" class="required-entry input-text" title="Database host" value="localhost" id="host" name="connection[mysql4][db_host]">
        <p style="margin-top:4px; line-height:1.3em; color:#666;">
            <small>You can specify server port, ex.: localhost:3307<br>If you are not using default UNIX socket, you can specify it here instead of host, ex.: /var/run/mysqld/mysqld.sock</small>
        </p>
    </div>
    <div class="input-box">
        <label for="dbname">Database Name <span class="required">*</span></label><br>
        <input type="text" class="required-entry input-text" title="Database Name" value="magento" id="dbname" name="connection[mysql4][db_name]">
    </div>
<br>
   <div class="input-box">
        <label for="user">User Name <span class="required">*</span></label><br>
        <input type="text" class="required-entry input-text" title="Database user name" value="" id="user" name="connection[mysql4][db_user]">
    </div>
    <div class="input-box">
        <label for="password">User Password</label><br>
        <input type="password" class="input-text" title="Database user password" value="" id="password" name="connection[mysql4][db_pass]">
    </div>
<br>
    <div class="input-box">
        <label for="prefix">Tables Prefix</label><br>
        <input type="text" class="validate-data input-text" title="Tables Prefix" value="" id="prefix" name="connection[mysql4][db_prefix]">
        <p style="margin-top:4px; line-height:1.3em; color:#666;">
            <small>(Optional. Leave blank for no prefix)</small>
        </p>
    </div>


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

