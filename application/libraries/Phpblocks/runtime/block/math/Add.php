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
class block_math_Add extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
        $term ="";
		if(count($dparams)==0)
			return Interpreter::$NULL;

		$result = 0;
		foreach($dparams as $p)
		{
			$value = $this->toDecimal($p);
			if($value!=null)
			{
				$result += $value;
				if($term=="")
		           $term = $value;
		        else
		           $term = $term. " + ".$value;
			}
		}
		StaticLogger::debug("  ".$term." = ".$result);
		return $result;
	}
}


