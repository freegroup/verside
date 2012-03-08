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
flow.ControlBlock_DefineVariable=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app, "de.tif.jacob.util.flow.block.variable.DefineVariable", id);
  
  this.enableDropZoneBefore();
  this.enableDropZoneNext();
  this.addDropZoneStaticParameter("value"); // hat genau einen parameter

  this.group = "Variable";
  this.property = "variable name";
};


/** @private **/
flow.ControlBlock_DefineVariable.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.ControlBlock_DefineVariable.prototype.type="flow.ControlBlock_DefineVariable";


flow.ControlBlock_DefineVariable.prototype.setProperty=function(/*:String*/ text)
{
   var oldVarName = this.property;
   flow.AbstractBlock.prototype.setProperty.call(this, text);
   
   this.app.renameVariable(oldVarName, text);
};



flow.ControlBlock_DefineVariable.prototype.getAllVariables=function(/*:Array*/ result)
{
   flow.ControlBlock_AbstractData.prototype.getAllVariables.call(this, result);

	if(result.indexOf(this.property)===-1)
	  result.push(this.property);
};

/**
 * 
 **/
flow.ControlBlock_DefineVariable.prototype.supportsDirectEdit=function()
{
   // element supports only direct edit if the element is not a predefined Variable
   //
   return this.app.getPredefinedVariables().indexOf(this.property)===-1;
};
