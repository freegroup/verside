(function( $ ){

 
   var settings ={
    click:function(){}
  };
 
 var methods = {
 
     init : function( options ) {
      $.extend( settings, options);
        
       return this.each(function(){
         
         var $this = $(this);
         $this.text();
      });
    },
    
    set : function( params ) { 
       
       var text = params.labels.join("</span><span class='breadcrumb_delimiter'>&nbsp;</span><span class='breadcrumb_link'>");
       text = "<div class='breadcrumb_container'><span class='breadcrumb_link'>"+text+"</span></div>";
       var self = this;
       this.each(function(){    
           var $this = $(this);
           $this.html(text);
           var links = $this.find(".breadcrumb_link")
           var delimiters = $this.find(".breadcrumb_delimiter")
           var container =$this.find(".breadcrumb_container");
           var requiredWidth=0;
           container.children().each( function(){ requiredWidth += $(this).outerWidth();});

           var delimiterWidth=0;
           delimiters.each( function(){ delimiterWidth += $(this).outerWidth();});

           var diff = $this.outerWidth()- requiredWidth;

           // Breadcrumb pass in the äusseren Container - fein. Man muss
           // nichts machen
           if(diff>0) {
             links.each(function(i, element){
                $(element).data("index",i);
             });
           }
           // versuchen die Elemente bis auf einem min. zu verkleiner.....BreadCrumb wird dann zusätzlich 
           // right aligned.
           else{
             // get the width of the last Element. Because the last Element should have the full
             // required width.
             var lastElementWidth= links.last().width();
			 var widthForTheOthers = $this.outerWidth()-lastElementWidth-delimiterWidth;
			 var maxWidthForEach =widthForTheOthers/(links.length);
             links = links.not(links.last());
             links.each(function(i, element){
                // dummerweise kann man "max-width" nicht mit jQuery animieren. Somit
                // gehe ich hier über "width" und prüfe vorher ab ob das Element überhaupt
                // größer ist und somit eine verkleinerung notwendig ist. Ein simuliertes "max-width"
                if($(element).width()>maxWidthForEach)
                   $(element).animate({"width":maxWidthForEach},300);
                $(element).data("index",i);
             });
           }
           links.bind("click touch",$.proxy(function(event){
                settings.click(event, $(event.target).data("index"));
           },this));

        });
        return this;
    }
  };

  $.fn.scrollcrumb = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.scrollcrumb' );
    }    
  
  };

})( jQuery );