<?php
session_start();
/* 
 *
 * This is a demo run script for a workflow with interactive elements l
 * ike "alert" and "prompt".
 * 
 * @see: the embedded or simple version for a less complex demo
 */
header('Content-type: text/html');

require_once("../includes.php");

// ------------------------------------------------------------------------
// 1.) Load the workflow definition
// ------------------------------------------------------------------------
$fileName = "demo_interactive.xml";
$filePath = "../../data/".$fileName;
$xml = simplexml_load_file(utf8_encode($filePath));

// ------------------------------------------------------------------------
// 2.) Transfer the javascript prompt variables to the interpreter 
//     Required if the workflow contains interactive elements.
// ------------------------------------------------------------------------
if(isset($_POST["flow_transport"]))
   block_AbstractBlock::$flowTransport = $_POST["flow_transport"];

// ------------------------------------------------------------------------
// 3.) Retrieve the interpreter from the session or create a new one.
// ------------------------------------------------------------------------
$interpreter = Interpreter::factory();

// ------------------------------------------------------------------------
// 4.) Transfer HTTP GET parameters to the workflow interpreter.
// ------------------------------------------------------------------------
$definedVars = Interpreter::getUsedVariables($xml);
foreach($definedVars as $var)
{
	if(isset($_GET[$var]))
	{
		$interpreter->setVariable($var,$_GET[$var]);
	}
}

// ------------------------------------------------------------------------
// 5.) Execute/Reentry the workflow definition.
//     Reentry is possible if the interpreter comes from the http session.
//     This is required for user interaction.
// ------------------------------------------------------------------------
$interpreter->execute($xml);

// ------------------------------------------------------------------------
// 6.) Prepare the interpreter for reentry or termination. This depends 
//     on the workflow definition. 
// ------------------------------------------------------------------------
if(!is_null($interpreter->getReentryId()))
{
	// REENTRY
	?>
	<html><body>
	<form method='post' id='reentry'>
	  <input type='hidden' name='flow_transport' id='flow_transport' value=''>
	  <input type='hidden' name='xml' id='xml' value='<?php echo $xmlDefinition?>'>
	</form>
	</body>
	<script>
	var didPrompt = false;
	<?php block_AbstractBlock::dumpJS(); ?>
	if(didPrompt===true)
	   document.getElementById("flow_transport").value=value;
	document.getElementById("reentry").submit();
	</script>
	</html>
	<?php 
}
else
{
	// TERMINATION
	?>
	<html>
	<body>
      <h1>Intention of the demo</h1>
      <ul>
   	    <li>This complex demo load and execute a workflow definition which contains interactive elements.</li>
        <li>The workflow add the user entered numbers</li>
        <li>Demonstrate the <b>Text.join</b> block.</li>
        <li>Show how to handle user interactions.</li>
      </ul>
	<table>
	<?php 
	$resultVars = $interpreter->getVariables();
	foreach ($resultVars as $key=>$value)
	{
	  echo "<tr><td>".$key.": </td><td> ".$value."</td></tr><br>\n";
	}
	?>
	</table><br><br>
    <a target="_new" href="../../editor/editor.php?xml=<?php echo $fileName?>">Show Workflow Definition</a><br>
    <a target="_new" href="../show_code.php?dir=<?php echo basename(dirname(__FILE__))?>">Show PHP Code</a><br>
	</body></html>
	<?php 
}

?>