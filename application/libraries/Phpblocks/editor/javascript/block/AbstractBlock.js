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
flow.AbstractBlock = function(/* flow.Application */ app, /*:String*/ implementation, /*:String */id)
{
    this.implementation = implementation;
    this.property = null;
    this.x = 0;
    this.y = 0;
    this.html = null;
    this.app = app;
    this.canvas = null;
    this.zone = null;
    this.callInitialDirectEdit = false;
    /** @private * */
    if (id === undefined)
        this.id = flow.UUID.create();
    else
        this.id = id;

    this.block_before = null;
    this.block_next = null;
    this.block_left = null;
    this.block_outer = null; // can z.B. ein IfElse oder OkCancelDialog sein

    this.dropzone_before = null;
    this.dropzone_next = null;
    this.dropzone_innerblocks = [];
    this.dropzone_static_parameters = [];
    this.dropzone_dynamic_parameters = [];
    this.dropzones = [];
    this.deleteable = true;

    // Der Block hat per default 0 Parameter
    this.dynamic_parameters_max = 0;
};

flow.AbstractBlock.PARAMETER_LAYOUT_TOP = 0;
flow.AbstractBlock.PARAMETER_LAYOUT_SPACE = 5;
flow.AbstractBlock.PARAMETER_LAYOUT_HEIGHT = 25;
flow.AbstractBlock.PARAMETER_LAYOUT_WIDTH = 70;
flow.AbstractBlock.PARAMETER_LAYOUT_SPACE_INNER = 30;
flow.AbstractBlock.PARAMETER_LAYOUT_MIN_WIDTH = 120;

/** @private * */
flow.AbstractBlock.prototype.type = "flow.AbstractBlock";
flow.AbstractBlock.prototype.tag = "block";

flow.AbstractBlock.prototype.getCSSClassName = function()
{
    return this.type.replace("flow.", "");
};

flow.AbstractBlock.prototype.getCSSBaseClassName = function()
{
    return this.getCSSClassName();
};

flow.AbstractBlock.prototype.getMenuItems = function()
{
    if (this.deleteable === true) 
    { 
        return [ new flow.MenuItem("Delete", $.proxy(function()
        {
            this.destroy();
        },this)) ]; 
    }

    return [];
};

flow.AbstractBlock.prototype.setProperty = function(/*:String */text)
{
    this.property = text;
    this.layout(true, true);
};

/**
 * @return The calculated width of the element.
 * @type int
 */
flow.AbstractBlock.prototype.getPreferredWidth = function()
{
    return 100;
};

flow.AbstractBlock.prototype.getAllVariables = function(/* :Array */result)
{
    // go recursive to all children
    $.each(this.dropzone_static_parameters,function(index, zone)
    {
        if (zone.droppedBlock !== null)
            zone.droppedBlock.getAllVariables(result);
    });

    $.each(this.dropzone_dynamic_parameters,function(index, zone)
    {
        if (zone.droppedBlock !== null)
            tmp = zone.droppedBlock.getAllVariables(result);
    });

    $.each(this.dropzone_innerblocks,function(index, zone)
    {
        if (zone.droppedBlock !== null)
            tmp = zone.droppedBlock.getAllVariables(result);
    });

    if (this.block_next !== null)
        this.block_next.getAllVariables(result);
};

flow.AbstractBlock.prototype.renameVariable = function(/*:String */ oldVarName, /*:String */ newVarName)
{
    // go recursive to all children
    $.each(this.dropzone_static_parameters,function(index,zone)
    {
        if (zone.droppedBlock !== null)
            zone.droppedBlock.renameVariable(oldVarName, newVarName);
    });

    $.each(this.dropzone_dynamic_parameters,function(index,zone)
    {
        if (zone.droppedBlock !== null)
            tmp = zone.droppedBlock.renameVariable(oldVarName, newVarName);
    });

    $.each(this.dropzone_innerblocks,function(index,zone)
    {
        if (zone.droppedBlock !== null)
            tmp = zone.droppedBlock.renameVariable(oldVarName, newVarName);
    });

    if (this.block_next !== null)
        this.block_next.renameVariable(oldVarName, newVarName);
};

