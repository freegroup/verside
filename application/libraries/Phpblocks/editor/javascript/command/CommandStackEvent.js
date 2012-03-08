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
 * Instances of this class are sent whenever stack events occur. The type of event 
 * can be determined by calling getDetail(), and comparing the return value to constants 
 * defined by @NAMESPACE@CommandStack.
 *
 * Warning: this class is not intended to be subclassed. 
 * 
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
flow.CommandStackEvent=function(/*:flow.Command*/ command, /*:int*/ details)
{
   this.command = command;
   this.details = details;
};

flow.CommandStackEvent.prototype.type="flow.CommandStackEvent";

/**
 * Returns null or a Command if a command is relevant to the current event.
 * 
 * @type flow.Command
 **/
flow.CommandStackEvent.prototype.getCommand=function()
{
   return this.command;
};

/**
 * Returns an integer identifying the type of event which has occurred
 * ( defined by @NAMESPACE@CommandStack).
 **/
flow.CommandStackEvent.prototype.getDetails=function()
{
   return this.details;
};

/**
 * Returns true if this event is fired after the stack having changed.
 *
 * @type boolean
 * @returns true if post-change event
 **/
flow.CommandStackEvent.prototype.isPostChangeEvent=function()
{
   return 0 != (this.getDetails() & flow.CommandStack.POST_MASK);
};

/**
 * Returns true if this event is fired prior to the stack changing.
 * 
 * @type boolean
 * @returns true if pre-change event
 **/
flow.CommandStackEvent.prototype.isPreChangeEvent=function()
{
   return 0 != (this.getDetails() & flow.CommandStack.PRE_MASK);
};
