
function growl(message, title){
  $.jGrowl(message, { 
	beforeOpen:function(e,m,o){$(e).removeClass("ui-corner-all ui-state-highlight");},
	life:1500,
	close:false,
	header: title
 });
};