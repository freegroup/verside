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
class block_list_toCSV extends block_AbstractBlock
{
	function &execute(&$interpreter, &$currentBlock, &$sparams, &$dparams)
	{
		StaticLogger::debug(get_class($this)."::".__FUNCTION__);
		$param1 = $sparams[0];

		// ŸberprŸfen, dass param1 auch wirklich ein Array ist. Ansonsten kann man nicht mit einem Index
		// darauf zugreifen
		if(is_array($param1) || $param1 instanceof ArrayObject)
		{
			$result ="";
			// check if we have a 2 dim Array
			if(is_array($param1[0]) || $param1[0] instanceof ArrayObject)	{
				foreach($param1 as $row){
					$result = $result.$this->array_to_CSV($row);
				}
			}
			else {
				$result = $this->array_to_CSV($param1);
			}
			return $result;
		}
		 
		return Interpreter::$NULL;
	}

	function array_to_CSV(&$data){
		$outstream = fopen("php://temp", 'r+');
		fputcsv($outstream,(array) $data, ',', '"');
		rewind($outstream);
		$csv = fgets($outstream);
		fclose($outstream);
		return $csv;
	}

	function CSV_to_array(&$data){
		$instream = fopen("php://temp", 'r+');
		fwrite($instream, $data);
		rewind($instream);
		$csv = fgetcsv($instream, 9999999, ',', '"');
		fclose($instream);
		return($csv);
	}
}

