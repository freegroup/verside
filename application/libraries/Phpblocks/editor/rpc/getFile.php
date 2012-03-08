<?php
ob_start();
/**
 **
 ** This file is part of @APPLICATIONNAME@ @VERSION@.
 **
 ** Andreas Herz proprietary/confidential. Use is subject to license terms.
 **
 ** Unauthorized redistribution of this file are strictly forbidden.
 **
 ** Copyright (c) 2011 by Andreas Herz, Fichtenstrasse 70,
 ** 68535 Edingen Neckarhausen, Germany. All rights reserved.
 **
 **/

 /*
  * 
  * @version @VERSION@
  * @project @APPLICATIONNAME@
  * @author Andreas Herz (FreeGroup.de)
  */
  session_start();
  header('Content-type: text/xml');
  header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
  header("Cache-Control: no-cache");
  header("Pragma: no-cache");
  
  require_once('../../configuration/configuration.php');
  require_once("./includes.php");
  
  $fileName = $_GET["xml"];
  $filePath = $PHPBLOCKS_DATADIR.$fileName;
  $fileContent ="";
   
  if($PHPBLOCKS_DEMO==true && isset($_SESSION[$SESSION_DEMO_CONTENT_KEY.$fileName]))
  {
  	$fileContent= $_SESSION[$SESSION_DEMO_CONTENT_KEY.$fileName];
  }
  else 
  {
    $fileContent = file_get_contents($filePath);
    
    if($PHPBLOCKS_DEMO ==true)
       $_SESSION[$SESSION_DEMO_CONTENT_KEY.$fileName] = $fileContent;
  }
  
  $xml = simplexml_load_string($fileContent);
  Interpreter::beforeEdit($xml);
  ob_end_clean();
  echo $xml->asXML();
?>