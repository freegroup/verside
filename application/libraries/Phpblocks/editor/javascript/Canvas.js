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
 * @constructor
 */
flow.Canvas = function(/* String */id, /* String */scrollDivID)
{
    /** @private * */
    this.html = $("#"+id);
    this.scroll = $("#"+scrollDivID);
    this.html.click( function()
    {
        $(".menu").remove();
    });

    this.blocks = [];

    this.html.droppable( {
        accept : ".draggable",
        drop : $.proxy(this.onDroppedPalettePart,this)
    });
};

/**
 * Set the new id of the cloude node element.
 * 
 * @param {String}
 *            if The new id of the model element
 * @private
 */
flow.Canvas.prototype.onDroppedPalettePart = function(/* :Event */event, ui)
{
    var dragged = ui.draggable;
    var model = dragged.data("model");
    if (model === undefined)
        return;

    var p1 = dragged.offset();
    var p2 = this.html.offset();

    var block = model.createBlock();
    var x = p1.left - p2.left + this.getScrollX();
    var y = p1.top - p2.top + this.getScrollY();
    block.setPosition(x, y);
    this.addBlock(block);
    block.startDirectEdit();
};


flow.Canvas.prototype.addBlock = function(/* :flow.AbstractBlock */block)
{
    if (this.blocks.indexOf(block) !== -1)
        return;
    
    var html = block.setCanvas(this);
    this.html.append(html);
    this.blocks.push(block);
    block.layout();
};

flow.Canvas.prototype.removeBlock = function(/* :flow.AbstractBlock */block)
{
    if (this.blocks.indexOf(block) === -1)
        return;

    block.html.remove();
    this.blocks.remove(this.blocks.indexOf(block));
};

flow.Canvas.prototype.getAbsolutePostion = function()
{
    return this.html.offset();
};

flow.Canvas.prototype.getScrollX = function()
{
    return this.scroll.scrollLeft();
};

flow.Canvas.prototype.getScrollY = function()
{
    return this.scroll.scrollTop();
};

