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
class block_controll_ForEach extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
		
		$lastArray = $sparams[0];
		$item = $this->toSaveString($sparams[1]);
		$index=0;
		
		$innerblock = $currentBlock->innerblocks[0];
		$block  = $innerblock->block[0];
		foreach($lastArray as $row )
		{
			$interpreter->setVariable($item,$row);
			$interpreter->executeBlock($block);
		}
		return Interpreter::$NULL;
	}
}

