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

flow.DropZone=function(/*:String*/ name, /*:String*/ accept)
{
  this.name = name;
  this.x=0;
  this.y=0;
  this.width=10;
  this.height=10;
  this.width_save=10;
  this.height_saved=10;
  this.html=null;
  this.image=null;
  this.callback=null;
  this.parent=null;
  this.droppedBlock=null;
  this.accept=accept;
  this.label = "";
  this.label_html = null;
  this.enabled=true;
  this.isStaticParameter=false;
  /** @private **/
  this.id = flow.UUID.create();
};


/** @private **/
flow.DropZone.prototype.type="DropZone";


/**
 *
 **/
flow.DropZone.prototype.setParent=function(/*:flow.AbstractBlock*/ block )
{
	if(block===null)
	{
	   if(this.html!==null)
	      this.html.remove();
	   this.parent = null;
	   this.html=null;
	}
	else
	{
	   this.html = this.createHTML();
	   this.parent = block;
	   
	   if(this.label_html!=null)
	      this.label_html.addClass(block.getCSSBaseClassName()+"_parameter_decoration");
	      
       this.html.droppable( 
       {    
         accept: "."+this.accept,
         hoverClass:"droppable_hover",
         drop: $.proxy(this.onDroppedAbstractBlock,this)
       });	  
       
	}
	return this.html;
};


flow.DropZone.prototype.getParent=function()
{
	return this.parent;
};


flow.DropZone.prototype.onDroppedAbstractBlock=function(event, ui )
{
	if(this.callback!=null)
	  this.callback(this, ui.draggable.data("block"));
};


flow.DropZone.prototype.createHTML=function()
{
    // Falls die DropZone Parameter akzeptiert, dann muss er sich auch so darstellen,
    // dass man dies erkennt
    if(this.accept === "Parameter")
    {
       this.html= $('<div class="'+this.type+'" > </div>');
       this.label_html= $('<div class="Parameter_decoration">'+this.label+"</div>");
       this.image= $('<img class="Parameter_slot" src="'+flow.Configuration.IMAGE_PATH+'Parameter_slot.gif"></img>');
       this.html.append(this.label_html);
	   this.html.append(this.image);
    }
    else
    {
       this.html= $('<div class="'+this.type+'"> </div>');
    }
    this.html.addClass("is_"+this.accept);
    this.html.addClass("noSize");
    this.html.data("zone",this);
	this.applyStyle();
	return this.html;
};


flow.DropZone.prototype.enable=function(/*:boolean*/ flag)
{
  if(this.image===null)
    return;

  this.enabled = flag;
  if(flag===true)
  {
    this.image.show();
    this.label_html.removeClass("Parameter_decoration_plugged");
  }
  else
  {
    this.image.hide();
    this.label_html.addClass("Parameter_decoration_plugged");
  }
  this.applyStyle();
};

flow.DropZone.prototype.setLabel=function(/*:String*/ label)
{
 	this.label=label;
 	if(this.label_html!==null)
 	   this.label_html.text(this.label);
};


flow.DropZone.prototype.setBoundingBox=function(/*:int*/ x, /*:int*/ y, /*:int*/ width, /*:int*/ height)
{
   this.x = x;
   this.y = y;
   this.width = width;
   this.height = height;
   this.applyStyle();
};

flow.DropZone.prototype.setPosition=function(/*:int*/ x, /*:int*/ y)
{
   this.x = x;
   this.y = y;
   this.applyStyle();
};

flow.DropZone.prototype.getPosition=function()
{
   return {x:x, y:y};
};


flow.DropZone.prototype.setDropCallback=function(/*:function*/ callback)
{
	this.callback = callback;
};

flow.DropZone.prototype.applyStyle=function()
{
   if(this.html!==null)
   {
     if(this.isStaticParameter===false || this.enabled==true)
     {
        this.html.css({"position":"absolute","top":this.y+"px","left":this.x+"px","width":this.width+"px","height":this.height+"px"});
     }
     else
     {
        // Da die z-order des elemente ganz oben ist, fängt das Element die DragDrop Events ab. Somit können
        // Angehängte Elemente (wie Parameter) nicht abgehängt werden da das Linke Element mit dieser DropDrop das
        // KlickEvent abfängt. Lösung: Bei angehängtem Element machen wir die DropZone im disabled Mode ganz klein.
        this.html.css({"position":"absolute","top":this.y+"px","left":this.x+"px","width":"0px","height":"0px"});
     }
   }
};