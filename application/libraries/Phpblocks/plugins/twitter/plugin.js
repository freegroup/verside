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
flow.plugin_Twitter=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractUI.call(this,app,"block_messaging_Twitter", id);
  
  this.group="Messaging";
  this.name="Twitter";
  this.enableDropZoneBefore();
  this.enableDropZoneNext();
  this.addDropZoneStaticParameter("user"); // hat genau einen parameter
  this.addDropZoneStaticParameter("passwd"); // hat genau einen parameter
  this.addDropZoneStaticParameter("msg"); // hat genau einen parameter
};


/** @private **/
flow.plugin_Twitter.prototype = new flow.ControlBlock_AbstractUI();
/** @private **/
flow.plugin_Twitter.prototype.type="flow.plugin_Twitter";

