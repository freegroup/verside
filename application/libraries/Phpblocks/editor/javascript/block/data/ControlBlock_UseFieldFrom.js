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
flow.ControlBlock_UseFieldFrom=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app,"de.tif.jacob.util.flow.block.record.UseFieldFrom", id);
  this.property = "field name";

  this.addDropZoneStaticParameter("from"); // hat genau einen parameter der Text der Eingabeaufforderung
};

/** @private **/
flow.ControlBlock_UseFieldFrom.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.ControlBlock_UseFieldFrom.prototype.type="flow.ControlBlock_UseFieldFrom";


flow.ControlBlock_UseFieldFrom.prototype.isDataProvider=function()
{
   return true;
};

