var CoreDialogAddFolder = Class.extend({

     /************************************************************************************************/
     init: function( parentId ){
     /************************************************************************************************/
         this.BASE_URL = "index.php/";
         this.parentId = parentId;
    },
  
    /************************************************************************************************/
    show: function(){
    /************************************************************************************************/

      $("#dialogs" ).attr("style","");
	  $("#dialogs" ).load(this.BASE_URL+"controller_core_dialog/template/addFolder", $.proxy(function(){
	     $("#dialogs" ).dialog({
	          modal: true,
	          title:"Add new Folder",
              buttons: {
                 'Create': $.proxy(function() {
                            this._addFolder();
                        },this),
                 'Cancel': $.proxy(function() {
                            $( '#dialogs' ).dialog( 'close' );
                        },this)
                    },
                    width: '350px'
          }); // end dialog
 		  var input =$('#dialogs').find("#name");
		  input.focus()
			   .keydown($.proxy(function(e) {
                 if(e.keyCode == 13) {
                     input.blur();
                     this._addFolder();
                     e.preventDefault();
                 }
          },this));
	   },this));// end load
    },


   /************************************************************************************************/
   _addFolder: function(){
   /************************************************************************************************/
     if($('#dialogs').find("#name").val()===""){
       $( '#dialogs' ).dialog( 'close' );
       return;
     }
       
     $("#parentId").val(this.parentId);
     $.ajax({
         url: this.BASE_URL+"/controller_core_navigation/create",
         type: 'POST',
         data: $( '#dialog_form' ).serialize(),
         success: $.proxy(function( response ) {
               $( '#dialogs' ).dialog( 'close' );
               if(this.parentId=="0"){
                  coreTrigger(COMMAND_NAVIGATION_LOAD);
               }
               else{
                  coreTrigger(COMMAND_NAVIGATION_NAVIGATE,[".columnnav_listentry[data-id="+this.parentId+"]"]);
               }
        },this) //end success
     }); //end ajax()
  }
});
