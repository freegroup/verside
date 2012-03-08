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
class block_list_Length extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
		$param1 = $sparams[0];

		// ŸberprŸfen, dass param1 auch wirklich ein Array ist. Ansonsten kann man nicht mit einem Index
		// darauf zugreifen
		if(is_array($param1)==false )
		{
		   if(is_null($param1))
		     return 0; // not an array and is null
		   else 
		     return 1; // not an array. In this case we return "1" for one element.
		}
		   
		return count($param1);
	}
}

