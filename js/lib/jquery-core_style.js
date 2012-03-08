(function() {

    var elementStyle = 
	{
	   height:"25px",
	   fontSize:"1em"
	};
	
    var titleStyle = 
	{
	   height:"25px",
	   fontSize:"1em"
	};

    jQuery.fn['copyStyle'] = function () {
        if(this.length===0)
		   return this;
		   
	    // Didn't work. Because did have a cssHook for "height" and "width"....in this case
	    // jQuery calculates paddingTop and paddingBottom,...to the returend value
	    // See in jequery-1-6-4 in line 6463
	    // jQuery.each(["height", "width"], function( i, name ) {......
	    //
	    //   clipboard.elementHeight   = this.css("height");	   
	    elementStyle.height = this[0].style.height;
	    elementStyle.fontSize = this.css("font-size");
		
		
  	    return this;
    }

    jQuery.fn['pasteStyle'] = function () {

	   this.each(function (i,el) {
		   var el = $(el);
		   el.css(elementStyle);
	   });


	   return this;
    }
})();