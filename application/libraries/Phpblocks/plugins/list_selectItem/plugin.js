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
flow.block_list_SelectItem=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app,"block_list_SelectItem", id);
  
  this.group="List";
  this.name="Select Item";
  this.property ="Select Item";
  this.addDropZoneStaticParameter("List");
  this.addDropZoneStaticParameter("index");
};


/** @private **/
flow.block_list_SelectItem.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.block_list_SelectItem.prototype.type="flow.block_list_SelectItem";


flow.block_list_SelectItem.prototype.isDataProvider = function()
{
    return true;
};

flow.block_list_SelectItem.prototype.supportsDirectEdit = function()
{
    return false;
};


