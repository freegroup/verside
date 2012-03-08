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
class block_text_Password extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);

		return (string)$currentBlock->property;
	}

	function beforeSave(&$currentBlock)
	{
		// check if the passeword has been changed by the user
		//
		$password = (string)$currentBlock->property;
		$sessionKey= "property_".$this->getId($currentBlock);
		if(strcmp($password, $sessionKey)==0)
		{
			$currentBlock->property=$_SESSION[$sessionKey];
		}
		else 
		{
			$currentBlock->property = $password;
		}
	}


	function beforeEdit(&$currentBlock)
	{
		// Store the password in the user session. Don't transmit a password over the wire
		//
		$password = (string)$currentBlock->property;
		$sessionKey= "property_".$this->getId($currentBlock);
		$_SESSION[$sessionKey]=$password;
		$currentBlock->property = $sessionKey;
	}
}

