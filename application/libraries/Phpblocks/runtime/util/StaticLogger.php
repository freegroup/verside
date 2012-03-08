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
class StaticLogger
{
  protected static $level;
  protected static $messages=array();
  
  public static function setLevel($level)
  {
      self::$level = $level;
  }
  
  public static function debug($message)
  {
    switch(self::$level)
    {
      case LogLevel::$DEBUG:
        array_push(self::$messages, "DEBUG: ".$message);
        break;
      case LogLevel::$INFO:
      case LogLevel::$WARN:
      case LogLevel::$ERROR:
      case LogLevel::$NONE:
    }
  }

  public static function info($message)
  {
    switch(self::$level)
    {
      case LogLevel::$DEBUG:
      case LogLevel::$INFO:
        array_push(self::$messages, "INFO: ".$message);
        break;
      case LogLevel::$WARN:
      case LogLevel::$ERROR:
      case LogLevel::$NONE:
    }
  }

  public static function warn($message)
  {
    switch(self::$level)
    {
      case LogLevel::$DEBUG:
      case LogLevel::$INFO:
      case LogLevel::$WARN:
        array_push(self::$messages, "WARN: ".$message);
        break;
      case LogLevel::$ERROR:
      case LogLevel::$NONE:
    }
  }

  public static function error($message)
  {
    switch(self::$level)
    {
      case LogLevel::$DEBUG:
      case LogLevel::$INFO:
      case LogLevel::$WARN:
      case LogLevel::$ERROR:
      	array_push(self::$messages, "ERROR: ".$message);
        break;
      case LogLevel::$NONE:
    }
  }
  
  public static function dump()
  {
  	echo "\n";
  	echo "--------------------------------\n";
  	echo "Log messages\n";
  	echo "--------------------------------\n";
  	foreach(self::$messages as $line)
  	{
  		echo $line . "\n";
  	}
  }
}

// Set the default log level
StaticLogger::setLevel(LogLevel::$INFO);
