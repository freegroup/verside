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
flow.block_controll_ForEach=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.AbstractBlock.call(this,app,"block_controll_ForEach", id);
  
  this.name="forEach";
  this.enableDropZoneBefore();
  this.enableDropZoneNext();
  this.addDropZoneStaticParameter("in List");
  this.addDropZoneStaticParameter("as variable"); 
  this.addDropZoneInnerBlock();
};


/** @private **/
flow.block_controll_ForEach.prototype = new flow.AbstractBlock();
/** @private **/
flow.block_controll_ForEach.prototype.type="flow.block_controll_ForEach";


flow.block_controll_ForEach.prototype.createHTML=function()
{
    this.html= new Element("div",{"class":"Before Next AbstractBlock "+this.getCSSClassName()});
    this.label_forEach= new Element("div",{"class":this.getCSSClassName()+"_label_forEach"}).update("forEach");
    this.html.appendChild(this.label_forEach);

    this.label_do= new Element("div",{"class":this.getCSSClassName()+"_label_do"}).update("do");
    this.html.appendChild(this.label_do);

    return this.html;
};

flow.block_controll_ForEach.prototype.getPreferredWidth=function()
{
   return Math.max(flow.AbstractBlock.PARAMETER_LAYOUT_MIN_WIDTH,150);
};


flow.block_controll_ForEach.prototype.layout=function()
{
   flow.AbstractBlock.prototype.layout.call(this);
   
   var pos_do = this.dropzone_innerblocks[0]; 
  
   this.label_do.style.top=(pos_do.y-18)+"px";
};


