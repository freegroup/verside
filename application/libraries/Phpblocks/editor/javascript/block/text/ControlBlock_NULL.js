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
flow.ControlBlock_NULL=function(/*flow.Application*/ app, /*:String*/ id)
{
  flow.AbstractBlock.call(this, app, "block_text_NULL", id);
};


/** @private **/
flow.ControlBlock_NULL.prototype = new flow.AbstractBlock();
/** @private **/
flow.ControlBlock_NULL.prototype.type="flow.ControlBlock_NULL";

