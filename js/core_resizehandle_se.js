var CoreResizeHandle_SE = CoreResizeHandle.extend({

  /************************************************************************************************/
  init: function(element, data){
  /************************************************************************************************/  
     this._super(element, data);
     this.resizeHandle.css({"cursor":"se-resize"});
     this.resizeHandle.addClass("resize_handle_SE");
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();
	 var dim = this.getDimension();
     pos.left = pos.left+width;
     pos.top  = pos.top+height;
     this.resizeHandle.css(pos);
  },

  /************************************************************************************************/
  updateElement: function(diffLeft, diffTop){
  /************************************************************************************************/
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();
     this.element.css({"height":(height-diffTop), "width":(width-diffLeft)});
  }
});



