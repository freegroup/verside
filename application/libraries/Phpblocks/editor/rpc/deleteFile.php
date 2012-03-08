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
  header('Content-type: text/plain');

  require_once('../../configuration/configuration.php');
      
  if($PHPBLOCKS_DEMO==true)
    return;
    
  $fileName = $_GET["xml"];
  $filePath = $PHPBLOCKS_DATADIR.$fileName;
  unlink($filePath);
?>
