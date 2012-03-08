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
 * @author Andreas Herz
 * @constructor
 */
draw2d.ToolbarButtonGroup=function()
{
   this.buttons = new draw2d.ArrayList();
   this.html=null;
};

/**
 *
 */
draw2d.ToolbarButtonGroup.prototype.getHTMLElement=function()
{
   if(this.html===null)
   {
      this.html = new Element("ul");
      this.html.className="toolbar_button_group";
   }
   return this.html;
};

draw2d.ToolbarButtonGroup.prototype.addElement=function(/*:draw2d.ToolbarButton*/ button)
{
   this.getHTMLElement().appendChild(button.getHTMLElement());
   // Add spezial style to the first element 
   if(this.buttons.getSize()===0)
   {
       this.buttons.add(button);
       $(button.getHTMLElement()).addClassName("first_button");
   }
   else if(this.buttons.getSize()===1)
   {
     this.buttons.add(button);
     $(button.getHTMLElement()).addClassName("last_button");
   }
   else
   {
     var lastbutton = this.buttons.getLastElement();
     $(lastbutton.getHTMLElement()).removeClassName("last_button");
     $(lastbutton.getHTMLElement()).addClassName("center_button");
     this.buttons.add(button);
     $(button.getHTMLElement()).addClassName("last_button");
   }
};