flow.AbstractBlock.prototype.getCanvas = function()
{
    return this.canvas;
};

/**
 * @return The calculated height of the element.
 * @type int
 */
flow.AbstractBlock.prototype.getHeight = function()
{
    var defaultHeight = 30;
    var requiredHeight = 0;

    $.each(this.dropzone_static_parameters,function(index, zone)
    {
        var tmp = flow.AbstractBlock.PARAMETER_LAYOUT_HEIGHT;
        if (zone.droppedBlock !== null)
            tmp = zone.droppedBlock.getHeight();
        requiredHeight = requiredHeight + flow.AbstractBlock.PARAMETER_LAYOUT_SPACE + tmp;
    });

    $.each(this.dropzone_dynamic_parameters,function(index, zone)
    {
        var tmp = flow.AbstractBlock.PARAMETER_LAYOUT_HEIGHT;
        if (zone.droppedBlock !== null)
            tmp = zone.droppedBlock.getHeight();
        requiredHeight = requiredHeight + flow.AbstractBlock.PARAMETER_LAYOUT_SPACE + tmp;
    });

    if (this.dropzone_innerblocks.length > 0)
        requiredHeight += flow.AbstractBlock.PARAMETER_LAYOUT_SPACE_INNER;

    $.each(this.dropzone_innerblocks,function(index, zone)
    {
        var tmp = flow.AbstractBlock.PARAMETER_LAYOUT_HEIGHT;
        if (zone.droppedBlock !== null)
            tmp = zone.droppedBlock.getRecursiveHeight();
        requiredHeight = requiredHeight + flow.AbstractBlock.PARAMETER_LAYOUT_SPACE_INNER + tmp;
    });

    return Math.max(defaultHeight, requiredHeight);
};

flow.AbstractBlock.prototype.getRecursiveHeight = function()
{
    var height = this.getHeight();
    if (this.block_next != null)
        height += this.block_next.getRecursiveHeight();
    return height;
};

flow.AbstractBlock.prototype.enableDropZoneBefore = function()
{
    this.dropzone_before = this.createDropZone("dropzone_before", "Before");
    this.dropzone_before.setDropCallback($.proxy(this.droppedOnDropZoneBefore,this));
};

flow.AbstractBlock.prototype.enableDropZoneNext = function()
{
    this.dropzone_next = this.createDropZone("dropzone_next", "Next");
    this.dropzone_next.setDropCallback($.proxy(this.droppedOnDropZoneNext,this));
};

flow.AbstractBlock.prototype.addDropZoneInnerBlock = function()
{
    var zone = this.createDropZone("dropzone_innerblock", "Next");
    zone.setDropCallback($.proxy(this.droppedOnDropZoneInnerBlock,this));
    this.dropzone_innerblocks.push(zone);
};

flow.AbstractBlock.prototype.addDropZoneStaticParameter = function(/* :String */label)
{
    var zone = this.createDropZone("dropzone_parameter", "Parameter");
    zone.setDropCallback($.proxy(this.droppedOnDropZoneStaticParameter,this));
    if (label !== undefined)
        zone.setLabel(label);
    zone.isStaticParameter = true;
    this.dropzone_static_parameters.push(zone);
};

flow.AbstractBlock.prototype.setDropZoneDynamicParameterCount = function( /* :int */param_max, /* :String */label)
{
    this.dynamic_parameters_max = param_max;
    // per default einen dynamischen PArameter anlegen
    //
    if (this.dynamic_parameters_max > 0)
    {
        var zone = this.createDropZone("dropzone_parameter", "Parameter");
        zone.setDropCallback(this.droppedOnDropZoneDynamicParameter.bind(this));
        this.dynamic_param_label = label;
        if (this.dynamic_param_label !== undefined)
            zone.setLabel(this.dynamic_param_label);
        this.dropzone_dynamic_parameters.push(zone);
    }
};

