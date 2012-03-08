<?php

class block_variable_DefineVariable extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
			
		if(count($sparams)>0)
		   $interpreter->setVariable((string)$currentBlock->property, $sparams[0]);

		return Interpreter::$NULL;
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


