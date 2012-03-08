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
class block_dialog_Alert extends block_AbstractBlock
{
  function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
  {
    StaticLogger::debug(get_class($this)."::".__FUNCTION__);
   
    $value ="";
	if(count($sparams)>0)
	{
		$tmp = $sparams[0];
		if($tmp != Interpreter::$NULL && !is_null($tmp))
		{
			$value = $tmp;
		}
	}
	
    $patterns = array("/\\\\/", '/\n/', '/\r/', '/\t/', '/\v/', '/\f/');
    $replacements = array('\\\\\\', '\n', '\r', '\t', '\v', '\f');
    $value = preg_replace($patterns, $replacements, $value);

    $this->executeJS("alert('".$value."');");
	
  	return Interpreter::$REENTRY;
  }
  

  function reentry(&$interpreter,  &$currentBlock)
  {
  	return Interpreter::$NULL;
  }   
}