flow.AbstractBlock.prototype.droppedOnDropZoneInnerBlock = function(/* :flow.DropZone */zone, /* :flow.AbstractBlock */
dragged)
{
    if (dragged === this)
        return;

    if (dragged === null)
        return;

    if (dragged.block_next === this)
        return;

    // Das "dragged" Element ist nicht mehr ein TopLevel Element. Es ist ein Kind
    // von diesem Element => beim Canvas austragen
    if (this.canvas !== null)
        this.canvas.removeBlock(dragged);

    var last_dragged = dragged;
    while (last_dragged.block_next !== undefined && last_dragged.block_next !== null)
    {
        last_dragged = last_dragged.block_next;
    }

    if (zone.droppedBlock !== null)
    {
        // Das element ist bereits eingeh채ngt. Jetzt ersetzen wir dies mit dem "dropped" und
        // h채ngen uns an das "dropped" dran.
        last_dragged.setBlockNext(zone.droppedBlock);
    }
    zone.droppedBlock = dragged;
    dragged.block_outer = this;
    dragged.zone = zone;

    this.html.append(dragged.getHTML());

    this.layout(true, true);
};

flow.AbstractBlock.prototype.startDirectEdit = function(event)
{
    this.callInitialDirectEdit = false;
};

flow.AbstractBlock.prototype.droppedOnDropZoneBefore = function(/* :flow.DropZone */zone, /* :flow.AbstractBlock */
dragged)
{
    if (dragged === this)
        return;

    if (dragged === null)
        return;

    // Falls "dragged" nicht den Canvas als Vater hat, dann wurde dieser aus der PAlette
    // direkt auf die Zone geworfen. "Sicherheitshalber zu dem Canvas hinzuf체gen.
    // Mehrfachaufruf hat keine Auswirkung
    if (dragged.block_before === null)
        this.canvas.addBlock(dragged);

    // Das letzte Element in der Schlange des Dropped-Element finden. An diesem wird dann angeh채ngt
    //
    var tail = dragged;
    while (tail !== null && tail.block_next !== null)
        tail = tail.block_next;

    // falls dieser Block schon wo anders eingeh채ngt war, dann muss dieser
    // dort ausgeh채ngt werden
    //
    if (this.block_before !== null)
    {
        var tmp = this.block_before;
        this.block_before.removeBlock(this);
        // Das element ist bereits eingeh채ngt. Jetzt ersetzen wir uns mit dem "dropped" und
        // h채ngen uns an das "dropped" dran.
        tmp.setBlockNext(dragged);
    }

    if (this.block_outer !== null)
    {
        // Das element ist bereits eingeh채ngt. Jetzt ersetzen wir dies mit dem "dropped" und
        // h채ngen uns an das "dropped" dran.
        var outer = this.block_outer;
        var zone = this.zone;
        outer.removeBlock(this);
        outer.droppedOnDropZoneInnerBlock(zone, dragged);
    }
    // ansonsten muss es ein TopLevel element gewesen sein
    // => bei dem Canvas austragen, da dieser jetzt ein Unterelement ist.
    else
    {
        this.canvas.removeBlock(this);
    }

    tail.setBlockNext(this);
};

flow.AbstractBlock.prototype.droppedOnDropZoneNext = function(/* :flow.DropZone */zone, /* :flow.AbstractBlock */
dragged)
{
    if (dragged === this)
        return;

    if (dragged === null)
        return;

    if (dragged.block_next === this)
        return;

    // Das "dragged" Element ist nicht mehr ein TopLevel Element. Es ist ein Kind
    // von diesem Element => beim Canvas austragen
    if (this.canvas !== null)
        this.canvas.removeBlock(dragged);

    var last_dragged = dragged;
    while (last_dragged.block_next !== undefined && last_dragged.block_next !== null)
    {
        last_dragged = last_dragged.block_next;
    }

    if (this.block_next !== null)
    {
        // Das element ist bereits eingeh채ngt. Jetzt ersetzen wir uns mit dem "dropped" und
        // h채ngen uns an das "dropped" dran.
        last_dragged.setBlockNext(this.block_next);
    }
    this.setBlockNext(dragged);
    dragged.layout(true, true);
};

