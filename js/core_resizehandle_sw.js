var CoreResizeHandle_SW = CoreResizeHandle.extend({

  /************************************************************************************************/
  init: function(element, data){
  /************************************************************************************************/  
     this._super(element, data);
     this.resizeHandle.css({"cursor":"sw-resize"});
     this.resizeHandle.addClass("resize_handle_SW");
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
	 var dim = this.getDimension();
     pos.left-=(dim.width);
     pos.top=pos.top+height;
     this.resizeHandle.css(pos);
  },
  
  /************************************************************************************************/
  updateElement: function(diffLeft, diffTop){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();
     this.element.css({"left":(pos.left-diffLeft), "height":(height-diffTop), "width":(width+diffLeft)});
	 $.each($(".[data-relatedinput='"+this.element.data("pkey")+"']"), function(i,item){
	    var $item = $(item);
		var left = parseInt($item.css("left"));
		$item.css({"left":left-diffLeft});
	 });
  }

  
});



