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
flow.MenuItem=function(/*:String*/ label,  /*:Function*/ action)
{
   this.label = label;
   this.action = action;
};

/** @private **/
flow.MenuItem.prototype.type="flow.MenuItem";

/**
 *
 * @type String
 **/
flow.MenuItem.prototype.getLabel=function()
{
  return this.label;
};

flow.MenuItem.prototype.getAction=function()
{
  return this.action;
};

