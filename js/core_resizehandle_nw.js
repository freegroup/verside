var CoreResizeHandle_NW = CoreResizeHandle.extend({

  /************************************************************************************************/
  init: function(element, data){
  /************************************************************************************************/  
     this._super(element, data);
     this.resizeHandle.css({"cursor":"nw-resize"});
     this.resizeHandle.addClass("resize_handle_NW");
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
	 var dim = this.getDimension();
     pos.left-=(dim.width);
     pos.top-=(dim.height);
     this.resizeHandle.css(pos);
  },

  
  /************************************************************************************************/
  updateElement: function(diffLeft, diffTop){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();
     this.element.css({"top":(pos.top-diffTop), "left":(pos.left-diffLeft),"height":(height+diffTop), "width":(width+diffLeft)});
	 $.each($(".[data-relatedinput='"+this.element.data("pkey")+"']"), function(i,item){
	    var $item = $(item);
		var top = parseInt($item.css("top"));
		var left = parseInt($item.css("left"));
		$item.css({"top":top-diffTop,"left":left-diffLeft});
	 });
  }

  
});



