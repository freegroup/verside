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
flow.block_debug_Echo=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app,"block_debug_Echo", id);
  
  this.group="Debug";
  this.name="Echo";
  this.property ="Echo";
  this.enableDropZoneBefore();
  this.enableDropZoneNext();
  this.addDropZoneStaticParameter("msg");
};


/** @private **/
flow.block_debug_Echo.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.block_debug_Echo.prototype.type="flow.block_debug_Echo";


flow.block_debug_Echo.prototype.isDataProvider = function()
{
    return false;
};

flow.block_debug_Echo.prototype.supportsDirectEdit = function()
{
    return false;
};


