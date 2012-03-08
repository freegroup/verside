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
flow.ControlBlock_Min=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractMath.call(this,app,"de.tif.jacob.util.flow.block.math.Min", id);
  this.name = "Min";
  
  this.setDropZoneDynamicParameterCount(10, "number"); // hat höchstens 10 dynamische Parameter
};


/** @private **/
flow.ControlBlock_Min.prototype = new flow.ControlBlock_AbstractMath();
/** @private **/
flow.ControlBlock_Min.prototype.type="flow.ControlBlock_Min";
