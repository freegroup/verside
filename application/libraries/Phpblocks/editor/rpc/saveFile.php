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
  require_once("./includes.php");
      
  $fileName = $_POST["xml"];
  $filePath = $PHPBLOCKS_DATADIR.$fileName;
  $fileContent = str_replace("\\\"", "\"", $_POST["content"]);

  // restore hidden properties from the session. E.g. Passwords
  // in custom blocks 
  $xml = simplexml_load_string($fileContent);
  Interpreter::beforeSave($xml);
  $fileContent = $xml->asXML();
  
  // For the demo mode we store the content in the user session
  // only.
  if($PHPBLOCKS_DEMO==true)
  {
  	 $_SESSION[$SESSION_DEMO_CONTENT_KEY.$fileName] = $fileContent;
  }
  else 
  {
	 $fh = fopen($filePath, "w");
	 fwrite($fh, $fileContent);
	 fclose($fh);
  }
  echo $fileContent;
?>