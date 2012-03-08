var CoreResizeHandle_N = CoreResizeHandle.extend({

  /************************************************************************************************/
  init: function(element, data){
  /************************************************************************************************/  
     this._super(element, data);
     this.resizeHandle.css({"cursor":"n-resize"});
     this.resizeHandle.addClass("resize_handle_N");
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
     var width = this.element.outerWidth();
	 var dim = this.getDimension();
     pos.left=pos.left+width/2-(dim.width/2);
     pos.top-=(dim.height);
     this.resizeHandle.css(pos);
  },

  
  /************************************************************************************************/
  updateElement: function(diffLeft, diffTop){
  /************************************************************************************************/
     var pos = this.element.position();
     // we need the clean CSS style and not the modified from jQuery
      // there is a massive different between LABEL and INPUT!
    var height = parseInt(this.element[0].style.height);
     this.element.css({"top":(pos.top-diffTop), "height":(height+diffTop)});
	 $.each($(".[data-relatedinput='"+this.element.data("pkey")+"']"), function(i,item){
	    var $item = $(item);
		var top = parseInt($item.css("top"));
		$item.css({"top":top-diffTop});
	 });
  }

  
});



