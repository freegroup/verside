
var CoreFilterpanel = Class.extend({

  /************************************************************************************************/
  init: function(containerId){
  /************************************************************************************************/
	this.currentModelName = null;
	this.currentTableName = null;
	this.currentControllerName=null;


	$(document).bind(EVENT_DETAIL_MODEL_LOADED, $.proxy(function(event,  modelName, tableName, controllerName){
	  this._onDetailModelLoaded(modelName, tableName, controllerName);
	},this));

	$(document).bind(EVENT_NAVIGATION_RECORDS_LOADED, $.proxy(function(event, controller){
	  this._onNavigationToRecordsDone(controller);
	},this));
  },

  
  /************************************************************************************************/
  _onNavigationToRecordsDone: function(controller){
  /************************************************************************************************/
     // stupid hack because th eslelectBox didn remove theire stuff!!!!!
     $(".selectBox-dropdown-menu").remove();

     // Attach to the last navigation entry a "Filter" pane.
     // The user can reduce the returned content with this static content filter.
     //
     var container = $("<div id='static_filter' class='columnnav_panel ui-widget-content search_panel'><div id='dd'></div></div>"); 
   
     var button = $("<button data-state='closed' style='position:absolute;width:30px; right:-33px;top:0px;'>Enter Filter Criteria</button>");
     button.button({
         text:false,
         icons: {
            primary: "ui-icon-search"
         }
     }).click(function(){
        	if(button.data('state')==="closed"){
				$("#static_filter").animate({left:0}, 500, function(){
				   button.data("state","open");
				});
			}
			else{
				$("#static_filter").animate({left:-250}, 500, function(){
				   button.data("state","closed");
				});
			}
     });
     button.appendTo(container);
	 console.log("filterpanel.appendto");
     container.appendTo($("#container_navigation_firstchild"));
     $("#dd").load("index.php/"+controller+"/filter", function(){
       $("#static_filter select").selectBox({});
     });
  },
  
  /************************************************************************************************/
  _onDetailModelLoaded: function( modelName, tableName, controllerName){
  /************************************************************************************************/
	  this.currentModelName = modelName;
	  this.currentTableName = tableName;
	  this.currentControllerName = controllerName;
  }
});
