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
class block_data_DBSelect extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
			
		if(count($sparams)>4)
		{
			$server    = $this->toSaveString($sparams[0]);
			$instance  = $this->toSaveString($sparams[1]);
			$user      = $this->toSaveString($sparams[2]);
			$password  = $this->toSaveString($sparams[3]);
			$select    = $this->toSaveString($sparams[4]);
			try 
			{
$link = mysql_connect($server, $user, $password);
if (!$link) {
	StaticLogger::error("Unable to CCCCCCC to database [".$server."]: ". mysqli_connect_error());
	return Interpreter::$ERROR;
}

echo 'Connected successfully';
mysql_close($link);

            $mysqli = new mysqli($server, $user, $password, $instance);

				if (mysqli_connect_errno()) 
				{
					StaticLogger::error("Unable to connect to database [".$server."]: ". mysqli_connect_error());
					return Interpreter::$ERROR;
				}

				$rows = new ArrayObject();
				
				$result = $mysqli->query($select);
				
				if ($mysqli->error) 
				{
					StaticLogger::error("Unable to execute query: ". $mysqli->error);
					StaticLogger::error("Query: ". $select);
					return Interpreter::$ERROR;
                }
				
				if ($result)
				{
					while ($row = $result->fetch_array(MYSQLI_NUM))
					{
						$rows[]=new ArrayObject($row);
					}
					$result->close();
				}
				return $rows;
			}
			catch(Exception $e)
			{
				StaticLogger::warn("missing parameter to read from database");
			}
		}
		else
		{
			StaticLogger::warn("missing parameter to read from database");
			return Interpreter::$ERROR;
		}

		return Interpreter::$NULL;
	}

}



