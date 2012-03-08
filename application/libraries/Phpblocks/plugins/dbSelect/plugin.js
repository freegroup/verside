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
flow.block_data_DBSelect=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app,"block_data_DBSelect", id);
  
  this.group="Database";
  this.name="Select";
  this.property ="Select";
  this.addDropZoneStaticParameter("server");
  this.addDropZoneStaticParameter("instance");
  this.addDropZoneStaticParameter("user");
  this.addDropZoneStaticParameter("passwd");
  this.addDropZoneStaticParameter("select");
};

/** @private **/
flow.block_data_DBSelect.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.block_data_DBSelect.prototype.type="flow.block_data_DBSelect";


flow.block_data_DBSelect.prototype.isDataProvider = function()
{
    return true;
};

flow.block_data_DBSelect.prototype.supportsDirectEdit = function()
{
    return false;
};


