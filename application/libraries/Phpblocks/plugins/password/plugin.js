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
flow.block_text_Password=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.ControlBlock_AbstractText.call(this,app,"block_text_Password", id);
  
  this.group="Text";
  this.name="Password";
};



/** @private **/
flow.block_text_Password.prototype = new flow.ControlBlock_Text();
/** @private **/
flow.block_text_Password.prototype.type="flow.block_text_Password";


flow.block_text_Password.prototype.createHTML=function()
{
    this.html = flow.ControlBlock_Text.prototype.createHTML.call(this);
    this.decoration.text("Password");
    
    return this.html;
};

flow.block_text_Password.prototype.startDirectEdit=function(event)
{
   flow.ControlBlock_Text.prototype.startDirectEdit.call(this,event);
   this.directEditInputField.type = "password";
};

flow.block_text_Password.prototype.layout=function()
{
  this.label.text("**********");
  flow.AbstractBlock.prototype.layout.call(this);
};
