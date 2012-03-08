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
flow.ControlBlock_UseField=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app,"de.tif.jacob.util.flow.block.record.UseField", id);
  this.group = "Use Data Field";
  this.property = "field name";
};

/** @private **/
flow.ControlBlock_UseField.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.ControlBlock_UseField.prototype.type="flow.ControlBlock_UseField";


flow.ControlBlock_UseField.prototype.isDataProvider=function()
{
   return true;
};


flow.ControlBlock_UseField.prototype.createHTML=function()
{
   var html =flow.ControlBlock_AbstractData.prototype.createHTML.call(this);
   this.selector = new Element("div",{"class":this.getCSSBaseClassName()+"_selector"}).update("&or;");
   this.selector.hide();
   this.selector.title="Select Field to use.";
   this.html.observe('mouseenter', function(e) 
   {
     this.selector.appear({ duration: 0.3 });
   }.bind(this));

   this.html.observe('mouseleave', function(e) 
   {
     this.selector.fade({ duration: 0.3 });
   }.bind(this));

   this.selector.observe('click', function(e) 
   {
      $(".menu").remove();
      e.stopPropagation();
      var elements = this.app.getRelatedFields();
      
      var list = new Element('ul',{className:"menu "+this.getCSSBaseClassName()+"_selectormenu"});
      elements.each(function(item) 
      {
          var e_li = new Element('li', {className: ''});
          var e_a  = new Element('a', { href: '#',title: item.name, className: ''}).update(item.name);
          e_a.observe("click",function(item, event)
          {
            event.stopPropagation();
            $(".menu").remove();
            this.setProperty(item.name);
          }.bind(this, item));
          
          list.insert(e_li.insert(e_a));
      }.bind(this));
      var pos1 = this.selector.cumulativeOffset();
      var pos2 = this.canvas.html.cumulativeOffset();
      pos1.left -= pos2.left;
      pos1.top -= pos2.top;
      list.hide();
      this.canvas.html.appendChild(list);
      list.setStyle(pos1);
      new Effect.Appear(list, {duration:0.5, from:0.1, to:1.0});
   }.bind(this));

   this.html.appendChild(this.selector);
   return html;
};










