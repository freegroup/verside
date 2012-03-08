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
class block_control_If extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
		 
		$innerblock = $currentBlock->innerblocks[0];
		$trueBlock  = $innerblock->block[0];
		$falseBlock = $innerblock->block[1];

		if(count($sparams)>0 && $this->toBoolean($sparams[0]))
		{
			StaticLogger::debug("     => TRUE block");
			$interpreter->assignNextInnerBlock($currentBlock,$trueBlock);
		}
		else
		{
			StaticLogger::debug("    => FALSE block");
			$interpreter->assignNextInnerBlock($currentBlock,$falseBlock);
		}

		return Interpreter::$NULL;
	}
	
	/**
	 * Go recursive to all inner blocks to collect variable definitions
	 * 
	 * @param unknown_type $currentBlock
	 * @param unknown_type $definedVars
	 */
	function addUsedVariables(&$currentBlock, &$definedVars)
	{
		$innerblock = $currentBlock->innerblocks[0];
		$trueBlock  = $innerblock->block[0];
		$falseBlock = $innerblock->block[1];
		
		if($trueBlock)
		{
			$arr = $trueBlock->attributes(); 
			$instance = Interpreter::createInstance((string)$arr["implementation"]);
			$instance->addUsedVariables($trueBlock, $definedVars);
		}
		
		if($falseBlock)
		{
			$arr = $falseBlock->attributes(); 
			$instance = Interpreter::createInstance((string)$arr["implementation"]);
			$instance->addUsedVariables($falseBlock, $definedVars);
		}
		
		// add the vars of the successor block
		parent::addUsedVariables($currentBlock, $definedVars);
	}
}


