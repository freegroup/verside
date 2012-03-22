
var CoreNavigationPropertiesPanel = Class.extend({

  /************************************************************************************************/
  init: function(){
  /************************************************************************************************/
    this.container = null;
    this.selectedNavEntry = null;
    this.show();
  },

  /************************************************************************************************/
  show: function(){
  /************************************************************************************************/

     // Attach to the last navigation entry a "Filter" pane.
     // The user can reduce the returned content with this static content filter.
     //
     this.container = $("<div id='dialog_navigation_properties' class='ui-widget-content search_panel'>"+
                        "<div class='ui-layout-center'>"+
                        "   <div class='dialog_header'>Menu Settings</div>"+
                        "   <div class='dialog_label'>Label</div>"+
                        "   <input class='dialog_input' type='text' id='property_navigation_name' >"+
						"   <br>"+
						"   <br>"+
                        "</div>"+
                        "<div class='ui-layout-south toolbar'>"+
                        "<button  class='button_delete toolbar_button'  id='button_design_navigation_delete'>Delete</button>"+
                        "<button  class='button_ok toolbar_button button_right_align'  id='button_design_navigation_done'>Done</button>"+
                        "</div>"+
                        "</div>"); 
     this.container.appendTo($("#container_detail"));
     this.container.animate({"left":0},"normal");
     var ajaxTimeOut=-1;
     
     $("#property_navigation_name").bind("keyup",$.proxy(function(e){
           if (e.which == 13) {
           		$("#property_navigation_name").blur();
           }
		   var label = $("#property_navigation_name").val();
		   var id = this.selectedNavEntry.data("id");
		   this.selectedNavEntry.data("name",label);
		   this.selectedNavEntry.find(".columnnav_listentry_label").text(label);
		   
		   if(ajaxTimeOut!=-1) { 
			  clearTimeout(ajaxTimeOut);
			  ajaxTimeOut=-1;
		   }
		   ajaxTimeOut = setTimeout(function(){
			   $.ajax({
				  url: "index.php/controller_core_navigation/update/"+id,
				  type: 'POST',
				  data:{name: label}
			   });
		   },800);
     },this));
	 
	 // layout the pane
	 //
    this.toolbarHeight=$("#container_detail_toolbar").outerHeight();
 	this.layoutObj2 = $('#dialog_navigation_properties').layout({
      center: {
          resizeWhileDragging:true,
          resizeContentWhileDragging:true
      },
	  south: {
          resizable:false,
          closable:false,
          spacing_open:0,
		  size: this.toolbarHeight
      }
    });
	
	// add the button for close the pane.
	//
	$("#button_design_navigation_done").button()
	   .click($.proxy(function(){
	     coreTrigger(COMMAND_DESIGNMODE_NAVIGATION, [false]);
	   },this));
	   
	$("#button_design_navigation_delete").button()
	   .click($.proxy(function(){
	     coreTrigger(COMMAND_NAVIGATION_DELETE, [this.selectedNavEntry]);
	   },this));
  },
  
  
  /************************************************************************************************/
  update: function(navEntryToShow){
  /************************************************************************************************/
    this.selectedNavEntry = navEntryToShow;
    if(navEntryToShow!==null && navEntryToShow.data("model")==="Model_formelement"){
       var name = navEntryToShow.data("name");
       navEntryToShow.find(".columnnav_listentry_label");
       $("#property_navigation_name").val(name);
    }
    else{
       $("#property_navigation_name").val("");
    }
  },
  
  /************************************************************************************************/
  remove: function(){
  /************************************************************************************************/

     // Attach to the last navigation entry a "Filter" pane.
     // The user can reduce the returned content with this static content filter.
     //
     this.container.animate({"left":-260},"normal", $.proxy(function(){
     	this.container.remove();
     	this.container = null;
     },this));
     
  }
});
