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
flow.ControlBlock_Join=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractText.call(this,app,"de.tif.jacob.util.flow.block.text.Join", id);
  
  this.name ="Join";
  
  this.setDropZoneDynamicParameterCount(20,"text"); // hat höchstens 10 dynamische Parameter
};


/** @private **/
flow.ControlBlock_Join.prototype = new flow.ControlBlock_AbstractText();
/** @private **/
flow.ControlBlock_Join.prototype.type="flow.ControlBlock_Join";
