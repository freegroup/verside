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
flow.ControlBlock_AbstractText=function(/*flow.Application*/ app,/*String*/ implementation, /*:String*/ id)
{
  flow.AbstractBlock.call(this,app,implementation, id);
  
  this.name = "<unknown>";
};


/** @private **/
flow.ControlBlock_AbstractText.prototype = new flow.AbstractBlock();
/** @private **/
flow.ControlBlock_AbstractText.prototype.type="flow.ControlBlock_AbstractText";


flow.ControlBlock_AbstractText.prototype.getCSSBaseClassName=function()
{
   return "AbstractText";
};

flow.ControlBlock_AbstractText.prototype.createHTML=function()
{
    this.html= $('<div class="Parameter AbstractBlock AbstractText '+this.getCSSClassName()+'"></div>');
    this.decoration= $('<div class="AbstractText_decoration">Text</div>');
    this.label= $('<div class="AbstractText_label"'+this.name+'</div>');
    this.image= $('<div class="Parameter_plug AbstractText_plug handle"></div>');

	this.html.append(this.label);
	this.html.append(this.image);
	this.html.append(this.decoration);

    return this.html;
};


/**
 * @return The calculated width of the element.
 * @type int
 **/
flow.ControlBlock_AbstractText.prototype.getPreferredWidth=function()
{
   if(this.label===null)
     return 80;
     
   return Math.max(this.label.width()+10+parseInt(this.label.position().left),80);
};


flow.ControlBlock_AbstractText.prototype.getPersistentAttributes=function()
{
   var memento = flow.AbstractBlock.prototype.getPersistentAttributes.call(this);

   return memento;
};