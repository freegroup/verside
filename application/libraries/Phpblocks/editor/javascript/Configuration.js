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

var _demo_ =false;

flow.Configuration=function(){};

// A Path ends always with a "/"
//
flow.Configuration.IMAGE_PATH="./css/editor/";

flow.Configuration.GET_FILE="./rpc/getFile.php";
flow.Configuration.GET_FILES="./rpc/getFiles.php";
flow.Configuration.SAVE_FILE="./rpc/saveFile.php";
flow.Configuration.CREATE_FILE="./rpc/createFile.php";
flow.Configuration.DELETE_FILE="./rpc/deleteFile.php";

$.extend({
    distinct : function(anArray) {
       var result = [];
       $.each(anArray, function(i,v){
           if ($.inArray(v, result) == -1) result.push(v);
       });
       return result;
    }
});

//Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


/**
 * OVERRIDE the default scriptacoulus DragDrop behaviour!!!!
 *          Add a hook to listen for the "startDrag" event.
 */
/*
Draggables.updateDrag= function(event) {
    if(!this.activeDraggable) return;
    var pointer = [Event.pointerX(event), Event.pointerY(event)];

    // now dragging takes into account the scroll offset of the containers.
    // START_PATCH
    if(this.activeDraggable.options.ghosting){
      var offsetcache = Element.cumulativeScrollOffset(this.activeDraggable.element);
      pointer[0] += offsetcache[0];
      pointer[1] += offsetcache[1];
    }
    // END_PATCH
    
    // Mozilla-based browsers fire successive mousemove events with
    // the same coordinates, prevent needless redrawing (moz bug?)
    if(this._lastPointer && (this._lastPointer.inspect() == pointer.inspect())) return;
    this._lastPointer = pointer;

    this.activeDraggable.updateDrag(event, pointer);
};

  
Object.extend(Draggable.prototype, {
    startDrag: function(event) {
        this.dragging = true;
        if(!this.delta)
          this.delta = this.currentDelta();

        if(this.options.zindex) {
          this.originalZ = parseInt(Element.getStyle(this.element,'z-index') || 0);
          this.element.style.zIndex = this.options.zindex;
        }

        // NEW LINE BY FREEGROUP!!!!!
        // You can change the ghosting effect in the new dragStart method to toggle between copy and move ove
        // an element. This can depend on the ALT or CTRL key!
        //
        if(this.options.beforeDrag) {
            this.options.beforeDrag(event, this.element);
        }

        if(this.options.ghosting) {
          this._clone = this.element.cloneNode(true);
          this._originallyAbsolute = (this.element.getStyle('position') == 'absolute');
          if (!this._originallyAbsolute)
            Position.absolutize(this.element);
          this.element.parentNode.insertBefore(this._clone, this.element);
        }

        if(this.options.scroll) {
          if (this.options.scroll == window) {
            var where = this._getWindowScroll(this.options.scroll);
            this.originalScrollLeft = where.left;
            this.originalScrollTop = where.top;
          } else {
            this.originalScrollLeft = this.options.scroll.scrollLeft;
            this.originalScrollTop = this.options.scroll.scrollTop;
          }
        }

        Draggables.notify('onStart', this, event);

        if(this.options.starteffect) this.options.starteffect(this.element);
     }
}
);
    */ 