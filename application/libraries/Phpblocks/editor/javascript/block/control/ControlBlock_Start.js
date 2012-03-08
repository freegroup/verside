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
flow.ControlBlock_Start=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.AbstractBlock.call(this,app,"de.tif.jacob.util.flow.block.control.Start", id);
  
  this.enableDropZoneNext();
  this.property = "onClicks";
  this.deleteable=false;
};


/** @private **/
flow.ControlBlock_Start.prototype = new flow.AbstractBlock();
/** @private **/
flow.ControlBlock_Start.prototype.type="flow.ControlBlock_Start";


flow.ControlBlock_Start.prototype.createHTML=function()
{
    this.html= $('<div class="Before AbstractBlock '+this.getCSSClassName()+'">'+
                 '<div class="ControlBlock_Start_label">'+this.property+'</div>'+
                 '</div>'
                );
   
    this.label = this.html.find("div");
    return this.html;
};

flow.ControlBlock_Start.prototype.layout=function()
{
   this.label.text(this.property);
   flow.AbstractBlock.prototype.layout.call(this);
};

/**
 * @return The calculated width of the element.
 * @type int
 **/
flow.ControlBlock_Start.prototype.getPreferredWidth=function()
{
   return Math.max(flow.AbstractBlock.PARAMETER_LAYOUT_MIN_WIDTH,150);
};
