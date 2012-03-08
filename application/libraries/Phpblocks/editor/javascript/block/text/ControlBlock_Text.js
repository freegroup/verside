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
flow.ControlBlock_Text=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractText.call(this, app, "de.tif.jacob.util.flow.block.text.Text", id);
  
  this.property = "enter your text";
  this.name = "<unused>";
  
  this.pe = null;
};

/** @private **/
flow.ControlBlock_Text.prototype = new flow.ControlBlock_AbstractText();
/** @private **/
flow.ControlBlock_Text.prototype.type="flow.ControlBlock_Text";


flow.ControlBlock_Text.prototype.createHTML=function()
{
    this.html = flow.ControlBlock_AbstractText.prototype.createHTML.call(this);
    
    this.label.dblclick($.proxy(this.startDirectEdit,this));
    
    return this.html;
};

flow.ControlBlock_Text.prototype.startDirectEdit=function(event)
{
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



flow.ControlBlock_Text.prototype.layout=function()
{
   this.label.html("&bdquo;"+this.property+"&ldquo;");
   flow.AbstractBlock.prototype.layout.call(this);
};


flow.ControlBlock_Text.prototype.getPersistentAttributes=function()
{
   var memento = flow.ControlBlock_AbstractText.prototype.getPersistentAttributes.call(this);

   memento.property = this.property;
 
   return memento;
};