<?php
ob_start();
session_start();

require_once('../../configuration/configuration.php');
require_once("../includes.php");

StaticLogger::setLevel(LogLevel::$DEBUG);

$fileName = $_GET["xml"];

if($PHPBLOCKS_DEMO==true && isset($_SESSION[$SESSION_DEMO_CONTENT_KEY.$fileName]))
{
   $xml = simplexml_load_string($_SESSION[$SESSION_DEMO_CONTENT_KEY.$fileName]);
}
else 
{
   $filePath = "../../data/".$fileName;
   $xml = simplexml_load_file(utf8_encode($filePath));
}

$definedVars = Interpreter::getUsedVariables($xml);

// 1.) This is the initial entry point
//
// show the form with the input fields for the used variables.
// the user can preset the variables for test purpose.
//
if(empty($_POST) || !isset($_POST["flow_execute"]))
{
    header('Content-type: text/html');
	?>
	<html>
	<body>
	<form method="post">
	  <table>
	  <?php 
	  foreach ($definedVars as $var)
	  {
	  	echo "<tr><td>".$var."</td><td><input type='text' name='".$var."' value=''></td></tr><br>\n";
	  }
	  Interpreter::reset();
	  ?>
	  </table>
	  <input type="submit" value="Execute"> 
	  <input type="hidden" name="flow_execute" value="true">
	  <input type='hidden' name='xml' id='xml' value='<?php echo $fileName;?>'>
	</form>
	</body>
	</html>
	<?php
    ob_end_flush();
}
else
{
    if(isset($_POST["flow_transport"]))
	   block_AbstractBlock::$flowTransport = $_POST["flow_transport"];
	   
	$interpreter = Interpreter::factory();

	// Set the user defined variables 
	foreach($definedVars as $var)
	{
		if(isset($_POST[$var]))
		{
			$interpreter->setVariable($var,$_POST[$var]);
		}
	}

	$interpreter->execute($xml);

	// 2.) prepare the form for the reentry
	//
	if(!is_null($interpreter->getReentryId()))
	{
        header('Content-type: text/html');
		StaticLogger::info("reentry required");
		echo "<html><body>";
		echo "<form method='post' id='reentry'>";
		echo "  <input type='hidden' name='flow_reentry'   id='flow_reentry'   value='true'>\n";
		echo "  <input type='hidden' name='flow_execute'   id='flow_execute'   value='true'>\n";
		echo "  <input type='hidden' name='flow_transport' id='flow_transport' value=''>\n";
	    echo "  <input type='hidden' name='xml' id='xml' value='".$fileName."'>\n";
		echo "</form>";
		echo "<pre>";
		StaticLogger::dump("\n");
		?>
		</pre>
		</body>
		<script>
		var didPrompt = false;
		<?php block_AbstractBlock::dumpJS(); ?>
		if(didPrompt===true)
		{
		   document.getElementById("flow_transport").value=value;
		}
		document.getElementById("reentry").submit();
		</script>
		</html>
		<?php
        ob_end_flush();
	}
	// 3.) No reentry. workflow did finish
	//
	else
	{
		$downloads = $interpreter->getDownloads();
		if(count($downloads)>0)
		{
			ob_clean();
			$data = $downloads[0];
            header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
            header("Cache-Control: no-cache");
            header("Pragma: no-cache");
            header("content-length: ".strlen($data->getContent()));
            header('Content-type: '.$data->getMimetype());
            header('Content-Disposition: attachment; filename="test.csv"');
            echo $data->getContent();
            ob_end_flush();
		}
		else
		{
            header('Content-type: text/html');
			?>
			<html>
			<body>
			<form method="post">
			  <table>
			  <?php 
			  $resultVars = $interpreter->getVariables();
			  foreach ($definedVars as $var)
			  {
			  	if(array_key_exists($var, $resultVars)){
			  	   if($resultVars[$var] instanceof ArrayAccess)
			  	     echo "<tr><td>".$var."</td><td><input type='text' name='".$var."' value='".implode(",",$resultVars[$var])."'></td></tr><br>\n";
                   else
			  	     echo "<tr><td>".$var."</td><td><input type='text' name='".$var."' value='".$resultVars[$var]."'></td></tr><br>\n";
			  	}
			  	else 
			  	   echo "<tr><td>".$var."</td><td><input type='text' name='".$var."' value=''></td></tr><br>\n";
			  }
			  ?>
		      </table>
	          <input type="submit" value="Execute"> 
		      <input type="hidden" name="flow_execute" value="true">
			</form>
			<pre>
			<?php StaticLogger::dump();	?>
			</pre>
			</body>
			</html>
			<?php 
            ob_end_flush();
		}
	}
}
?>