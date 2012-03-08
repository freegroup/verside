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
flow.ControlBlock_AbstractData=function(/*flow.Application*/ app,/*String*/ implementation, /*:String*/ id)
{
  if(app===undefined)
    return;
    
  flow.AbstractBlock.call(this,app, implementation,id);
  
  this.label = null;
  this.property = "DblClick to edit";
  this.group ="Data";
};


/** @private **/
flow.ControlBlock_AbstractData.prototype = new flow.AbstractBlock();
/** @private **/
flow.ControlBlock_AbstractData.prototype.type="flow.ControlBlock_AbstractData";


flow.ControlBlock_AbstractData.prototype.getCSSBaseClassName=function()
{
   return "AbstractData";
};

flow.ControlBlock_AbstractData.prototype.createHTML=function()
{
    this.html= $('<div class="AbstractBlock '+this.getCSSBaseClassName()+' '+this.getCSSClassName()+'"></div>');
	this.decoration= $('<div class="'+this.getCSSBaseClassName()+'_decoration">'+this.group+'</div>');
	this.label= $('<div class="'+this.getCSSBaseClassName()+'_label '+this.getCSSClassName()+'_label" title="double click to edit">'+this.property+'</div>');

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

   // direct edit is not supported if the variable are locked. E.g. a "predefiend Variable" is
   // is locked by default.
   //
   if(this.supportsDirectEdit()===true)
   {
     this.label.dblclick($.proxy(this.startDirectEdit,this));
     this.label.mouseenter($.proxy( function(e) 
     {
       this.label.addClass("antBox");
     },this));

     this.label.mouseleave($.proxy( function(e) 
     {
        this.label.removeClass("antBox");
     },this));
   }
   
   return this.html;
};

/**
 * 
 **/
flow.ControlBlock_AbstractData.prototype.supportsDirectEdit=function()
{
   return true;
};


flow.ControlBlock_AbstractData.prototype.isDataProvider=function()
{
   return false;
};


flow.ControlBlock_AbstractData.prototype.layout=function()
{
   this.label.text(this.property);
   flow.AbstractBlock.prototype.layout.call(this);
};


/**
 * @return The calculated width of the element.
 * @type int
 **/
flow.ControlBlock_AbstractData.prototype.getPreferredWidth=function()
{
   if(this.label===null)
     return 100;
     
   return Math.max(this.label.width()+50+parseInt(this.label.position().left),100);
};


flow.ControlBlock_AbstractData.prototype.startDirectEdit=function(event)
{
   if(this.supportsDirectEdit()===false)
       return;// silently
   
   alert("unsoperted at the moment [flow.ControlBlock_AbstractData.prototype.startDirectEdit]");
   return ;
   
   this.callInitialDirectEdit = false;
   this.directEditInputField = new Element("input");
   this.directEditInputField.value = this.property;
   this.directEditInputField.setStyle("z-index:30000;position:absolute;top:"+this.html.style.top+";left:"+this.html.style.left+";height:"+Math.min(30,this.getHeight()+2)+"px;width:"+this.getPreferredWidth()+"px");
   this.directEditInputField.style.backgroundColor="#F1FCBF";
   this.html.parentNode.appendChild(this.directEditInputField);
   this.directEditInputField.focus();
   Form.Element.select( this.directEditInputField);
   Event.observe(this.directEditInputField,"keypress",function(event)
   {
      var charCode = event.charCode || event.keyCode || event.which;
      if(charCode == Event.KEY_RETURN)
      {
         var value = $F(this.directEditInputField);
         event.stopPropagation();
         this.directEditInputField.remove();
         this.directEditInputField=null;
         this.setProperty(value);
      }
      else if(charCode == Event.KEY_ESC)
      {
         event.stopPropagation();
         this.directEditInputField.remove();
         this.directEditInputField=null;
      }
   }.bind(this));

   Event.observe(this.directEditInputField,"blur",function(event)
   {
      var value = $F(this.directEditInputField);
      event.stopPropagation();
      this.directEditInputField.remove();
      this.directEditInputField=null;
      this.setProperty(value);
   }.bind(this));
   
};



flow.ControlBlock_AbstractData.prototype.getPersistentAttributes=function()
{
   var memento = flow.AbstractBlock.prototype.getPersistentAttributes.call(this);

   memento.property = this.property;
   
   return memento;
};