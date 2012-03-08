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
flow.ControlBlock_SetField=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractData.call(this,app,"de.tif.jacob.util.flow.block.record.SetField", id);
  
  this.enableDropZoneBefore();
  this.enableDropZoneNext();
  this.addDropZoneStaticParameter(); // hat genau einen parameter

  this.group = "Field";
};


/** @private **/
flow.ControlBlock_SetField.prototype = new flow.ControlBlock_AbstractData();
/** @private **/
flow.ControlBlock_SetField.prototype.type="flow.ControlBlock_SetField";



flow.ControlBlock_SetField.prototype.createHTML=function()
{
   var html =flow.ControlBlock_AbstractData.prototype.createHTML.call(this);
   this.selector = $('<div title="Select Field to use" class="'+this.getCSSBaseClassName()+'_selector" >&or</div>');
   this.selector.hide();
   this.html.bind('mouseenter', $.proxy(function(e) 
   {
     this.selector.show(300);
   },this));

   this.html.bind('mouseleave', $.proxy(function(e) 
   {
     this.selector.hide(300);
   },this));

   this.selector.bind('click', function(e) 
   {
      $(".menu").remove();
      e.stopPropagation();
      var elements = this.app.getRelatedFields();
      
      var list = $('<ul class="menu '+this.getCSSBaseClassName()+'_selectormenu"></div>');
      $.each(elements,$.proxy(function(index, item) 
      {
          var e_li = $('<li></li>');
          var e_a  = $('<a href="#" title="'+item.name+'">'+item.name+'</a>');
          e_a.bind("click",$.proxy(function(event)
          {
            event.stopPropagation();
            $(".menu").remove();
            this.setProperty(item.name);
          },this));
          
          list.insert(e_li.insert(e_a));
      },this));
      var pos1 = this.selector.offset();
      var pos2 = this.canvas.html.offset();
      pos1.left -= pos2.left;
      pos1.top -= pos2.top;
      list.hide();
      this.canvas.html.append(list);
      list.css(pos1);
      list.show(500);
   }.bind(this));

   this.html.append(this.selector);
   return html;
};
