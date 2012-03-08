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
 * A listener interface for receiving notification before and after commands are executed, undone, or redone.
 *
 * @version @VERSION@
 * @author Andreas Herz
 * @constructor
 */
flow.CommandStackEventListener=function()
{
};

flow.CommandStackEventListener.prototype.type="flow.CommandStackEventListener";

/**
 * Sent when an event occurs on the command stack. @NAMESPACE@CommandStackEvent.getDetail() 
 * can be used to identify the type of event which has occurred.
 * 
 **/
flow.CommandStackEventListener.prototype.stackChanged=function(/*:flow.CommandStackEvent*/ event)
{
};
