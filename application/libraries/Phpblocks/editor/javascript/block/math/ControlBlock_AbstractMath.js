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
flow.ControlBlock_AbstractMath=function(/*flow.Application*/ app,/*String*/ implementation, /*:String*/ id)
{
  flow.AbstractBlock.call(this,app, implementation, id);
  
  this.name = "<unknown>";
};


/** @private **/
flow.ControlBlock_AbstractMath.prototype = new flow.AbstractBlock();
/** @private **/
flow.ControlBlock_AbstractMath.prototype.type="flow.ControlBlock_AbstractMath";

flow.ControlBlock_AbstractMath.prototype.getCSSBaseClassName=function()
{
   return "AbstractMath";
};


flow.ControlBlock_AbstractMath.prototype.createHTML=function()
{
	this.html= $('<div class="Parameter AbstractBlock AbstractMath '+this.getCSSClassName()+'"></div>');
	this.decoration= $('<div class="AbstractMath_decoration">Math</div>');
	this.label= $('<div class="AbstractMath_label">'+this.name+'</div>');
	this.image= $('<div class="Parameter_plug AbstractMath_plug handle"></div>');
	this.html.append(this.label);
	this.html.append(this.image);
	this.html.append(this.decoration);

    return this.html;
};


/**
 * @return The calculated width of the element.
 * @type int
 **/
flow.ControlBlock_AbstractMath.prototype.getPreferredWidth=function()
{
   if(this.label===null)
     return 100;
     
   return Math.max(this.label.width()+50+parseInt(this.label.position().left),100);
};



flow.ControlBlock_AbstractMath.prototype.getPersistentAttributes=function()
{
   var memento = flow.AbstractBlock.prototype.getPersistentAttributes.call(this);

   return memento;
};