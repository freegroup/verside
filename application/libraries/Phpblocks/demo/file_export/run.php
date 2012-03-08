<?php
ob_start();
session_start();

require_once('../../configuration/configuration.php');
require_once("../includes.php");

StaticLogger::setLevel(LogLevel::$DEBUG);


// ------------------------------------------------------------------------
// 1.) Load the workflow definition
// ------------------------------------------------------------------------
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
	   
// ------------------------------------------------------------------------
// 2.) Create a new workflow interpreter
// ------------------------------------------------------------------------
$interpreter = Interpreter::factory();


// ------------------------------------------------------------------------
// 3.) Set Variable for calculation
// ------------------------------------------------------------------------
foreach($definedVars as $var)
{
	if(isset($_POST[$var]))
	{
		$interpreter->setVariable($var,$_POST[$var]);
	}
}


// ------------------------------------------------------------------------
// 4.) Execute the workflow definition
// ------------------------------------------------------------------------
$interpreter->execute($xml);


// ------------------------------------------------------------------------
// 5.) Provide the generated CSV file for download
// ------------------------------------------------------------------------
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
?>