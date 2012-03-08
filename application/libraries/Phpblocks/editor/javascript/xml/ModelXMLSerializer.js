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
flow.ModelXMLSerializer=function()
{
   alert("do not init this class. Use the static methods instead");
};


flow.ModelXMLSerializer.toXML=function(obj, objectName, indentSpace)
{
   if(obj === undefined)
      return "";
      
   if(objectName === undefined)
   {
       objectName = obj.tag;
   }
   indentSpace = indentSpace?indentSpace:'';
   var indentSpace_plusOne = indentSpace + "   ";

   var t = flow.ModelXMLSerializer.getTypeName(obj);
   var elementsXML ="";
   var attributesXML="";
   var isAnonymousContainer=false;
   var emptyElement=true;
   switch(t)
   {
      case "int":
      case "number":
      case "boolean":
         elementsXML= obj; 
         emptyElement=false;
         break;
      case "string":
         elementsXML= flow.ModelXMLSerializer.xmlEncode(obj);
         emptyElement=false;
         break;
      case "date":
         elementsXML= obj.toLocaleString();
         emptyElement=false;
         break;
      case "Array":
      case "array":
         isAnonymousContainer = true;
         elementsXML= "";
         for(var i =0;i<obj.length;i++)
         {
            var current = obj[i];
            if(current === undefined)
            {
              continue;
            }
            elementsXML += flow.ModelXMLSerializer.toXML(current, current.tag,indentSpace_plusOne );
            emptyElement=false;
         }
         elementsXML += indentSpace;
         break;
      default:
         if(obj!==null)
         {
            var memento = obj.getPersistentAttributes();
            var attributes = memento.attributes;
            var elements = memento;
            for(var name in elements)
            {
               if(name === "attributes" || name === undefined)
               {
                  continue;
               }
               emptyElement=false;
               elementsXML += flow.ModelXMLSerializer.toXML(elements[name], name, indentSpace_plusOne);
            }
            elementsXML += "\n"+indentSpace;
            
            for(var name in attributes)
            {
               var attValue = attributes[name];
               if(attValue===undefined)
                  continue;
               if(attValue===null)
                  attValue="";
               attributesXML = attributesXML +" "+name+"="+'"'+flow.ModelXMLSerializer.xmlEncode(attValue)+'"';
            }
            
            if(attributesXML.length>0)
            {
              attributesXML+=" ";
            }
         }
      break;
    }
    
    if(isAnonymousContainer)
    {
      return elementsXML;
    }
    
    var s="";

    if(emptyElement)
    {
       s =  "\n"+indentSpace+'<' + objectName + attributesXML+'/>';
    }
    else
    {
       s =  "\n"+indentSpace+'<' + objectName + attributesXML+'>';
       s += elementsXML;   
       s += "</" + objectName + ">";
    }
    
    return s;
};



flow.ModelXMLSerializer.isSimpleVar=function(t)
{
   switch(t)
   {
      case "int":
      case "string":
      case "String":
      case "Number":
      case "number":
      case "Boolean":
      case "boolean":
      case "bool":
      case "dateTime":
      case "Date":
      case "date":
      case "float":
      return true;
   }

   return false;
};


flow.ModelXMLSerializer.getTypeName=function(obj)
{
   if (obj===null)
   {
      return "undefined";
   }

   if (obj instanceof Array)
   {
      return "Array";
   }

   if (obj instanceof Date)
   {
      return "Date";
   }
   var t  = typeof(obj);

   if(t==="number")
   {
      return (parseInt(obj,10).toString() == obj)?"int":"number";
   }


   if (flow.ModelXMLSerializer.isSimpleVar(t))
   {
      return t;
   }

   return obj.type;
};


flow.ModelXMLSerializer.xmlEncode=function(textToEncode)
{
   var t  = typeof(textToEncode);
   if(t=="number")
   {
	return ""+textToEncode;
	}
	
  var result = textToEncode;
  
  var amp = /&/gi;
  var gt = />/gi;
  var lt = /</gi;
  var quot = /"/gi;
  var apos = /'/gi;
  
  var xml_gt = "&#62;";
  var xml_lt = "&#38;#60;";
  var xml_amp = "&#38;#38;";
  var xml_quot = "&#34;";
  var xml_apos = "&#39;";
  
  result = result.replace(amp, xml_amp);
  result = result.replace(quot, xml_quot);
  result = result.replace(lt, xml_lt);
  result = result.replace(gt, xml_gt);
  result = result.replace(apos, xml_apos);
  return result;
};