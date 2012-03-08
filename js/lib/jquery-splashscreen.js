// A self-executing anonymous function,
// standard technique for developing jQuery plugins.

(function($){
	
	$.fn.splashScreen = function(settings){
		
		// Providing default options:
		
		settings = $.extend({
			textLayers		: [],
			textShowTime	: 2000,
			textTopOffset	: 40
		},settings);
		
		var promoIMG = this;

		// Creating the splashScreen div.
		// The rest of the styling is in splashscreen.css
		var splashScreen = $('<div>',{
			id	: 'splashScreen'
		});
		$('body').append(splashScreen);
		
		splashScreen.click(function(){
			splashScreen.fadeOut('slow');
		});
		
		// Extracting the functionality as a 
		// separate function for convenience.
		
		function showText(id){
			var text = $('<div class="intro_HeaderText intro_FadeText">'+settings.textLayers[id]+'</div>').hide();
			
			splashScreen.append(text);
      		
			text.fadeIn('slow').delay(settings.textShowTime).fadeIn(1,function(){
			       if(settings.textLayers[id+1]){
  	                    text.fadeOut('slow', function(){
			       		    text.remove();
				            showText(id+1);
				        });
				   }
				   else{
				       splashScreen.click();
				   }

			});
		}
		showText(0);
		return this;
	}
	
})(jQuery);