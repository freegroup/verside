<?php
session_start();
/* 
 * This is a demo runscript for a workflow. The script 
 * Copy and customize this page for your purpose.
 */
header('Content-type: text/html');

require_once("../includes.php");

// ------------------------------------------------------------------------
// 1.) Load the workflow definition
// ------------------------------------------------------------------------
$fileName = "demo_simple.xml";
$filePath = "../../data/".$fileName;
$xml = simplexml_load_file(utf8_encode($filePath));

// ------------------------------------------------------------------------
// 2.) Retrieve the interpreter for the workflow definition
// ------------------------------------------------------------------------
$interpreter = Interpreter::factory();

// -----------------------------------------------------------------------
// 3.) Execute the workflow with the new created interpreter
// ------------------------------------------------------------------------
$resultVars = $interpreter->execute($xml);

// ------------------------------------------------------------------------
// 4.) dump all variables for debug purpose or transfer this to your
//     database, business logic,....
// ------------------------------------------------------------------------
echo "<html><body><a href='../../editor/editor.php?xml=". $fileName."'>Show Workflow Definition</a><table>";
foreach ($resultVars as $key=>$value)
{
  echo "<tr><td>".$key.": </td><td> ".$value."</td></tr>\n";
}
echo "</table></body></html>";

// ------------------------------------------------------------------------
// 5.) Remove the Interpreter from the current user session.
// ------------------------------------------------------------------------
Interpreter::reset();

?>
