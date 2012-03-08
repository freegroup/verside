var CoreResizeBorder = Class.extend({

  /************************************************************************************************/
  init: function(element){
  /************************************************************************************************/
	 this.element = element;
	 
     this.top = $("<div class='resize_border'></div>");
     this.top.css({"background":"url('./images/ants-horizontal.gif') repeat-x scroll 0 -6px transparent"});
     this.top.appendTo($(element).parent());
 
     this.bottom = $("<div class='resize_border'></div>");
     this.bottom.css({"background":"url('./images/ants-horizontal.gif') repeat-x scroll 0 0 transparent"});
     this.bottom.appendTo($(element).parent());

     this.left = $("<div class='resize_border'></div>");
     this.left.css({"background":"url('./images/ants-vertical.gif') repeat-y scroll -6px 0 transparent"});
     this.left.appendTo($(element).parent());

     this.right = $("<div class='resize_border'></div>");
     this.right.css({"background":"url('./images/ants-vertical.gif') repeat-y scroll 0 0 transparent"});
     this.right.appendTo($(element).parent());

     this.updatePosition();
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
     var height = this.element.outerHeight();
     var width = this.element.outerWidth();

     pos.left-=1;
     pos.top-=1;
     pos["height"] = 2;
     pos["width"] = this.element.outerWidth();
     this.top.css(pos);

     pos.top+=height;
     this.bottom.css(pos);

     pos.top-=height;
     pos.height = height;
     pos.width = 2;
     this.left.css(pos);
     
     pos.left +=width;
     this.right.css(pos);
  },
  

  /************************************************************************************************/
  remove: function(){
  /************************************************************************************************/
     this.top.remove();
     this.bottom.remove();
     this.left.remove();
     this.right.remove();
  }
  
});



