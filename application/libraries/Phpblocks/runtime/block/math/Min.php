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
class block_math_Min extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);

		if(count($dparams)==0)
			return Interpreter::$NULL;

        $debug ="";
		$result = null;
		foreach($dparams as $p)
		{
			$value = $this->toDecimal($p);
			if(!is_null($value))
			{
				if(is_null($result))
				   $result = $value;
				else
				   $result = $value<$result?$value:$result;

			    if($debug=="")
	               $debug = "Math.min(".$value;
	            else
	               $debug = $debug. ", ".$value;
			}
		}
		StaticLogger::debug("  ".$debug.") = ".$result);
		return $result;
	}
}


