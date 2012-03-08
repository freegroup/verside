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
class Interpreter
{
  public static $REENTRY = "3390f564-e748-47bf-92e6-5f68251143bf";
  public static $NULL    = "39d400db-3156-4e1d-b26c-b80ae60aa053";
  public static $ERROR   = "bb9c7263-1112-47a2-a2d9-341ca962c79c";
  
  private static $KEY="Interpreter";
  
  protected $variables;
  protected $block2staticParam;
  protected $block2dynamicParam;
  protected $nextInnerBlock;
  protected $downloads;
  protected $reentryId = null;
  
  public function __construct()
  {
   $this->variables = new ArrayObject();
   $this->block2staticParam = new ArrayObject();
   $this->block2dynamicParam = new ArrayObject();
   $this->nextInnerBlock = new ArrayObject();
   $this->downloads = new ArrayObject();
  }
  
  public static function reset()
  {
  	unset($_SESSION[self::$KEY]);	
  }
  
  public static function factory()
  {
    if(isset($_SESSION[self::$KEY]) === TRUE)
    {
       return unserialize($_SESSION[self::$KEY]);
    }
    return new Interpreter();
  }
  
  function getReentryId()
  {
  	return $this->reentryId;
  }
  
  /**
   * Returns all defined variables in the workflow definition. 
   */
  public static function getUsedVariables(&$xml)
  {
  	$variables = array();
    foreach($xml->children() as $block)
    {
    	$arr = $block->attributes(); 
        if(strcmp("de.tif.jacob.util.flow.block.control.Start", $arr["implementation"])==0)
        {
           $instance = self::createInstance($arr["implementation"]);
           $instance->addUsedVariables($block, $variables);
           break;
        }
    }
    
    return $variables;
  }

  /**
   * Return all used variables with the corresponding value.
   */
  function getVariables()
  {
  	return $this->variables;
  }
  
  
  function execute(&$xml)
  {
    StaticLogger::debug(get_class($this)."::".__FUNCTION__);
  	
    foreach($xml->children() as $block)
    {
    	$arr = $block->attributes(); 
        if(strcmp("de.tif.jacob.util.flow.block.control.Start", $arr["implementation"])==0)
        {
           $this->executeBlock( $block);
           if(!is_null($this->reentryId))
           {
           	  $_SESSION[self::$KEY] = serialize($this);
           }
           else 
           {
              self::reset();	
           }
           break;
        }
    }
  	return $this->variables;
  }

  function &executeBlock( &$block)
  {
  	// jeder Block hat mind. 30 sekunden Zeit
  	set_time_limit(30);
    StaticLogger::debug(get_class($this)."::".__FUNCTION__);
  	
    $arr = $block->attributes(); 
  	$id = (string)$arr["id"];
  	
  	$result = self::$NULL;
 
    if (is_null($this->reentryId))
    {
      $this->block2staticParam[$id] = new ArrayObject();
      $this->block2dynamicParam[$id]= new ArrayObject();
    }

    if (array_key_exists($id,$this->block2staticParam))
      $staticParam = $this->block2staticParam[$id];
    else
      $staticParam = new ArrayObject();
    
    if (array_key_exists($id,$this->block2dynamicParam))
      $dynamicParam = $this->block2dynamicParam[$id];
    else
      $dynamicParam = new ArrayObject();

    // AusfŸhren wenn kein REENTRY oder dies nicht der REENTRY Block ist.
    //
    if(is_null($this->reentryId) || strcmp($this->reentryId, $id)!=0)
    {
      $sp = $block->static_param[0];
      if($sp)
      {
        foreach($sp->children() as $sb)
        {
          if ($sb)
          {
            $param = $this->executeBlock( $sb);
            if ($param == self::$REENTRY)
              return self::$REENTRY;

            if ($param == self::$ERROR)
              return self::$ERROR;
              
            // kann bei einem Reentry passieren wenn der Block zuvor abgearbeitet wurde
            if(!is_null($staticParam))
            {
              $staticParam[]= $param;
            }
          }
          else
          {
            $staticParam[]= self::$NULL;
          }
        }
      }
     
      $dp = $block->dynamic_param[0];
      if($dp)
      {
        foreach($dp->children() as $b)
        {
          if (!is_null($b))
          {
            $param = $this->executeBlock($b);
            if ($param == self::$REENTRY)
              return self::$REENTRY;
            
            if ($param == self::$ERROR)
              return self::$ERROR;
              
            // kann bei einem Reentry passieren wenn der Block zuvor abgearbeitet wurde
            if(!is_null($dynamicParam))
              $dynamicParam[]= $param;
          }
        }
      }
    }

    $implementation = (string)$arr["implementation"];
    if (!is_null($implementation))
    {
    	$instance = self::createInstance($implementation);
    		
    	if(is_null($this->reentryId))
    	{
    		$result =& $instance->execute($this, $block, $staticParam, $dynamicParam);
    	}
    	else if ($id==$this->reentryId)
    	{
    		$this->reentryId = null;
    		$result=& $instance->reentry($this, $block);
    	}
    }
   
    // 
    if(($result != self::$REENTRY) && ($result != self::$ERROR))
    {
    	if (array_key_exists($id,$this->block2staticParam))
    	   unset($this->block2staticParam[$id]);

    	if (array_key_exists($id,$this->block2dynamicParam))
    	   unset($this->block2dynamicParam[$id]);

    	// Es kann sein, dass ein inner Block ausgefŸhrt werden muss bevor der Nachfolger kommt
    	//
    	if(array_key_exists($id, $this->nextInnerBlock))
    	{
    		$nextInner = $this->nextInnerBlock[$id];
    		$result =& $this->executeBlock($nextInner);
    		if($result!=self::$REENTRY)
    			unset($this->nextInnerBlock[$id]);
    		else
    			return $result;
    	}

    	$next = $block->block[0];
    	if($next)
           $result =& $this->executeBlock($next);
    }
    else if($result == self::$REENTRY)
    {
    	$this->reentryId = $id;
    }
    else 
    {
    	// self::ERROR
    }
    return $result;
  }

  function getDownloads()
  {
  	return $this->downloads;	
  }

  function addDownload($content, $mimetype )
  {
  	$this->downloads[]=new Download($content, $mimetype);	
  }

  function assignNextInnerBlock(&$currentBlock, &$nextInnerBlock)
  {
    StaticLogger::debug(get_class($this)."::".__FUNCTION__);
  	
    $arr = $currentBlock->attributes(); 
  	$id = (string)$arr["id"];
    $this->nextInnerBlock[$id]=$nextInnerBlock;
  }

  function setVariable($key, &$value)
  {
    StaticLogger::debug(get_class($this)."::".__FUNCTION__." [".$key."]");
  	$this->variables[$key]= $value;
  }

  function &getVariable($key)
  {
  	if(array_key_exists($key, $this->variables))
     	return $this->variables[$key];
     return null;
  }

  public static function createInstance($implementation)
  {
  	$implementation = str_replace(".","_", $implementation);
    $implementation = str_replace("de_tif_jacob_util_flow_","", $implementation);

    return new $implementation();	
  }

 /**
  * 
  */
  public static function beforeEdit(&$xml)
  {
    foreach($xml->children() as $block)
    {
    	$arr = $block->attributes(); 
        $instance = self::createInstance($arr["implementation"]);
        $instance->beforeEdit($block);
    }
  }

  public static function beforeSave(&$xml)
  {
    foreach($xml->children() as $block)
    {
    	$arr = $block->attributes(); 
        $instance = self::createInstance($arr["implementation"]);
        $instance->beforeSave($block);
    }
  }
}
