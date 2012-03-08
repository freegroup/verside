var CoreResizeHandle_S = CoreResizeHandle.extend({

  /************************************************************************************************/
  init: function(element, data){
  /************************************************************************************************/  
     this._super(element, data);
     this.resizeHandle.css({"cursor":"s-resize"});
     this.resizeHandle.addClass("resize_handle_S");
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();
	 var dim = this.getDimension();
     pos.left = pos.left+width/2-(dim.width/2);
     pos.top  = pos.top+height;
     this.resizeHandle.css(pos);
  },

  /************************************************************************************************/
  updateElement: function(diffLeft, diffTop){
  /************************************************************************************************/
     // we need the clean CSS style and not the modified from jQuery
     // there is a massive different between LABEL and INPUT!
     var height = parseInt(this.element[0].style.height);
     this.element.css({"height":(height-diffTop)});
  }
});



