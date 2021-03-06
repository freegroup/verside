
var CoreDialogAddFolder = Class.extend({

     /************************************************************************************************/
     init: function( parentId ){
     /************************************************************************************************/
         this.parentId = parentId;
         this.template = '<form id="dialog_form" action="" method="">'+
                         '   <div class="dialog_pane" id="wizard_pane_01">'+
                         '      <div class="ui-layout-south toolbar">'+
                         '         <button  class="button_delete toolbar_button" id="CoreDialogAddFolder_cancel" >Cancel</button>'+
                         '         <button  class="button_ok toolbar_button button_right_align" id="CoreDialogAddFolder_ok">Create</button>'+
                         '      </div>'+
                         '      <div class="dialog_content_header dialog_header">Name your new Menu</div> '+           
                         '      <div class="dialog_content">'+
                         '             <label class="dialog_label" for="name" >Name</label><br>'+
                         '             <input class="dialog_input" type="text" id="name" name="name" autofocus />'+
                         '             <br>'+
				         '             <div id="addFolder_name_error" class="dialog_validateError"></div>'+
                         '      </div>'+
                         '  </div>'+
                         '</form>';
    },
  
    /************************************************************************************************/
    show: function(){
    /************************************************************************************************/
      var $dialog = $("#dialogs");
	  $dialog.html(this.template)
        	 .css({"height":300});
        	
      $dialog.reveal({
       	     animation: 'fadeAndPop',                   //fade, fadeAndPop, none
       	     animationspeed: 200,                       //how fast animations are
       	     closeonbackgroundclick: false              //if you click background will modal close?
      });

      $("#CoreDialogAddFolder_ok").button().click( $.proxy(function(e) {
	      e.preventDefault();
	      this._addFolder();
      },this));
                         
      $("#CoreDialogAddFolder_cancel").button().click( $.proxy(function(e) {
	     e.preventDefault();
	  $dialog.trigger('reveal:close');
      },this));
       
       
	  var input =$('#dialogs').find("#name");
	  input.focus()
		   .keydown($.proxy(function(e) {
                if(e.keyCode == 13) {
                    this._addFolder();
                    e.preventDefault();
                }
      },this));
    },


   /************************************************************************************************/
   _addFolder: function(){
   /************************************************************************************************/
     var $input = $('#dialogs').find("#name");
     var name = $input.val();
     if(name===""){
       $("#addFolder_name_error").text("Name is a required Field");
       return;
     }
     
     CoreBackend.Navigation.create(this.parentId,name,$.proxy(function( response ) {
        $input.blur();
        $( '#dialogs' ).trigger('reveal:close');
        if(this.parentId=="0"){
            coreTrigger(COMMAND_NAVIGATION_LOAD);
        }
        else{
        	// increase the "child counter" of the parent navigation entry.
        	var counter = $("#"+this.parentId+" .columnnav_listentry_counter");
        	counter.text(parseInt(counter.text())+1);
        	counter.show();
        	
        	// reload the navigation child pane
            coreTrigger(COMMAND_NAVIGATION_NAVIGATE,[".columnnav_listentry[data-id="+this.parentId+"]"]);
        }
     },this));
}
});
