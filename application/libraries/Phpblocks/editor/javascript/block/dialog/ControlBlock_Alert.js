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
flow.ControlBlock_Alert=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractUI.call(this,app,"de.tif.jacob.util.flow.block.dialog.Alert", id);
  
  this.group="Dialog";
  this.name="Alert";
  this.enableDropZoneBefore();
  this.enableDropZoneNext();
  this.addDropZoneStaticParameter("msg"); // hat genau einen parameter
};


/** @private **/
flow.ControlBlock_Alert.prototype = new flow.ControlBlock_AbstractUI();
/** @private **/
flow.ControlBlock_Alert.prototype.type="flow.ControlBlock_Alert";

