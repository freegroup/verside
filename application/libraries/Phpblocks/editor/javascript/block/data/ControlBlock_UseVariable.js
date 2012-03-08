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
flow.ControlBlock_UseVariable = function(/* flow.Application */app, /* :String */id)
{
    flow.ControlBlock_AbstractData.call(this, app, "de.tif.jacob.util.flow.block.variable.UseVariable", id);

    this.group = "Variable";
    this.property = "variable name";
};

/** @private * */
flow.ControlBlock_UseVariable.prototype = new flow.ControlBlock_AbstractData();
/** @private * */
flow.ControlBlock_UseVariable.prototype.type = "flow.ControlBlock_UseVariable";

flow.ControlBlock_UseVariable.prototype.renameVariable = function(/* :String */oldVarName, /* :String */newVarName)
{
    // it is not possible to rename predefined Variables. Predefined Variables are set by the app-programmer
    // via script.
    if (this.app.getPredefinedVariables().indexOf(oldVarName) !== -1)
        return; // silently

    flow.ControlBlock_AbstractData.prototype.renameVariable.call(this, oldVarName, newVarName);
    if (this.property === oldVarName)
    {
        this.property = newVarName;
        this.layout();
    }
};

flow.ControlBlock_UseVariable.prototype.isDataProvider = function()
{
    return true;
};

flow.ControlBlock_UseVariable.prototype.createHTML = function()
{
    var html = flow.ControlBlock_AbstractData.prototype.createHTML.call(this);
    this.selector = $('<div title="Click to select existing variable" class="'+this.getCSSBaseClassName() + '_selector">&or;</div>');
    this.selector.hide();
    this.html.hover( 
            $.proxy(function(e)  {
               this.selector.show(300);
            },this), 
            $.proxy(function(e){
               this.selector.hide(300);
            },this));

    this.selector.bind('click', $.proxy(function(e)
    {
        $(".menu").remove();
        e.stopPropagation();
        var elements = this.app.getAllVariables();

        var list = $('<ul class="menu "' + this.getCSSBaseClassName() + '"_selectormenu"></div>');
        $.each(elements, $.proxy(function(index, item)
        {
            var e_li = $('<li></li>');
            var e_a = $('<a href="#"  title="'+item+' >'+item+'</a>');
            e_a.bind("click", $.proxy(function(event)
            {
                event.stopPropagation();
                $(".menu").remove();
                this.setProperty(item);
            },this));

            list.append(e_li.append(e_a));
        },this));
        var pos1 = this.selector.offset();
        var pos2 = this.canvas.html.offset();
        pos1.left -= pos2.left;
        pos1.top -= pos2.top;
        list.hide();
        this.canvas.html.append(list);
        list.css(pos1);
        list.show(300);
    },this));

    this.html.append(this.selector);
    return html;
};