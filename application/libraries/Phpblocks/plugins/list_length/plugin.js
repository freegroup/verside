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
flow.block_list_Length=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app,"block_list_Length", id);
  
  this.group="List";
  this.name="Length";
  this.property ="Length";
  this.addDropZoneStaticParameter("List");
};


/** @private **/
flow.block_list_Length.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.block_list_Length.prototype.type="flow.block_list_Length";


flow.block_list_Length.prototype.isDataProvider = function()
{
    return true;
};

flow.block_list_Length.prototype.supportsDirectEdit = function()
{
    return false;
};


