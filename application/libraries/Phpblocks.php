<?php


class Phpblocks {

  public function __construct()
  {
    session_start();   

	
    define("PHPBLOCKS_DEMO",false);
    define("SESSION_DEMO_CONTENT_KEY","DEMO_XML_CONTENT");
    define("PHPBLOCKS_ROOTDIR", APPPATH."libraries/Phpblocks/");
    define("PHPBLOCKS_DATADIR", constant("PHPBLOCKS_ROOTDIR") . "data/");
    define("PHPBLOCKS_PLUGINDIR", constant("PHPBLOCKS_ROOTDIR") . "plugins/");
	require_once(APPPATH."libraries/Phpblocks/runtime/util/LogLevel.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/util/StaticLogger.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/Download.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/Interpreter.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/AbstractBlock.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/text/NULL.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/text/Text.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/text/Join.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/math/Add.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/math/Multiply.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/math/Min.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/math/Max.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/control/Start.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/control/If.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/variable/DefineVariable.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/variable/UseVariable.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/dialog/Alert.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/block/dialog/Prompt.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/plugin/Plugin.php");
	require_once(APPPATH."libraries/Phpblocks/runtime/plugin/PluginManager.php");

	$plugins = PluginManager::getAll();
	foreach ($plugins as $plugin)
	{
	   $phpScript = APPPATH."libraries/Phpblocks/plugins/".$plugin->getName()."/plugin.php";
	   require_once($phpScript);
	}
	
  }
  

  /**
   * Return all Plugins which are available in the phpBlocks/plugins directory
   *
   */
  public function plugins() {
    return PluginManager::getAll();
  }
  
  public function run()
  {
// ------------------------------------------------------------------------
// 1.) Load the workflow definition
// ------------------------------------------------------------------------
$fileName = "demo_simple.xml";
$filePath = APPPATH."libraries/Phpblocks/data/".$fileName;
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

  }
}
?>