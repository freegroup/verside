/**
 * Resize the font to the max size of the bounding box.
 * Andreas Herz
 **/
$.fn.updateOnServer = function() {

  //  var counter = this.length;
	
	this.each(function (i,el) {
	    $el = $(el);
		var css     = $el.attr("style");
		var column  = $el.data("column");
		var lastData = $el.data("Last_server_posted");
		var newData  = css+";column="+column;
		
		if(lastData !== newData){
		
            $.ajax({
                url: "index.php/controller_core_formelement/update/"+$el.data("pkey"),
                type: 'POST',
                dataType: "json",
                data: {
				   "css":css,
				   "column":column
				},
		    	success: $.proxy(function( response ) {
		    	  this.data("Last_server_posted",newData);
				//  counter--;
				//  console.log("counter:"+counter);
                },$el)
            }); // end ajax
	    }
	});
	return this;
};

