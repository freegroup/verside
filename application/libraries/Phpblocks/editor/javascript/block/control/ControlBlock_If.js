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
flow.ControlBlock_If=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.AbstractBlock.call(this,app,"de.tif.jacob.util.flow.block.control.If", id);
  
  this.enableDropZoneBefore();
  this.enableDropZoneNext();
  
  this.addDropZoneInnerBlock();
  this.addDropZoneInnerBlock();
  
  this.addDropZoneStaticParameter();
};


/** @private **/
flow.ControlBlock_If.prototype = new flow.AbstractBlock();
/** @private **/
flow.ControlBlock_If.prototype.type="flow.ControlBlock_If";


flow.ControlBlock_If.prototype.createHTML=function()
{
    this.html= $('<div class="Before Next AbstractBlock '+this.getCSSClassName()+'">'+
             '<div class="'+this.getCSSClassName()+'_label_if">If</div>'+
             '<div class="'+this.getCSSClassName()+'_label_test">test</div>'+
             '<div class="'+this.getCSSClassName()+'_label_then">Then Do</div>'+
             '<div class="'+this.getCSSClassName()+'_label_else">Else Do</div>'+
             '</div>'
            );
    
    this.label_then = this.html.find("."+this.getCSSClassName()+"_label_then");
    this.label_else = this.html.find("."+this.getCSSClassName()+"_label_else");
    
    return this.html;
};

/**
 * @return The calculated width of the element.
 * @type int
 **/
flow.ControlBlock_If.prototype.getPreferredWidth=function()
{
   return Math.max(flow.AbstractBlock.PARAMETER_LAYOUT_MIN_WIDTH,150);
};

flow.ControlBlock_If.prototype.layout=function()
{
   flow.AbstractBlock.prototype.layout.call(this);
   
   var pos_then = this.dropzone_innerblocks[0]; 
   var pos_else = this.dropzone_innerblocks[1];
   
   this.label_then.css({top:(pos_then.y-15)});
   this.label_else.css({top:(pos_else.y-15)});
};
