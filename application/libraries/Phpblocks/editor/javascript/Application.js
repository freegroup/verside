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
flow.Application = function()
{
    this.id = flow.UUID.create();
    this.commandStack = new flow.CommandStack();
    this.parts = [];
    this.canvas = new flow.Canvas("paintarea", "scrollarea");
    this.predefinedVariables = [];

    $.each($(".palette_part"),$.proxy(function(index, element)
    {
        this.parts.push(new flow.PalettePart(this, element));
    },this));
};

flow.Application.prototype.renameVariable = function(/* :String */oldVar, /* :String */newVar)
{
    // it is not possible to rename predefined Variables. Predefined Variables are set by the app-programmer
    // via scripting.
    if (this.predefinedVariables.indexOf(oldVar) !== -1)
        return; // silently

    $.each(this.canvas.blocks,function(index, element)
    {
        element.renameVariable(oldVar, newVar);
    });
};

flow.Application.prototype.getPredefinedVariables = function()
{
    return this.predefinedVariables;
};

flow.Application.prototype.getAllVariables = function()
{
    var result = [];
    $.proxy(this.canvas.blocks,function(index, element)
    {
        element.getAllVariables(result);
    });

    return result.concat(this.predefinedVariables).distinct();
};

flow.Application.prototype.getRelatedFields = function()
{
    return this.relatedFields;
};

/**
 * Set the new id of the cloude node element.
 * 
 * @param {String}
 *            if The new id of the model element
 */
flow.Application.prototype.setId = function(/* :String */id)
{};

flow.Application.prototype.getCanvas = function()
{
    return this.canvas;
};

flow.Application.prototype.getCommandStack = function()
{
    return this.commandStack;
};

flow.Application.prototype.execute = function(/* :flow.Command */command)
{
    if (command instanceof flow.Command)
        this.commandStack.execute(command);
    else
        throw "Command doesn't implement required interface [flow.Command]";
};

flow.Application.prototype.saveDocument = function(/* :String */docId, /* :function */onSuccess)
{
    var content = flow.ModelXMLSerializer.toXML(app.getCanvas().blocks);
    content = [ "<flow>", content, "</flow>" ].join("\n");
    var req = new Ajax.Request(flow.Configuration.SAVE_FILE, {
        method : 'post',
        parameters : {
            xml : docId,
            content : content
        },
        onFailure : function(transport)
        {
            alert("error");
        },
        onSuccess : onSuccess
    });
};


flow.Application.prototype.loadDocument = function(/* :String */docId)
{
    $.ajax({
        url:flow.Configuration.GET_FILE,
        dataType:"xml",
        data:{
          xml: docId
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Unable to create File on the server. \nMissing write permission to 'data' directory?");
        },
        success: $.proxy(function( response ) {
            try
            {
                flow.ModelXMLDeserializer.fromXML(this, response.firstChild);
            }
            catch (e)
            {
                alert("Edit Document\n" + e);
            }
       },this) //end success
    }); //end ajax()

};
