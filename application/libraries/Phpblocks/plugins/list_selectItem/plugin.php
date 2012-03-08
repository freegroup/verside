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
class block_list_SelectItem extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
		$param1 = $sparams[0];
		$param2 = $this->toInteger($sparams[1]);
		
		// überprüfen, dass param1 auch wirklich ein Array ist. Ansonsten kann man nicht mit einem Index
		// darauf zugreifen
		if(!(is_array($param1) || $param1 instanceof ArrayObject))
		{
		   // Falls das element kein Array ist und man das "0" erfragt, so ist dies auch erlaubt.
		   //
		   if($param2==0)
		     return $param1;
		     
		   StaticLogger::error("Try to access the element # [".$param2."] of an non array variable");
		   return Interpreter::$ERROR;
		}
		   
		if(isset($param1[$param2]))
		{
			$result = $param1[$param2];
		   // Falls es ein array mit nur einem element ist, dann gebe nur das element zurück.
		   // Ein elementige Arrays machen die Welt nur komplizierter als das sie ist.
		   //
		   if((is_array($result) || $result instanceof ArrayObject))
		   {
		   	  if(count($result)==1)
		   	  	return $result[0];
		      return $result;
		   }
		   else 
		   {
		      return $result;
		   }
		}
		   
		return Interpreter::$NULL;
	}
}

