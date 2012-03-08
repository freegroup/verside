(function( $ ){

 
   var settings ={
    click:function(){}
  };
 
 var methods = {
 
    /************************************************************************************************/
     init : function( options ) {
    /************************************************************************************************/
      $.extend( settings, options);
        
       this.each(function(){
         
         var $this = $(this);
         // don't init it twice
	     if(!this.top){
			 this.top = $("<div class='resize_border'></div>");
			 this.top.css({"background":"url('./images/ants-horizontal.gif') repeat-x scroll 0 -6px transparent"});
			 this.top.appendTo($this.parent());
	 
			 this.bottom = $("<div class='resize_border'></div>");
			 this.bottom.css({"background":"url('./images/ants-horizontal.gif') repeat-x scroll 0 0 transparent"});
			 this.bottom.appendTo($this.parent());
	
			 this.left = $("<div class='resize_border'></div>");
			 this.left.css({"background":"url('./images/ants-vertical.gif') repeat-y scroll -6px 0 transparent"});
			 this.left.appendTo($this.parent());
	
			 this.right = $("<div class='resize_border'></div>");
			 this.right.css({"background":"url('./images/ants-vertical.gif') repeat-y scroll 0 0 transparent"});
			 this.right.appendTo($this.parent());
         }
      });
      this.ants("update");
      return this;
    },
    
    /************************************************************************************************/
    remove : function( params ) { 
    /************************************************************************************************/
       this.each(function(){
	     if(this.top){
	        this.top.remove();
	        this.top = null;
	        
	        this.bottom.remove();
	        this.bottom = null;
	        
	        this.left.remove();
	        this.left=null;
	        
	        this.right.remove();
	        this.right=null;
         }         
       });       
       return this;
    },
   
    /************************************************************************************************/
    update: function(params){
    /************************************************************************************************/
       return this.each(function(){
         
	     if(this.top){
			 var $this = $(this);
			 var pos = $this.position();
			 var height = $this.outerHeight();
			 var width = $this.outerWidth();
		
			 pos.left-=1;
			 pos.top-=1;
			 pos["height"] = 2;
			 pos["width"] = $this.outerWidth();
			 this.top.css(pos);
		
			 pos.top+=height;
			 this.bottom.css(pos);
		
			 pos.top-=height;
			 pos.height = height;
			 pos.width = 2;
			 this.left.css(pos);
			 
			 pos.left +=width;
			 this.right.css(pos);
		  }
	  });
   }
  
  };

  $.fn.ants = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.ants' );
    }    
  
  };

})( jQuery );