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
class block_messaging_Twitter extends block_AbstractBlock
{
  function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
  {
    StaticLogger::debug(get_class($this)."::".__FUNCTION__);
   
    if(count($sparams)>2)
	{
		$username = $this->toSaveString($sparams[0]);
		$password = $this->toSaveString($sparams[1]);
		$msg      = $this->toSaveString($sparams[2]);
	    
	    // URL, die die Aktion definiert
	    $strAufrufURL = 'http://twitter.com/statuses/update.json';
	    $curl = curl_init();
	    curl_setopt($curl, CURLOPT_URL, $strAufrufURL);
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($curl, CURLOPT_USERPWD, "$username:$password");

	    // POST Parameter definieren und angeben
	    curl_setopt($curl, CURLOPT_POST, 1);
	    curl_setopt($curl, CURLOPT_POSTFIELDS, "status=".$msg);
	    
	    $raw_return =curl_exec($curl);
	    StaticLogger::debug("Twitter response:".$raw_return);
	    curl_close($curl);
 	}
 	else
 	{
 		StaticLogger::warn("missing parameter to send status to Twitter");
 	}
    
  	return Interpreter::$NULL;
  }

}

