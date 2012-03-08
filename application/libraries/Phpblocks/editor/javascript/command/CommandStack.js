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
flow.CommandStack=function()
{
   /** @private **/
   this.undostack = [];
   /** @private **/
   this.redostack = [];
   /** @private **/
   this.maxundo = 50;
   /** @private **/
   this.eventListeners = [];
};

/** Constant indicating notification prior to executing a command (value is 1).*/
flow.CommandStack.PRE_EXECUTE=1;
/** Constant indicating notification prior to redoing a command (value is 2).*/
flow.CommandStack.PRE_REDO=2;
/** Constant indicating notification prior to undoing a command (value is 4).*/
flow.CommandStack.PRE_UNDO=4;
/**  Constant indicating notification after a command has been executed (value is 8).*/
flow.CommandStack.POST_EXECUTE=8;
/** Constant indicating notification after a command has been redone (value is 16).*/
flow.CommandStack.POST_REDO=16;
/** Constant indicating notification after a command has been undone (value is 32).*/
flow.CommandStack.POST_UNDO=32;

flow.CommandStack.POST_MASK = flow.CommandStack.POST_EXECUTE | flow.CommandStack.POST_UNDO | flow.CommandStack.POST_REDO;
flow.CommandStack.PRE_MASK = flow.CommandStack.PRE_EXECUTE | flow.CommandStack.PRE_UNDO | flow.CommandStack.PRE_REDO;


/** @private **/
flow.CommandStack.prototype.type="flow.CommandStack";

/**
 * Set the maximal undo stack size. Entries will be remove if the max. stack 
 * size has been reached.
 *
 * @param {int} count The maximal undo stack size.
 * 
 **/
flow.CommandStack.prototype.setUndoLimit=function(/*:int*/ count)
{
  this.maxundo = count;
};

/**
 * Remove the undo / redo history. This is usefull if the user has been save the 
 * document.
 *
 * 
 **/
flow.CommandStack.prototype.markSaveLocation=function()
{
   this.undostack = [];
   this.redostack = [];
};

/**
 * Executes the specified Command if possible. Prior to executing the command, a
 * @NAMESPACE@CommandStackEvent for {@link #PRE_EXECUTE} will be fired to event listeners. 
 * Similarly, after attempting to execute the command, an event for {@link #POST_EXECUTE}
 * will be fired.
 *
 * @param {flow.Command} command The command to execute.
 * 
 **/
flow.CommandStack.prototype.execute=function(/*:flow.Command*/ command)
{
   // nothing to do
   if(command===null)
      return; //silently

   if(command === undefined)
      throw "Missing parameter [command] for method call flow.CommandStack.prototype.execute";
      
   // return if the command can't execute or it doesn't change the model
   // => Empty command
   if(command.canExecute()==false)
      return;

   this.notifyListeners(command, flow.CommandStack.PRE_EXECUTE);

   this.undostack.push(command);
   command.execute();

   // cleanup the redo stack if the user execute a new command.
   // I think this will create a "clean" behaviour of the unde/redo mechanism.
   //
   this.redostack = [];

   // monitor the max. undo stack size
   //
   if(this.undostack.length > this.maxundo)
   {
      this.undostack = this.undostack.slice(this.undostack.length-this.maxundo);
   }
   this.notifyListeners(command, flow.CommandStack.POST_EXECUTE);
};

/**
 * Undo the command
 *
 **/
flow.CommandStack.prototype.undo=function()
{
   var command = this.undostack.pop();
   if(command)
   {
      this.notifyListeners(command, flow.CommandStack.PRE_UNDO);
      this.redostack.push(command);
      command.undo();
      this.notifyListeners(command, flow.CommandStack.POST_UNDO);
   }
};

/** Redo the command after the user has undo this command
 *
 **/
flow.CommandStack.prototype.redo=function()
{
   var command = this.redostack.pop();

   if(command)
   {
      this.notifyListeners(command, flow.CommandStack.PRE_REDO);
      this.undostack.push(command);
      command.redo();
      this.notifyListeners(command, flow.CommandStack.POST_REDO);
   }
};

/**
 * Return the Redo text of the next REDO command.
 *
 * @type String
 * @since 0.9.24
 **/
flow.CommandStack.prototype.getRedoLabel=function()
{
   if(this.redostack.lenght===0)
     return "";
     
   var command = this.redostack.last();

   if(command)
   {
      return command.getLabel();
   }
   return "";
};


/**
 * Return the Undo text of the next REDO command.
 *
 * @type String
 * @since 0.9.24
 **/
flow.CommandStack.prototype.getUndoLabel=function()
{
   if(this.undostack.lenght===0)
     return "";
     
   var command = this.undostack.last();

   if(command)
   {
      return command.getLabel();
   }
   return "";
};


/**
 * @type boolean
 * @returns <code>true</code> if it is appropriate to call {@link #redo()}.
 */
flow.CommandStack.prototype.canRedo=function()
{
   return this.redostack.length>0;
};

/**
 * @type boolean
 * @returns <code>true</code> if {@link #undo()} can be called
 **/ 
flow.CommandStack.prototype.canUndo=function()
{
   return this.undostack.length>0;
};

/**
 * Adds a listener to the command stack, which will be notified whenever a command has been processed on the stack.
 * @param {flow.CommandStackListener} listener the listener to add.
 */
flow.CommandStack.prototype.addCommandStackEventListener=function(/*:flow.CommandStackEventListener*/ listener)
{
    if(listener instanceof flow.CommandStackEventListener)
      this.eventListeners.push(listener);
    else
      throw "Object doesn't implement required callback interface [flow.CommandStackListener]";
};

/**
 * Removes a listener from the command stack.
 * @param {flow.CommandStackListener} listener the listener to remove.
 */
flow.CommandStack.prototype.removeCommandStackEventListener=function(/*:flow.CommandStackEventListener*/ listener)
{
   this.eventListeners = this.eventListeners.without(listener);
};

/**
 * Notifies command stack event listeners that the command stack has changed to the
 * specified state.
 * 
 * @param {@NAMESPACE@Command} command the command
 * @param {int} state the current stack state
 *
 **/
flow.CommandStack.prototype.notifyListeners=function(/*:flow.Command*/ command, /*:int*/ state)
{
  var event = new flow.CommandStackEvent(command, state);
  this.eventListeners.invoke("stackChanged",event);
};
