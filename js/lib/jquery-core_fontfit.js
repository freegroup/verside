$.fn.equals = function(compareTo) {
   if (!compareTo || !compareTo.length || this.length!=compareTo.length){
     return false;
   }
   if(!this.length)
     return false;
   return (this[0] === compareTo[0]);
} 

/**
 * Resize the font to the max size of the bounding box.
 * Andreas Herz
 **/
$.fn.fontfit = function(max) {

    if(this.is("input"))
    {
        fontSize =  parseInt(Math.max(8,this.height())*0.85);
        // and set the style on the input
        this.css({"font-size":fontSize+"px","box-sizing": "margin-box"});
    }
    else if(this.is("textarea"))
    {
       // do nothing
    }
    else {
        fontSize =  parseInt(Math.max(8,this.height())*0.9);
        // and set the style on the input
        this.css({"font-size":fontSize+"px","box-sizing": "margin-box"});
    }

	return this;
};

