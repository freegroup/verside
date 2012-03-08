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
 * @version @VERSION@
 * @author Andreas Herz
 * @private
 **/

function removeTextNodes(nodes)
{
   var result = [];
   for(var i=0;i<nodes.length;i++)
   {
      var child = nodes.item(i);
      var attName = child.nodeName;

      if(attName === "#text")
      {
    	  continue;
      }
      result.push(child);
  }
  return result;
}

flow.ModelXMLDeserializer=function()
{
   alert("do not init this class. Use the static methods instead");
};


flow.ModelXMLDeserializer.stringToXml=function(/*:String*/ xmlString)
{
    var xmlDoc;
    if (window.DOMParser)
    {
        parser=new DOMParser();
        xmlDoc=parser.parseFromString(xmlString,"text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async="false";
        xmlDoc.loadXML(xmlString);
    } 
    
    return xmlDoc;
}

flow.ModelXMLDeserializer.fromXML=function(/*:Application*/ app, /*:DOMNode*/ node, /*:Funktion*/ addModelFunction, /*:Object*/ nodeRoot, /*:int*/ childIndex)
{
   var nodeName = ""+node.nodeName;
   var nodeType = node.attributes.getNamedItem("type");
   var value = node.nodeValue;
   
   if(value===null)
   {
     if(node.nodeTypedValue)
        value = node.nodeTypedValue;
     else
	    value=node.textContent;
   }
   
   var obj = null;
   
   switch(nodeName)
   {
      case "static_param":
         addModelFunction = $.proxy(function(box, index)
         {
            var zone = this.dropzone_static_parameters[index];
            box.setCanvas(this.getCanvas());
            this.droppedOnDropZoneStaticParameter(zone, box);
         },nodeRoot);
         break;
      case "dynamic_param":
         addModelFunction = $.proxy(function(box, index)
         {
            box.setCanvas(this.getCanvas());
            this.getCanvas().addBlock(box);
            var zone = this.dropzone_dynamic_parameters[index];
            this.droppedOnDropZoneDynamicParameter(zone, box);
         },nodeRoot);
         break;
      case "innerblocks":
         addModelFunction = $.proxy(function(box, index)
         {
            var zone = this.dropzone_innerblocks[index];
            box.setCanvas(this.getCanvas());
            this.droppedOnDropZoneInnerBlock(zone, box);
         },nodeRoot);
         break;
      case "block":
         if(nodeType.nodeValue ===flow.ControlBlock_NULL.prototype.type)
           break;
         var proto = eval(nodeType.nodeValue);
         obj = new proto(app);
         nodeRoot = obj;
         addModelFunction(obj, childIndex);
         var x = node.attributes.getNamedItem("x").nodeValue;
         var y = node.attributes.getNamedItem("y").nodeValue;
         obj.setPosition(x,y);
         addModelFunction = $.proxy(function(box, index)
         {
            this.setBlockNext(box);
         },nodeRoot);
         break;
      case "flow":
         addModelFunction = $.proxy(function(node)
         {
             this.addBlock(node);
         },app.getCanvas());
         break;
      case "property":
        nodeRoot.setProperty(value); 
      default:
 		return value;
   }

   if(obj!=null)
   {
     var attributes = node.attributes;
     for(var ii=0;ii<attributes.length;ii++)
     {
        var childAtt = attributes.item(ii);
        obj[childAtt.nodeName] = childAtt.nodeValue;
     }
     if(obj instanceof flow.AbstractBlock)
       obj.updatePosition();
   }

   var childNodes = removeTextNodes(node.childNodes);
   for(var i=0;i<childNodes.length;i++)
   {
      var child = childNodes[i];
      var attName = child.nodeName;

      var childModel = flow.ModelXMLDeserializer.fromXML(app, child, addModelFunction, nodeRoot, i);
   }
   
   return obj;
};
