(function($){

  // Click speed threshold, defaults to 500.
  $.tripleclickThreshold = 500;

  // Special event definition.
  $.event.special.tripleclick = {
  
    /**********************************************************************************************/
    setup: function( data ) {
    /**********************************************************************************************/
//       console.log("setup");
       $(this).bind( 'click', click_handler );
       $(this).data("__tripleclickSelectors__",[]);
    },
    
    /**********************************************************************************************/
    teardown: function() {
    /**********************************************************************************************/
//       console.log("teardown");
       $(this).unbind('click', click_handler );
       $(this).removeData("__tripleclickSelectors__");
    },
    
    /**********************************************************************************************/
    remove: function( handleObj ){
    /**********************************************************************************************/
//      console.log("remove");
      var selectors = $(this).data("__tripleclickSelectors__");
      var index = selectors.indexOf(handleObj.selector);
      selectors.remove(index);
      $(this).data("__tripleclickSelectors__",selectors);
    },
    
    /**********************************************************************************************/
    add: function( handleObj ){
    /**********************************************************************************************/
//      console.log("add");
      var selectors = $(this).data("__tripleclickSelectors__");
      
      if(handleObj.selector)
         selectors.push(handleObj.selector);
      else
         selectors.push("__self__");
    }
  };

  // This function is executed every time an element is clicked.
  function click_handler( event ) {
    var elems = $([]);
    var $this = $(this);
    var selectors = $this.data("__tripleclickSelectors__");

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
      var data = elem.data("__tripleclickcounter__");
      
      if(!data){
        data={ clicks: 0, last: 0 };
        elem.data("__tripleclickcounter__",data);
      }

      // If more than `threshold` time has passed since the last click, reset
      // the clicks counter.
      if ( event.timeStamp - data.last >  $.tripleclickThreshold ) {
          data.clicks = 0;
      }
      
      // Update the element's last-clicked timestamp.
      data.last = event.timeStamp;

      if(++data.clicks===3){
         elem.trigger( 'tripleclick');
         data.clicks = 0;
      }
    });
  };

})(jQuery);
