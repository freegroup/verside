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
flow.ControlBlock_RoundUp=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractMath.call(this,app,"de.tif.jacob.util.flow.block.math.RoundUp", id);
  this.name = "Round";
 
  this.addDropZoneStaticParameter("number"); 
  this.addDropZoneStaticParameter("scale"); 
};


/** @private **/
flow.ControlBlock_RoundUp.prototype = new flow.ControlBlock_AbstractMath();
/** @private **/
flow.ControlBlock_RoundUp.prototype.type="flow.ControlBlock_RoundUp";

