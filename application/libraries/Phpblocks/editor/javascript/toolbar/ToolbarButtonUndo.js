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
draw2d.ToolbarButtonUndo=function(/*:draw2d.Workflow*/ workflow)
{
  draw2d.AbstractToolbarButton.call(this, workflow, draw2d.I18N.TOOLBAR_BUTTON_UNDO);
  this.setEnable(false);
};

draw2d.ToolbarButtonUndo.prototype = new draw2d.AbstractToolbarButton();


/**
 * Execute function of the button. This method will be called if the user
 * clicks on the button.<br>
 * Inherited classes should override this method to implement more usefull functions. :-)
 * 
 * @public
 **/
draw2d.ToolbarButtonUndo.prototype.execute=function()
{
  this.getWorkflow().getCommandStack().undo();
};


/**
 * Sent when an event occurs on the command stack. draw2d.CommandStackEvent.getDetail() 
 * can be used to identify the type of event which has occurred.
 * 
 **/
draw2d.ToolbarButtonUndo.prototype.stackChanged=function(/*:draw2d.CommandStackEvent*/ event)
{
  this.setEnable(this.getWorkflow().getCommandStack().canUndo());
  this.setTooltip("Undo: "+this.getWorkflow().getCommandStack().getUndoLabel());
};
