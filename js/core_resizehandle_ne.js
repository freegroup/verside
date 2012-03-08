var CoreResizeHandle_NE = CoreResizeHandle.extend({

  /************************************************************************************************/
  init: function(element, data){
  /************************************************************************************************/  
     this._super(element, data);
     this.resizeHandle.css({"cursor":"ne-resize"});
     this.resizeHandle.addClass("resize_handle_NE");
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();
	 var dim = this.getDimension();
     pos.left = pos.left+width;
     pos.top  = pos.top-(dim.height);
     this.resizeHandle.css(pos);
  },
  
  /************************************************************************************************/
  updateElement: function(diffLeft, diffTop){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();
     this.element.css({"top":(pos.top-diffTop),"height":(height+diffTop), "width":(width-diffLeft)});
	 $.each($(".[data-relatedinput='"+this.element.data("pkey")+"']"), function(i,item){
	    var $item = $(item);
		var top = parseInt($item.css("top"));
		$item.css({"top":top-diffTop});
	 });
  }
  
});