flow.AbstractBlock.prototype.droppedOnDropZoneStaticParameter = function(/* :flow.DropZone */zone, /* :flow.AbstractBlock */
dragged)
{
    if (dragged === this)
        return;

    if (dragged === null)
        return;

    // Das "dragged" Element ist nicht mehr ein TopLevel Element. Es ist ein Kind
    // von diesem Element => beim Canvas austragen
    if (this.canvas !== null)
        this.canvas.removeBlock(dragged);

    dragged.setCanvas(this.canvas);

    zone.enable(false);

    dragged.zone = zone;
    zone.droppedBlock = dragged;

    this.html.append(dragged.getHTML());
    dragged.block_left = this;

    this.layout(true, true);
    dragged.layout();
};

flow.AbstractBlock.prototype.droppedOnDropZoneDynamicParameter = function(
/* :flow.DropZone */zone, /* :flow.AbstractBlock */
dragged)
{
    if (dragged === this)
        return;

    if (dragged === null)
        return;

    // Das "dragged" Element ist nicht mehr ein TopLevel Element. Es ist ein Kind
    // von diesem Element => beim Canvas austragen
    if (this.canvas !== null)
        this.canvas.removeBlock(dragged);

    // Es kann sein, dass ein Block auf einen Zone geworfen wurde, welche bereits
    // durch einen Block belegt ist (dynamic parameter). In diesem Fall m체ssen alle
    // Block eins weiter rutschen und dem neuen Block Platz machen
    //
    if (zone.droppedBlock !== null)
    {
        var currentZone = this.dropzone_dynamic_parameters.last();
        var index = this.dropzone_dynamic_parameters.indexOf(zone);

        for ( var i = (this.dropzone_dynamic_parameters.length - 1); i >= index; i--)
        {
            var previousZone = this.dropzone_dynamic_parameters[i];
            currentZone.droppedBlock = previousZone.droppedBlock;
            if (currentZone.droppedBlock != null)
                currentZone.droppedBlock.zone = currentZone;
            currentZone = previousZone;
        };

    }

    dragged.zone = zone;
    zone.droppedBlock = dragged;

    this.html.append(dragged.getHTML());
    dragged.block_left = this;

    // Falls keine weiteren dynamischen Parameter angelegt werden d체rfen, dann
    // m체ssen alle DropZones disabled werden.
    //
    var enabled = this.dropzone_dynamic_parameters.length < this.dynamic_parameters_max;
    $.each(this.dropzone_dynamic_parameters, function(index, zone)
    {
        zone.enable(enabled);
    });

    // Falls erlaubt, dann noch mind. einen leeren Slot anlegen
    // wenn dieser nicht schon vorhanden ist
    if (this.dropzone_dynamic_parameters.length < this.dynamic_parameters_max)
    {
        var zone = this.createDropZone("dropzone_parameter", "Parameter");
        if (this.dynamic_param_label !== undefined)
            zone.setLabel(this.dynamic_param_label);
        zone.setDropCallback(this.droppedOnDropZoneDynamicParameter.bind(this));
        this.dropzone_dynamic_parameters.push(zone);
    }

    this.layout(true, true);
    dragged.layout();
};

