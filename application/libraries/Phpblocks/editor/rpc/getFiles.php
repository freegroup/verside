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
  header('Content-type: application/json');
  header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
  header("Cache-Control: no-cache");
  header("Pragma: no-cache");

  require_once('../../configuration/configuration.php');
      
  echo "{\"files\":[\n";

  //The path to the style directory
  $dh = opendir($PHPBLOCKS_DATADIR);
  $firstFile = true;
  while (false !== ($file = readdir($dh))) 
  {
    //Don't list subdirectories
    if (!is_dir($PHPBLOCKS_DATADIR.$file)) 
    {
      if(!$firstFile)
         echo ",\n  {\n";
      else
         echo "  {\n";
      //Truncate the file extension and capitalize the first letter
      echo "    \"id\":\"$file\",\n";
      echo "    \"name\":\"" . htmlspecialchars(ucfirst(preg_replace('/\..*$/', '', $file))) . "\"\n";
      echo "  }";
      $firstFile = false;
    }
  }
  closedir($dh);

  echo "\n]}";
?>