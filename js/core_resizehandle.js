var CoreResizeHandle = Class.extend({

  /************************************************************************************************/
  init: function(element, data){
  /************************************************************************************************/
	// Define default settings
	this.settings = {
		update: function(){},
		stop: function(){},
		start: function(){}
	};
	
	// merge them
	$.extend(this.settings, data);
	
	 this.element = element;
	 
     this.resizeHandle = $("<div class='resize_handle'></div>");
     this.resizeHandle.appendTo($(element).parent());
     this.resizeHandle.draggable({

		    snap:".[data-draggable=true]",
		    snapMode: 'outer',
		    snapTolerance: 10 ,
		
			drag: $.proxy(function(event, ui) {
			   var diffLeft = parseInt(this.resizeHandle.css("left"))-ui.position.left;
			   var diffTop = parseInt(this.resizeHandle.css("top"))-ui.position.top;
			   this.updateElement(diffLeft,diffTop);
			   this.settings.update();
			},this),
			start: this.settings.start,
			stop: this.settings.stop
     });
     this.updatePosition();
  },
  /************************************************************************************************/
  getDimension: function(){
  /************************************************************************************************/
     return {"width":this.resizeHandle.width(), "height":this.resizeHandle.height()};
  },
  
  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
     var pos = this.element.position();
     this.resizeHandle.css(pos);
  },
  
  /************************************************************************************************/
  updateElement: function(diffLeft, diffTop){
  /************************************************************************************************/
  },

  /************************************************************************************************/
  remove: function(){
  /************************************************************************************************/
     this.resizeHandle.remove();
  }
  
});