flow.AbstractBlock.prototype.layout = function(/*:boolean */ propagateParentToo, /*:boolean */ propagateChildToo)
{
    this.applyStyle();

    if (this.block_next != null)
    {
        this.block_next.setPosition(-1, this.getHeight());
    }

    if (this.dropzone_before != null)
    {
        this.dropzone_before.setBoundingBox(0, -5, this.getPreferredWidth(), 10);
    }

    if (this.dropzone_next != null)
    {
        this.dropzone_next.setBoundingBox(0, this.getHeight() - 5, this.getPreferredWidth(), 10);
    }

    var next_y = flow.AbstractBlock.PARAMETER_LAYOUT_TOP;

    // Slot's der fixen Parameter arrangieren
    //
    $.each(this.dropzone_static_parameters,$.proxy(function( index, zone)
    {
        var tmp = flow.AbstractBlock.PARAMETER_LAYOUT_HEIGHT;
        if (zone.droppedBlock !== null)
        {
            tmp = zone.droppedBlock.getHeight();
            zone.droppedBlock.setPosition(this.getPreferredWidth(), next_y);
            zone.enable(false);
        }
        else
        {
            zone.enable(true);
        }

        zone.setBoundingBox(this.getPreferredWidth(), next_y, flow.AbstractBlock.PARAMETER_LAYOUT_WIDTH, tmp);
        next_y = next_y + flow.AbstractBlock.PARAMETER_LAYOUT_SPACE + tmp;
    },this));

    // Slot's der dynamischen Parameter arrangieren
    //
    $.proxy(this.dropzone_dynamic_parameters,$.proxy(function(index, zone)
    {
        var tmp = flow.AbstractBlock.PARAMETER_LAYOUT_HEIGHT;
        if (zone.droppedBlock !== null)
        {
            tmp = zone.droppedBlock.getHeight();
            zone.droppedBlock.setPosition(this.getPreferredWidth(), next_y);
            zone.setBoundingBox(this.getPreferredWidth(), zone.droppedBlock.y - flow.AbstractBlock.PARAMETER_LAYOUT_SPACE, zone.droppedBlock
                    .getPreferredWidth(), 2 * flow.AbstractBlock.PARAMETER_LAYOUT_SPACE);
            zone.enable(false);
        }
        else
        {
            zone.setBoundingBox(this.getPreferredWidth(), next_y, flow.AbstractBlock.PARAMETER_LAYOUT_WIDTH, tmp);
            zone.enable(true);
        }
        next_y = next_y + flow.AbstractBlock.PARAMETER_LAYOUT_SPACE + tmp;
    },this));

    if (this.dropzone_innerblocks.length > 0)
        next_y += flow.AbstractBlock.PARAMETER_LAYOUT_SPACE_INNER;

    // Slot's der inneren Bl철cke arrangieren
    // diese kommen nach allen Parametern (static und dynamic)
    $.each(this.dropzone_innerblocks, $.proxy(function(zone, index)
    {
        var tmp = flow.AbstractBlock.PARAMETER_LAYOUT_HEIGHT;
        if (zone.droppedBlock !== null)
        {
            tmp = zone.droppedBlock.getRecursiveHeight();
            zone.droppedBlock.setPosition(20, next_y);
        }
        zone.setBoundingBox(20, next_y, this.getPreferredWidth() - 20, tmp);
        next_y = next_y + flow.AbstractBlock.PARAMETER_LAYOUT_SPACE_INNER + tmp;
    },this));

    // es kann sein, dass sich die H쉎e/Breite des Elementes ge둵dert hat. Dies hat
    // einen Einfluss auf das Elternelement (ParameterKonsument an der Linken Seite)
    if (this.block_before != null && propagateParentToo === true)
        this.block_before.layout(true, false);

    if (this.block_next != null && propagateChildToo === true)
        this.block_next.layout(false, true);

    else if (this.block_left != null)
        this.block_left.layout(true, true);

    else if (this.block_outer != null)
        this.block_outer.layout(true, true);

    if (this.callInitialDirectEdit === true && this.html.parentNode !== null)
    {
        this.startDirectEdit();
    }
};

/**
 * Adds a PropertyChangeListener to the listener list. The listener is registered for all properties of this class, If listener is null, no exception is thrown and no action is performed.
 */
