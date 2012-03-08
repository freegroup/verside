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
class PluginManager
{

  public static function getAll()
  {
  	  global $PHPBLOCKS_PLUGINDIR;
  	  
  	  $plugins = array();
	  //The path to the style directory
	  $dh = opendir( $PHPBLOCKS_PLUGINDIR );
	  
	  if($dh)
	  {
		  while (false !== ($file = readdir($dh))) 
		  {
		    //List subdirectories
		    if (is_dir( $PHPBLOCKS_PLUGINDIR . $file) && $file!="." && $file!="..") 
		    {
		      array_push($plugins, new Plugin($file));
		    }
		  }
		  closedir($dh);
	  }
	  
	  return $plugins;
  }
}

