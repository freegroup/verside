var CoreResizeHandle_W = CoreResizeHandle.extend({

  /************************************************************************************************/
  init: function(element, data){
  /************************************************************************************************/  
     this._super(element, data);
     this.resizeHandle.css({"cursor":"w-resize"});
     this.resizeHandle.addClass("resize_handle_W");
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();
	 var dim = this.getDimension();
	 
     pos.left = pos.left-(dim.width);
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

     var pos = this.element.position();
     this.element.css({"left":(pos.left-diffLeft),"width":(width+diffLeft)});
	 $.each($(".[data-relatedinput='"+this.element.data("pkey")+"']"), function(i,item){
	    var $item = $(item);
		var left = parseInt($item.css("left"));
		$item.css({"left":left-diffLeft});
	 });
  }
});



