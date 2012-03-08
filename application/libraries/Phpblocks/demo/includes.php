<?php

require_once("../../runtime/util/LogLevel.php");
require_once("../../runtime/util/StaticLogger.php");
require_once("../../runtime/Download.php");
require_once("../../runtime/Interpreter.php");
require_once("../../runtime/block/AbstractBlock.php");
require_once("../../runtime/block/text/NULL.php");
require_once("../../runtime/block/text/Text.php");
require_once("../../runtime/block/text/Join.php");
require_once("../../runtime/block/math/Add.php");
require_once("../../runtime/block/math/Multiply.php");
require_once("../../runtime/block/math/Min.php");
require_once("../../runtime/block/math/Max.php");
require_once("../../runtime/block/control/Start.php");
require_once("../../runtime/block/control/If.php");
require_once("../../runtime/block/variable/DefineVariable.php");
require_once("../../runtime/block/variable/UseVariable.php");
require_once("../../runtime/block/dialog/Alert.php");
require_once("../../runtime/block/dialog/Prompt.php");
require_once("../../runtime/plugin/Plugin.php");
require_once("../../runtime/plugin/PluginManager.php");

$plugins = PluginManager::getAll();
foreach ($plugins as $plugin)
{
   require_once("../../plugins/".$plugin->getName()."/plugin.php");
}
  
?>