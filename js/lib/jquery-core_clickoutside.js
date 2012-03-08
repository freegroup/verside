/**
 * Event for clickoutside an element. Usefull for "Hide Contextmenu" or deselection of elements.
 *
 * inspect http://benalman.com/news/2010/03/jquery-special-events/
 * for documentation
 **/
(function($){

  // A collection of elements to which the clickoutside event is bound.
  var elems = $([]);

  // Special event definition.
  $.event.special.clickoutside = {
    setup: function(){
      // Add this element to the internal collection.
      elems = elems.add( this );

      // If this is the first element to which the event has been bound,
      // bind a handler to document to catch all 'click' events.
      if ( elems.length === 1 ) {
        $(document).bind( 'click', handle_event );
      }
    },
    teardown: function(){
      // Remove this element from the internal collection.
      elems = elems.not( this );

      // If this is the last element removed, remove the document 'click'
      // event handler that "powers" this special event.
      if ( elems.length === 0 ) {
        $(document).unbind( 'click', handle_event );
      }
    },
    add: function( handleObj ) {
      // Save a reference to the bound event handler.
      var old_handler = handleObj.handler;

      // This function will now be called when the event is triggered,
      // instead of the bound event handler.
      handleObj.handler = function( event, elem ) {

        // Set the event object's .target property to the element that the
        // user clicked, not the element on which the 'clickoutside' event
        // was triggered.
        event.target = elem;

        // Call the originally-bound event handler, complete with modified
        // event object! The result from this call doesn't need to be
        // returned, because there is no default action to prevent, and 
        // nothing to propagate to.
        old_handler.apply( this, arguments );
      };
    }
  };

  // When an element is clicked..
  function handle_event( event ) {

    // Iterate over all elements in the internal collection.
    $(elems).each(function(){
      var elem = $(this);

      // If this element isn't the clicked element, and this element doesn't
      // contain the clicked element, then the clicked element is considered
      // outside, and the event should be triggered!
      if ( this !== event.target && !elem.has(event.target).length ) {

        // Use triggerHandler instead of trigger so that the event doesn't
        // bubble. Pass the 'click' event.target so that the 'clickoutside'
        // event.target can be overridden.
        elem.triggerHandler( 'clickoutside', [ event.target ] );
      }
    });
  };

})(jQuery);
