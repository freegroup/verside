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
flow.ControlBlock_AbstractUI=function(/*flow.Application*/ app,/*:String*/ implementation, /*:String*/ id)
{
  flow.AbstractBlock.call(this,app,implementation, id);
  
  this.group = "UI";
  this.name = "-unset-";
};


/** @private **/
flow.ControlBlock_AbstractUI.prototype = new flow.AbstractBlock();
/** @private **/
flow.ControlBlock_AbstractUI.prototype.type="flow.ControlBlock_AbstractUI";

flow.ControlBlock_AbstractUI.prototype.getCSSBaseClassName=function()
{
   return "AbstractUI";
};

flow.ControlBlock_AbstractUI.prototype.createHTML=function()
{
	this.html= $('<div class="AbstractBlock '+this.getCSSBaseClassName()+' '+this.getCSSClassName()+'"></div>');
	this.decoration= $('<div class="'+this.getCSSBaseClassName()+'_decoration" >'+this.group+'</div>');
	this.label= $('<div class="'+this.getCSSBaseClassName()+'_label '+this.getCSSClassName()+'_label" >'+this.name+'</div>');

	this.html.append(this.label);
	this.html.append(this.decoration);

    if(this.dropzone_before!==null)
       this.html.addClass("Before");
        
    if(this.dropzone_next!==null)
       this.html.addClass("Next");

    if(this.isDataProvider()===true)
    {
       this.html.addClass("Parameter");
	   this.image= $('<div class="Parameter_plug '+this.getCSSBaseClassName()+'_plug handle"></div>');
	   this.html.append(this.image);
    }
    
    return this.html;
};



flow.ControlBlock_AbstractUI.prototype.isDataProvider=function()
{
   return false;
};

/**
 * @return The calculated width of the element.
 * @type int
 **/
flow.ControlBlock_AbstractUI.prototype.getPreferredWidth=function()
{
   if(this.label===null)
     return 150;
     
   return Math.max(this.label.width()+60+parseInt(this.label.position().left),150);
};


flow.ControlBlock_AbstractUI.prototype.getPersistentAttributes=function()
{
   var memento = flow.AbstractBlock.prototype.getPersistentAttributes.call(this);

   return memento;
};