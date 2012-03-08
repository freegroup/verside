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
flow.block_list_SetItem=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app,"block_list_SetItem", id);
  
  this.group="List";
  this.name="Set Item";
  this.property ="Set Item";
  this.enableDropZoneBefore();
  this.enableDropZoneNext();
  this.addDropZoneStaticParameter("List");
  this.addDropZoneStaticParameter("index");
  this.addDropZoneStaticParameter("value");
};


/** @private **/
flow.block_list_SetItem.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.block_list_SetItem.prototype.type="flow.block_list_SetItem";


flow.block_list_SetItem.prototype.isDataProvider = function()
{
    return false;
};

flow.block_list_SetItem.prototype.supportsDirectEdit = function()
{
    return false;
};


