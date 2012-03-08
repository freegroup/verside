(function() {

    jQuery.fn['mouseIn'] = function (event) {
	   if(this.lenght===0)
	      return false;
		  
	   var left   = event.pageX;
	   var top    = event.pageY;
       var offset = this.offset();
       var height = this.height();
       var width  = this.width();
	  
	   if(offset===null)
	     return false;
	     
	   return (left>offset.left&& left <(offset.left+width))&&(top>offset.top&& top <(offset.top+height));
    }
})();