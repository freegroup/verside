var CoreResizeHandle_E = CoreResizeHandle.extend({

  /************************************************************************************************/
  init: function(element, data){
  /************************************************************************************************/  
     this._super(element, data);
     this.resizeHandle.css({"cursor":"e-resize"});
     this.resizeHandle.addClass("resize_handle_E");
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();
	 var dim = this.getDimension();
	 
     pos.left = pos.left+width;//-(dim.width/2);
     pos.top  = pos.top+height/2-(dim.height/2);
     
     this.resizeHandle.css(pos);
  },

  /************************************************************************************************/
  updateElement: function(diffLeft, diffTop){
  /************************************************************************************************/
    // we need the clean CSS style and not the modified from jQuery
    // there is a massive different between LABEL and INPUT!
    var width = parseInt(this.element[0].style.width);
//     var width = this.element.outerWidth();

     this.element.css({"width":(width-diffLeft)});
  }
});