flow.AbstractBlock.prototype.setCanvas = function(canvas)
{
    if (this.canvas === canvas)
        return this.getHTML();

    this.canvas = canvas;
    if (canvas === null)
    {
        this.html.remove();
        this.html = null;
        $.each(this.dropzones,function(index, zone)
        {
            zone.setParent(null);
        });
    }
    else if (this.html === null)
    {
        this.html = this.createHTML();
        this.html.bind("contextmenu",$.proxy( function(event)
        {
            event.preventDefault();
            event.stopPropagation();
            $(".menu").remove();
            var items = this.getMenuItems();
            if (items.length === 0)
                return;
            var div = new Element("div", {
                "class" : "menu desktop",
                "style" : "left:" + event.pointerX() + ";top:" + event.pointerY()
            });
            var ul = new Element("ul");
            div.appendChild(ul);
            items.each(function(element)
            {
                var li = new Element("li");
                var a = new Element("a", {
                    "class" : "enabled"
                }).text(element.getLabel());
                a.bind("click", element.getAction().wrap($.proxy(function(proceed)
                {
                    $(".menu").remove();
                    proceed();
                }),this));
                li.append(a);
                this.append(li);
            }.bind(ul));
            $("body").append(div);
        },this));

        this.html.draggable({
            // REVERT wird nur aufgerufen wenn man bei dem DragDrop die ALT-Taste gedr웒kt h둳t.
            // So wird ein Drag&Copy eingeleitet. Einfach kopieren von Elementen w둹end dem DragDrop.
            //
            reverteffect : $.proxy(function(element, top_offset, left_offset)
            {
                element.hide();
                new Effect.Move(element, {
                    x : -left_offset,
                    y : -top_offset,
                    duration : 0
                });
                element.show();
                this.x = this.oldX;
                this.y = this.oldY;
            },this),
            starteffect : $.proxy(function(e)
            {
                new Effect.Opacity(e, {
                    from : 1.0,
                    to : 0.3,
                    duration : 0.5
                });
                this.oldX= this.x;
                this.oldY= this.y;
            },this),
            opacity: 0.35,
            zIndex: 27000,
            start : $.proxy(this.onDragStart,this),
            stop  : $.proxy(this.onDragEnd,this),
            drag  : $.proxy(this.onDrag,this)
        });
        this.html.bind("mousedown", $.proxy(this.onMouseDown,this));
        this.html.data("block", this);
        this.html.data("id",this.id);
        $.each(this.dropzones,$.proxy(function(index, zone)
        {
            var html = zone.setParent(this);
            this.html.append(html);
        },this));
    }
    return this.html;
};

flow.AbstractBlock.prototype.destroy = function()
{
    // Element war als Parameter an einer DropZone angeh채ngt => aush채ngen
    // 
    if (this.block_left !== null)
    {
        this.block_left.removeBlock(this);
        this.html.remove();
    }
    else if (this.block_before != null)
    {
        this.block_before.removeBlock(this);
        this.html.remove();
    }
    else
    {
        this.canvas.removeBlock(this);
    }
};

flow.AbstractBlock.prototype.setBlockNext = function(/* :AbstractBlock */block)
{
    // Der normale Nachfolger wird entfernt
    //
    block.setCanvas(this.canvas);
    this.block_next = block;
    block.block_before = this;
    this.html.append(this.block_next.getHTML());

    this.layout(true, true);
};

flow.AbstractBlock.prototype.getRootBlock = function()
{
    if (this.block_before !== null)
        return this.block_before.getRootBlock();
    return this;
};

flow.AbstractBlock.prototype.setCursor = function(/* :String */ cursorName)
{
    this.html.css({"cursor":cursorName});
};

flow.AbstractBlock.prototype.onMouseDown = function(event)
{
    this.html.draggable({ revert: false });

    if (event.altKey || event.ctrlKey ){
       this.html.draggable({ revert: true, ghosting:true });
    }
};

/**
 *
 **/
