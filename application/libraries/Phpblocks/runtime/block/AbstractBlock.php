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
class block_AbstractBlock
{
	protected static $javascripts = array();
	public static $flowTransport ="";

	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__. " not implemented");
		return Interpreter::$NULL;
	}

	function reentry(&$interpreter,  &$currentBlock)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__. " not implemented");
		return Interpreter::$NULL;
	}


	/**
	 * Called by the framework. The functionblock can verify or modify block related values.
	 *
	 * @param unknown_type $currentBlock
	 */
	function beforeSave(&$currentBlock)
	{
		// add the vars of the successor block
		$next = $currentBlock->block[0];
		if($next)
		{
			$arr = $next->attributes();
			$nextInstance = Interpreter::createInstance($arr["implementation"]);
			$nextInstance->beforeSave($next);
		}

		// add the vars from the static_param blocks
		$sp = $currentBlock->static_param[0];
		if($sp)
		{
			foreach($sp->children() as $sb)
			{
				if ($sb)
				{
					$arr = $sb->attributes();
					$sbInstance = Interpreter::createInstance($arr["implementation"]);
					$sbInstance->beforeSave($sb);
				}
			}
		}
			
		// add the vars from the dynmic_param blocks
		$dp = $currentBlock->dynamic_param[0];
		if($dp)
		{
			foreach($dp->children() as $db)
			{
				if ($db)
				{
					$arr = $db->attributes();
					$dbInstance = Interpreter::createInstance($arr["implementation"]);
					$dbInstance->beforeSave($db);
				}
			}
		}
	}

	function beforeEdit(&$currentBlock)
	{
		// add the vars of the successor block
		$next = $currentBlock->block[0];
		if($next)
		{
			$arr = $next->attributes();
			$nextInstance = Interpreter::createInstance($arr["implementation"]);
			$nextInstance->beforeEdit($next);
		}

		// add the vars from the static_param blocks
		$sp = $currentBlock->static_param[0];
		if($sp)
		{
			foreach($sp->children() as $sb)
			{
				if ($sb)
				{
					$arr = $sb->attributes();
					$sbInstance = Interpreter::createInstance($arr["implementation"]);
					$sbInstance->beforeEdit($sb);
				}
			}
		}
			
		// add the vars from the dynmic_param blocks
		$dp = $currentBlock->dynamic_param[0];
		if($dp)
		{
			foreach($dp->children() as $db)
			{
				if ($db)
				{
					$arr = $db->attributes();
					$dbInstance = Interpreter::createInstance($arr["implementation"]);
					$dbInstance->beforeEdit($db);
				}
			}
		}
	}

	/**
	 *
	 * The funktionblock add user defined variables to the handsover array.
	 * This functions call recursive all children.
	 *
	 * @param unknown_type $currentBlock
	 * @param unknown_type $definedVars
	 */
	function addUsedVariables(&$currentBlock, &$definedVars)
	{
		// add the vars of the successor block
		$next = $currentBlock->block[0];
		if($next)
		{
			$arr = $next->attributes();
			$nextInstance = Interpreter::createInstance($arr["implementation"]);
			$nextInstance->addUsedVariables($next, $definedVars);
		}

		// add the vars from the static_param blocks
		$sp = $currentBlock->static_param[0];
		if($sp)
		{
			foreach($sp->children() as $sb)
			{
				if ($sb)
				{
					$arr = $sb->attributes();
					$sbInstance = Interpreter::createInstance($arr["implementation"]);
					$sbInstance->addUsedVariables( $sb, $definedVars);
				}
			}
		}
			
		// add the vars from the dynmic_param blocks
		$dp = $currentBlock->dynamic_param[0];
		if($dp)
		{
			foreach($dp->children() as $db)
			{
				if ($db)
				{
					$arr = $db->attributes();
					$dbInstance = Interpreter::createInstance($arr["implementation"]);
					$dbInstance->addUsedVariables( $db, $definedVars);
				}
			}
		}
	}

	public static function getId(&$block)
	{
		$arr = $block->attributes(); 
  		return (string)$arr["id"];
	}
	
	public function executeJS($js)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
			
		array_push(self::$javascripts, $js);
	}

	public static function dumpJS()
	{
		foreach(self::$javascripts as $js)
		{
			echo $js . "\n";
		}
	}

	/**
	 *
	 * Convert the handsover object to string.
	 *
	 * @param unknown_type $param
	 */
	public static function toSaveString(&$param)
	{
		if($param != Interpreter::$NULL && !is_null($param))
		return $param;
		return "";
	}

	public static function toBoolean(&$param)
	{
		$_trueValues = array('yes', 'y', 'true','ja','j');

		try
		{
			$test = $param;

			if(!isset($test))
			return false;

			if(is_null($test))
			return false;

			if($test == Interpreter::$NULL)
			return false;

			if(is_bool($test))
			return $test;

			if (is_string($test))
			{
				return (in_array( strtolower($test) , $_trueValues));
			}
			return (boolean)$test;
		}
		catch (Exception $e)
		{
		}
		return false;
	}


	public static function toInteger(&$param)
	{
		return (int)$param;
	}
	
    public static function toDecimal(&$param)
	{
		$pString = $param;
			
		if (strlen($pString) == 0)
		{
			return false;
		}
		$pregResult = array();

		$commaset = strpos($pString,',');
		if ($commaset === false)
		{
			$commaset = -1;
		}

		$pointset = strpos($pString,'.');
		if ($pointset === false)
		{
			$pointset = -1;
		}

		$pregResultA = array();
		$pregResultB = array();

		if ($pointset < $commaset)
		{
			preg_match('#(([-]?[0-9]+(\.[0-9])?)+(,[0-9]+)?)#', $pString, $pregResultA);
		}
		preg_match('#(([-]?[0-9]+(,[0-9])?)+(\.[0-9]+)?)#', $pString, $pregResultB);
		if ((isset($pregResultA[0]) && (!isset($pregResultB[0])
		|| strstr($preResultA[0],$pregResultB[0]) == 0	|| !$pointset)))
		{
			$numberString = $pregResultA[0];
			$numberString = str_replace('.','',$numberString);
			$numberString = str_replace(',','.',$numberString);
		}
		elseif (isset($pregResultB[0]) && (!isset($pregResultA[0])
		|| strstr($pregResultB[0],$preResultA[0]) == 0
		|| !$commaset)) {
			$numberString = $pregResultB[0];
			$numberString = str_replace(',','',$numberString);
		}
		else
		{
			return false;
		}
		$result = (float)$numberString;
		return $result;
	}
}


