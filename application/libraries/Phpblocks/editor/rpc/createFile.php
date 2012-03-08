<?php
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
 
  require_once('../../configuration/configuration.php');
    
  if($PHPBLOCKS_DEMO==true)
     return;
  
  $fileName = $_GET["xml"] ;
  $fileName = preg_replace('/[^0-9a-z\_\-]/i','',$fileName);
  $fileName = $fileName .".xml";
  
  $filePath = $PHPBLOCKS_DATADIR.$fileName;

  $fileHandle = fopen($filePath, 'w+');
  if($fileHandle){
	header('Content-type: application/json');
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	header("Cache-Control: no-cache");
	header("Pragma: no-cache");
	$content = file_get_contents("../configuration/template.xml");
	
	fwrite($fileHandle, $content);
	
	fclose($fileHandle);
	echo "{\"file\":{\n";
	//Truncate the file extension and capitalize the first letter
	echo "    \"id\":\"$fileName\",\n";
	echo "    \"name\":\"" . htmlspecialchars(ucfirst(preg_replace('/\..*$/', '', $fileName))) . "\"\n";
	echo "  }\n";
	echo "}\n";
  }
  else{
	header('Content-type: text/plain');
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
	header("Cache-Control: no-cache");
	header("Pragma: no-cache");
  	header("HTTP/1.0 500 Internal Server Error");
	echo("can't create file ["+$fileName+"]");
  }
?>