flow.AbstractBlock.prototype.onDragStart = function(event, ui)
{
    var ghosting = this.html.draggable( "option", "ghosting" );
    if(ghosting==true){
        this.setCursor("copy");
        return;
    }
    
    var o1 = this.html.offset();
    var o2 = $("#paintarea").offset();
    this.uiX = o1.left - o2.left-this.x;
    this.uiY = o1.top - o2.top-this.y;
    this.correctUIPosition= true;

    console.log(o1);
    console.log(o2);
    console.log(this.uiX);
    console.log(this.uiY);
     console.log(this.html.data('draggable').offset);

    // Falls das Element einen Vorg둵ger hat, wird dieses jetzt aus dieser Kette
    // ausgeh둵gt und bei dem Canvas als TopLevel Element eingetragen
    //
    if (this.block_before !== null)
    {
        this.block_before.removeBlock(this);
        this.app.getCanvas().addBlock(this);
    }
    else if (this.block_outer !== null)
    {
        this.block_outer.removeBlock(this);
        this.app.getCanvas().addBlock(this);
    }
    // Element war als Parameter an einer DropZone angeh채ngt => aush채ngen
    // 
    else if (this.block_left !== null)
    {
        this.block_left.removeBlock(this);
        this.app.getCanvas().addBlock(this);
    }

    if (this.zone != null)
    {
        this.zone.droppedBlock = null;
        this.zone = null;
    }
   
    if (this.html.hasClass("Next"))
    {
        $.each($(".is_Next"),$.proxy(function(index, element)
        {
            var $element = $(element);
            if ($element.closest(this.html).length>0)
                return;

            // keine 체berlagerten DropZones anzeigen. Es ist ein Element
            // oberhalb vorhanden. Diese DropZone wird angezeigt. Das reicht.
            if ($element.data("zone").droppedBlock !== null)
                return;

            $element.addClass("dropzone_glow");
        },this));
    }

    if (this.html.hasClass("Before"))
    {
        $.each($(".is_Before"),$.proxy(function(index,element)
        {
            var $element = $(element);
            if ($element.closest(this.html).length>0)
                return;
            
            // keine 체berlagerten DropZones anzeigen. Es ist ein Element
            // oberhalb vorhanden. Diese DropZone wird angezeigt. Das reicht.
            if ($element.data("zone").parent.block_before !== null)
                return;

            $element.addClass("dropzone_glow");
        },this));
    }

    if (this.html.hasClass("Parameter"))
    {
        $.each($(".is_Parameter"),$.proxy(function(index, element)
        {
            var $element = $(element);
            if ($element.closest(this.html).length>0)
                return;

            $element.addClass("dropzone_glow");
        },this));
    }
    $(".DropZone").removeClass("noSize");
    this.html.addClass("topLevel");
 };

 flow.AbstractBlock.prototype.onDrag = function(event, ui)
 {
     if(this.correctUIPosition){
         this.x = ui.position.left;
         this.y = ui.position.top;
        ui.position.left+= this.uiX;
        ui.position.top += this.uiY;
       // this.correctUIPosition = false;
        this.updatePosition();
     }
 };
 
 
flow.AbstractBlock.prototype.onDragEnd = function(event)
{
    var ghosting = this.html.draggable( "option", "ghosting" );
    // Clone the block and add them to the Canvas
    //
    if(ghosting==true){
        this.setCursor("pointer");
        this.draggable.options.ghosting=false;
        
        var canvasPos = this.app.getCanvas().getAbsolutePostion();
        var pos = this.html.offset();
        
        var content = flow.ModelXMLSerializer.toXML(this);
        
        var addModelFunction = $.proxy(function(node)
        {
            this.addBlock(node);
        },this.app.getCanvas());

        var node=flow.ModelXMLDeserializer.stringToXml(content);
        var newBlock = flow.ModelXMLDeserializer.fromXML(this, node.firstChild, addModelFunction);
        newBlock.setPosition(pos.left-canvasPos.left, pos.top-canvasPos.top);
        return;
    }
    
    $(".dropzone_glow").removeClass("dropzone_glow");
    $(".DropZone").addClass("noSize");

    this.html.removeClass("topLevel");
};


flow.AbstractBlock.prototype.updatePosition = function()
{
    var pos = this.html.position();
    this.x = pos.left;
    this.y = pos.top;
};

flow.AbstractBlock.prototype.removeBlock = function(/*:AbstractBlock*/ block)
{
    if (block === this)
        return;

    var zone = block.zone;
    if (zone !== null)
    {
        if (this.dropzone_innerblocks.indexOf(zone) !== -1)
        {
            block.zone = null;
            block.block_outer = null;
            zone.droppedBlock = null;
        }
        else if (this.dropzone_dynamic_parameters.indexOf(zone) !== -1)
        {
            // Eventuell unn쉞ige Parameterslot entfernen
            //
            var toCheck = this.dropzone_dynamic_parameters.clone();
            $.each(toCheck,$.proxy(function(index, zone)
            {
                if (zone.droppedBlock === block)
                {
                    this.dropzone_dynamic_parameters = this.dropzone_dynamic_parameters.without(zone);
                    this.dropzones = this.dropzones.without(zone);
                    zone.droppedBlock.zone = null;
                    zone.droppedBlock.block_left = null;
                    zone.setParent(null);
                    zone.droppedBlock = null;
                }
            },this));

            // Falls die Letzte DropZone schon belegt ist, dann wird jetzt
            // eine neue leere erzeugt.
            if (this.dropzone_dynamic_parameters.last().droppedBlock !== null)
            {
                var zone = this.createDropZone("dropzone_parameter", "Parameter");
                zone.setDropCallback($.proxy(this.droppedOnDropZoneDynamicParameter,this));
                if (this.dynamic_param_label !== undefined)
                    zone.setLabel(this.dynamic_param_label);
                this.dropzone_dynamic_parameters.push(zone);
            }
        }
        else if (this.dropzone_static_parameters.indexOf(zone) !== -1)
        {
            block.zone = null;
            block.block_left = null;
            zone.droppedBlock = null;
            zone.enable(true);
        }
    }

    if (this.block_next === block)
    {
        block.block_before = null;
        this.block_next = null;
    }

    this.layout(true, true);
};



