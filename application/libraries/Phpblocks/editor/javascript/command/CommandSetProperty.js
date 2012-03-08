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
flow.CommandSetProperty=function(/*:flow.AbstractBlock*/ block,/*:String*/  text)
{
   this.block = block;
   this.newText  = text;
   this.oldText  = block.getProperty();
};

flow.CommandSetProperty.prototype = new flow.Command();
/** @private **/
flow.CommandSetProperty.prototype.type="flow.CommandSetProperty";

/**
 * Execute the command the first time
 * 
 **/
flow.CommandSetProperty.prototype.execute=function()
{
   this.redo();
};

/**
 * Undo the command
 *
 **/
flow.CommandSetProperty.prototype.redo=function()
{
    this.figure.setProperty(this.newText);
};

/** Redo the command after the user has undo this command
 *
 **/
flow.CommandSetProperty.prototype.undo=function()
{
    this.block.setProperty(this.oldText);
};
