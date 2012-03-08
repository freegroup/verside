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
class block_list_AddItem extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
		$list = $sparams[0];
		$index = $this->toInteger($sparams[1]);
		$value = $sparams[2];
		
		// überprüfen, dass param1 auch wirklich ein Array ist. Ansonsten kann man nicht mit einem Index
		// darauf zugreifen
		if(!(is_array($list) || $list instanceof ArrayObject))
		{
		   StaticLogger::error("Try to access the element # [".$index."] of an non array variable");
		   return Interpreter::$ERROR;
		}
		   
		$list[$index]=$value;

		StaticLogger::debug("Add Array element. array[". $index."]=".$list[$index]);

		return Interpreter::$NULL;
	}
}