flow.AbstractBlock.prototype.createHTML = function()
{
    throw "Override abstract method [flow.AbstractBlock.prototype.createHTML()]";
};

flow.AbstractBlock.prototype.getHTML = function()
{
    if (this.html === null)
        this.html = this.createHTML();
    return this.html;
};

flow.AbstractBlock.prototype.setPosition = function(/* :int */x, /* :int */y)
{
    this.x = x;
    this.y = y;
    this.applyStyle();
};

flow.AbstractBlock.prototype.applyStyle = function()
{
    if (this.html !== null)
    {
        this.html.css({
            position : "absolute",
            top : this.y,
            left : this.x,
            width : this.getPreferredWidth(),
            height : this.getHeight()
        });
    }
};

flow.AbstractBlock.prototype.createDropZone = function( /* :String */name, /* :String */accept)
{
    var dropZone = new flow.DropZone(name, accept);
    if (this.html !== null)
    {
        var html = dropZone.setParent(this);
        this.html.append(html);
    }
    this.dropzones.push(dropZone);
    return dropZone;
};

/**
 * Returns all attributes which are relevatn for serialization.
 * 
 * @return The list of persistend attribute.
 */
flow.AbstractBlock.prototype.getPersistentAttributes = function()
{
    var memento = {
        attributes : {}
    };

    // enrich the base attributes with the class/instance specific properties
    memento.attributes.id = this.id;
    memento.attributes.type = this.type;
    memento.attributes.x = this.x;
    memento.attributes.y = this.y;
    memento.attributes.implementation = this.implementation;

    if (this.dropzone_static_parameters.length > 0)
    {
        memento.static_param = {};
        memento.static_param.parameters = [];
        $.each(this.dropzone_static_parameters,function(index, zone)
        {
            if (zone.droppedBlock !== null)
                memento.static_param.parameters.push(zone.droppedBlock);
            else
                memento.static_param.parameters.push(new flow.ControlBlock_NULL( this.app ));
        });
        memento.static_param.getPersistentAttributes = function()
        {
            var memento = {
                attributes : {}
            };
            memento.parameters = this.parameters;
            return memento;
        };
    }

    if (this.dropzone_dynamic_parameters.length > 0)
    {
        memento.dynamic_param = {};
        memento.dynamic_param.parameters = [];
        $.each(this.dropzone_dynamic_parameters,function(index, zone)
        {
            if (zone.droppedBlock !== null)
                memento.dynamic_param.parameters.push(zone.droppedBlock);
        });
        
        memento.dynamic_param.getPersistentAttributes = function()
        {
            var memento = {
                attributes : {}
            };
            memento.parameters = this.parameters;
            return memento;
        };
    }

    if (this.dropzone_innerblocks.length > 0)
    {
        memento.innerblocks = {};
        memento.innerblocks.parameters = [];
        $.each(this.dropzone_innerblocks,function( index,zone)
        {
            if (zone.droppedBlock !== null)
                memento.innerblocks.parameters.push(zone.droppedBlock);
            else
                memento.innerblocks.parameters.push(new flow.ControlBlock_NULL(this.app));
        });
        
        memento.innerblocks.getPersistentAttributes = function()
        {
            var memento = {
                attributes : {}
            };
            memento.parameters = this.parameters;
            return memento;
        };
    }

    if (this.block_next !== null)
        memento.block = this.block_next;

    return memento;
};
