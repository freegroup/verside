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
class Download
{
  protected $content;
  protected $mimetype;
  
  function __construct($content, $mimetype)
  {
  	$this->content = $content;
  	$this->mimetype = $mimetype;
  }

  function getContent(){
  	return $this->content;
  }

  function getMimetype(){
  	return $this->mimetype;
  }
} 

