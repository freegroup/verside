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
class Plugin
{
  protected $name;
  protected $editorGroup;
  protected $javascriptClass;
  
  public function __construct(&$file)
  {
  	$this->name = $file;
  	
  	global $PHPBLOCKS_PLUGINDIR;
  	
  	$ini_array = parse_ini_file( $PHPBLOCKS_PLUGINDIR . $this->name."/plugin.ini", true);
  	
  	$this->editorGroup = $ini_array["editor"]["group"];
  	$this->javascriptClass = $ini_array["editor"]["class"];
  	$this->cssClass = $ini_array["editor"]["css"];
  }
  
  
  public function getName()
  {
  	return $this->name;
  }

  
  public function getEditorGroup()
  {
  	return $this->editorGroup;
  }

  public function getJavascriptClass()
  {
  	return $this->javascriptClass;
  }

  public function getCSSClass()
  {
  	return $this->cssClass;
  }
}

