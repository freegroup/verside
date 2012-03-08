<?php

class block_variable_UseVariable extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
			
		return $interpreter->getVariable((string)$currentBlock->property);
	}
	
	function addUsedVariables(&$currentBlock, &$definedVars)
	{
		// add your defined vars
		// ..
		$varName = (string)$currentBlock->property;
		if(!in_array($varName, $definedVars))
		   array_push($definedVars, $varName);
			
		// add the vars of the successor block
		parent::addUsedVariables($currentBlock, $definedVars);
	}
}


