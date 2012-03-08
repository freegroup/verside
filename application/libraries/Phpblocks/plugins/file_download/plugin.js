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
flow.block_file_Download=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app,"block_file_Download", id);
  
  this.group="Data";
  this.name="download";
  this.property ="download";
  
  this.enableDropZoneBefore();
  this.enableDropZoneNext();

  this.addDropZoneStaticParameter("Content");
  this.addDropZoneStaticParameter("Mime-Type");
};


/** @private **/
flow.block_file_Download.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.block_file_Download.prototype.type="flow.block_file_Download";


flow.block_file_Download.prototype.isDataProvider = function()
{
    return false;
};

flow.block_file_Download.prototype.supportsDirectEdit = function()
{
    return false;
};


