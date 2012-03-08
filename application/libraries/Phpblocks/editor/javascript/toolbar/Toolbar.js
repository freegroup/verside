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
draw2d.Toolbar=function(/*:String*/ divId)
{
   this.groups = new draw2d.ArrayList();
   this.divId = divId;
};


/**
 * @private
 **/
draw2d.Toolbar.prototype.getHTMLElement=function()
{
   return $("#"+this.divId);
};


draw2d.Toolbar.prototype.addElement=function(/*:draw2d.ToolbarButtonGroup*/ group)
{
   this.groups.add(group);

   this.getHTMLElement().append(group.getHTMLElement());
};

