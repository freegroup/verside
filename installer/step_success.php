<?php
$nextPage = "../index.php";

?>

<html>
<head>
<link type="text/css" rel="stylesheet" href="../css/aristo/jquery-ui-1.8.16.custom.css" />

<style>
<?php include("includes/style.css");?>
</style>

<script type="text/javascript" src="../js/lib/jquery-1.6.4.js"></script>
<script type="text/javascript" src="../js/lib/jquery-ui-1.8.16.custom.min.js"></script>

<script>
$(document).ready(function() {
});
</script>
</head>
<body>
<?php include("includes/header.html");?>
<div id="container_content">
<div class="title">
Installation done
</div>

<div class="wizard_step">

</div>
<div class="divider"></div>
<button id="buttonContinue">Start Application</button>
<div class="push"></div>
</div>
<script>

$(document).ready(function() {
	
	$("#buttonContinue").button().click(function(){
	   window.location.href ="<?php echo $nextPage?>";
	});
});
</script>
<?php include("includes/footer.html");?>

</body>

</html>

