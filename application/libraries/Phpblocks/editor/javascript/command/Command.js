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
 * Base class for the undo redo support in the Open-jACOB Draw2d framework.
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
flow.Command=function(/*:String*/ label)
{
  this.label = label;
};

/** @private **/
flow.Command.prototype.type="flow.Command";

/**
 * Returns a label of the Command. e.g. "Move Figure".
 *
 * @final
 **/
flow.Command.prototype.getLabel=function()
{
   return this.label;
};


/**
 * Returns [true] if the command can be execute and the execution of the
 * command modifies the model. e.g.: a CommandMove with [startX,startX] == [endX,endY] should
 * return false. Rhe execution of this Command doesn't modify the model.
 *
 * @type boolean
 **/
flow.Command.prototype.canExecute=function()
{
  return true;
};

/**
 * Execute the command the first time.
 * Sup-classes must implement this method.
 **/
flow.Command.prototype.execute=function()
{
};

/**
 * Will be called if the user cancel the operation.
 *
 * @since 0.9.15
 **/
flow.Command.prototype.cancel=function()
{
};

/**
 * Undo the command.
 * Sup-classes must implement this method.
 *
 **/
flow.Command.prototype.undo=function()
{
};

/** 
 * Redo the command after the user has undo this command.
 * Sup-classes must implement this method.
 *
 **/
flow.Command.prototype.redo=function()
{
};
