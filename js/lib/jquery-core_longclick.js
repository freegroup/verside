(function($){

  // Special event definition.
  $.event.special.click = {
    add: function( handleObj ) {
      // Save a reference to the bound event handler.
      var old_handler = handleObj.handler;
      var selector = handleObj.selector;
        // The current element.
      var  elem = $(this);
      
      handleObj.handler = function( event ) {
        var realTarget = elem;
        if(selector)
          realTarget = $(event.target).closest(selector);
        
        if ( realTarget.data("longclick_done")===true ) {
          event.type ="longclick";
        }
        
        return old_handler.apply( this, arguments );
      };
    }
  };

})(jQuery);



(function($){

  // Click speed threshold, defaults to 500.
  $.longclickThreshold = 1000;

  // Special event definition.
  $.event.special.longclick = {
  
    /**********************************************************************************************/
    setup: function( data ) {
    /**********************************************************************************************/
//       console.log("setup");
 	   if($.event.special.longclick.is_touch_device()===true){
          $(this).bind( 'touchstart', mousedown_handler );
          $(this).bind( 'touchend', mouseup_handler );
       }
       else{
          $(this).bind( 'mousedown', mousedown_handler );
          $(this).bind( 'mouseup', mouseup_handler );
       }
       $(this).data("__longclickSelectors__",[]);
    },
    
    /**********************************************************************************************/
    teardown: function() {
    /**********************************************************************************************/
//       console.log("teardown");
 	   if($.event.special.longclick.is_touch_device()===true){
          $(this).unbind('touchstart', mousedown_handler );
          $(this).unbind( 'touchend', mouseup_handler );
       }
       else{
          $(this).unbind('mousedown', mousedown_handler );
          $(this).unbind( 'mouseup', mouseup_handler );
       }
       $(this).removeData("__longclickSelectors__");
    },

    /**********************************************************************************************/
    is_touch_device: function() {  
    /**********************************************************************************************/
        try {  
          document.createEvent("TouchEvent");  
          return true;  
        } catch (e) {  
        return false;  
        }  
    },

    /**********************************************************************************************/
    remove: function( handleObj ){
    /**********************************************************************************************/
//      console.log("remove");
      var selectors = $(this).data("__longclickSelectors__");
      var index = selectors.indexOf(handleObj.selector);
      selectors.remove(index);
      $(this).data("__longclickSelectors__",selectors);
    },
    
    /**********************************************************************************************/
    add: function( handleObj ){
    /**********************************************************************************************/
//      console.log("add");
      var selectors = $(this).data("__longclickSelectors__");
      
      if(handleObj.selector)
         selectors.push(handleObj.selector);
      else
         selectors.push("__self__");
    }
  };

  // This function is executed every time an element is clicked.
  function mousedown_handler( event ) {
    var elems = $([]);
    var $this = $(this);
    var selectors = $this.data("__longclickSelectors__");

    for(var i=0; i<selectors.length; i++){
       var selector = selectors[i];
       if(selector==="__self__"){
           elems = elems.add($this);
       }
       else{
          var realTarget = $(event.target).closest(selector);
          if(realTarget.size()>0){
              elems = elems.add(realTarget);
          }
       }
    }

    // Iterate over all selected elements.
    elems.each(function(){
      var elem = $(this);
      elem.removeData("__longclick__");
      elem.delay($.longclickThreshold).queue(function(){
         elem.trigger( 'longclick');
         elem.data("__longclick__","done");
         $(this).dequeue();
      });
    });
  };
  
  // This function is executed every time an element is clicked.
  function mouseup_handler( event ) {
    var elems = $([]);
    var $this = $(this);
    var selectors = $this.data("__longclickSelectors__");

    for(var i=0; i<selectors.length; i++){
       var selector = selectors[i];
       if(selector==="__self__"){
           elems = elems.add($this);
       }
       else{
          var realTarget = $(event.target).closest(selector);
          if(realTarget.size()>0){
              elems = elems.add(realTarget);
          }
       }
    }
    // Iterate over all selected elements.
    elems.each(function(){
      var elem = $(this);
      elem.clearQueue();
    });
  };

})(jQuery);
