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

flow.PalettePart = function(/* flow.Application */app,/* HTMLElement */element)
{
    /** @private * */
    this.id = flow.UUID.create();
    this.app = app;
    this.html = $(element);
    this.blockClassName = this.html.data("block");
    this.html.draggable( {
        ghosting : true,
        revert : true,
        drag : $.proxy(function()
        {
            var p1 = this.html.offset();
            var p2 = this.app.getCanvas().html.offset();

            var x = p1.left - p2.left;
            var y = p1.top - p2.top;
            this.html.block.setPosition(x, y);
        },this),
        stop : $.proxy(this.onDragEnd,this),
        start :$.proxy(this.onDragStart,this),
        reverteffect : function(element, top_offset, left_offset)
        {
            element.hide();
            new Effect.Move(element, {
                x : -left_offset,
                y : -top_offset,
                duration : 0
            });
            element.show();
        },
        scroll : $("scrollarea")
    });
    this.html.data("model",this);
};

/**
 **/
flow.PalettePart.prototype.createBlock = function()
{
    var func = eval(this.blockClassName);
    return new func(this.app);
};

/**
 *
 **/
flow.PalettePart.prototype.onDragEnd = function()
{
    $(".dropzone_glow").removeClass("dropzone_glow");
    $(".DropZone").addClass("noSize");
};

/**
 *
 **/
flow.PalettePart.prototype.onDragStart = function()
{
    this.html.block = this.createBlock();
    this.html.block.callInitialDirectEdit = true;
    this.html.block.setCanvas(this.app.getCanvas());

    if (this.html.hasClass("Next"))
    {
        $.each($(".is_Next"),$.proxy(function(index, element)
        {
            $element = $(element);
            // keine Ã¼berlagerten DropZones anzeigen. Es ist ein Element
            // oberhalb vorhanden. Diese DropZone wird angezeigt. Das reicht.
            if ($element.data("zone").droppedBlock !== null)
                return;
            $element.addClass("dropzone_glow");
        },this));
    }

    if (this.html.hasClass("Before"))
    {
        $.each($(".is_Before"),$.proxy(function(index, element)
        {
            $element = $(element);
            // Keine Ÿberlagerten DropZones anzeigen. Es ist ein Element
            // oberhalb vorhanden. Diese DropZone wird angezeigt. Das reicht.
            if ($element.data("zone").parent.block_before !== null)
                return;

            $element.addClass("dropzone_glow");
        },this));
    }

    if (this.html.hasClass("Parameter"))
    {
        $(".is_Parameter").addClass("dropzone_glow");
    }

    $(".DropZone").removeClass("noSize");

    this.html.addClass("topLevel");
};