<?php
session_start();
header('Content-type: text/html');
/* 
 * This is a demo runscript for a workflow .
 * Copy and customize this page for your purpose.
 */
require_once("../includes.php");

StaticLogger::setLevel(LogLevel::$DEBUG);

// ------------------------------------------------------------------------
// 1.) Load the workflow definition
// ------------------------------------------------------------------------
$fileName = "demo_embedded.xml";
$filePath = "../../data/".$fileName;
$xml = simplexml_load_file(utf8_encode($filePath));

// ------------------------------------------------------------------------
// 2.) Create a new workflow interpreter
// ------------------------------------------------------------------------
$interpreter = Interpreter::factory();

// ------------------------------------------------------------------------
// 3.) Set Variable for calculation
// ------------------------------------------------------------------------
$interpreter->setVariable("value1","4");
$interpreter->setVariable("value2","5");

// ------------------------------------------------------------------------
// 4.) Execute the workflow definition
// ------------------------------------------------------------------------
$resultVars = $interpreter->execute($xml);

// ------------------------------------------------------------------------
// 5.) dump all variables for debug purpose or transfer this to your
//     database, business logic,....
// ------------------------------------------------------------------------
echo "<html><body>";
echo "Example how to embedd the phpBlocks Libary into an existing php script<br>";
echo "<br><br><table>";
foreach ($resultVars as $key=>$value)
{
  echo "<tr><td>".$key.": </td><td> ".$value."</td></tr>\n";
}
echo "</table><pre>";
StaticLogger::dump();
echo "</pre></body></html>";

// ------------------------------------------------------------------------
// 6.) Remove the Interpreter from the current user session.
// ------------------------------------------------------------------------
Interpreter::reset();
?>
