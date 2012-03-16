var CoreDialogAddTable = Class.extend({

     /************************************************************************************************/
     init: function( parentId ){
     /************************************************************************************************/
        this.parentId = parentId;
         
         this.template = '<form id="dialog_form" target="#" onsubmit="return false;">'+
         
                         '   <div class="dialog_pane" id="wizard_pane_01">'+
                         '      <div class="ui-layout-south toolbar">'+
                         '         <button  class="button_delete toolbar_button CoreDialogAddTable_cancel" >Cancel</button>'+
                         '         <button  class="button_ok toolbar_button button_right_align" id="CoreDialogAddTable_next1">Next &gt;&gt;</button>'+
                         '      </div>'+
                         '      <div class="dialog_content_header dialog_header">Name your new Form</div> '+           
                         '      <div class="dialog_content">'+
                         '         <label class="dialog_label">Screen Name:</label><br>'+
                         '         <input class="dialog_input" type="text" id="addTable_alias" autofocus name="alias" value="">'+
                         '         <br>'+
				         '         <div id="addTable_alias_error" class="dialog_validateError"></div>'+
			             '     </div>'+
                         '   </div>'+

                         '   <div class="dialog_pane" id="wizard_pane_02">'+
                         '      <div class="ui-layout-south toolbar">'+
                         '         <button  class="button_delete toolbar_button CoreDialogAddTable_cancel" >Cancel</button>'+
                         '         <button  class="button_ok toolbar_button button_right_align" id="CoreDialogAddTable_next2" >Next &gt;&gt;</button>'+
                         '         <button  class="button_ok toolbar_button button_right_align" id="CoreDialogAddTable_back2">&lt;&lt; Back</button>'+
                         '      </div>'+
                         '     <div class="dialog_content_header dialog_header">Select database table to use</div>   '+       
                         '     <div class="dialog_content">'+
                         '         <label class="dialog_label">Screen Data</label><br>'+
                         '         <select class="dialog_input" size="7" name="tablename" id="addTable_tablename" >'+
  						 '            {{each tables}}                    '+
                         '            <option value="${name}">${name}</option>'+
  						 '            {{/each}}                                          '+
                         '         </select>'+
                         '         <div id="addTable_tablename_error" class="dialog_validateError"></div>'+
                         '     </div>'+
                         '    </div>'+

                         '    <div class="dialog_pane"  id="wizard_pane_03">'+
                         '      <div class="ui-layout-south toolbar">'+
                         '         <button  class="button_delete toolbar_button CoreDialogAddTable_cancel" >Cancel</button>'+
                         '         <button  class="button_ok toolbar_button button_right_align" id="CoreDialogAddTable_create">Create</button>'+
                         '         <button  class="button_ok toolbar_button button_right_align" id="CoreDialogAddTable_back3">&lt;&lt; Back</button>'+
                         '      </div>'+
                         '       <div class="dialog_content_header dialog_header">Select the major field to show</div>      '+
                         '       <div class="dialog_content">'+
                         '           <label class="dialog_label">Display Column</label><br>'+
                         '           <select  class="dialog_input" size="7" name="representative_field" id="addTable_representative_field" style="width:100%">'+
                         '             <option selected="true" value="any">any</option>'+
                         '           </select>'+
                         '           <div id="addTable_representative_field_error" class="dialog_validateError"></div>'+
		                 '      </div>'+
                         '    </div>'+
                         
                         '    <input type="hidden" id="parentId" name="parent_id" />'+
                         '</form>';
    },

    /************************************************************************************************/
    show: function(){
    /************************************************************************************************/
        CoreBackend.Model.getTables($.proxy(function(json){
        	var $form= $.tmpl(this.template,{"tables":json});
        	var $dialog = $("#dialogs" );
        	
        	$dialog.html($form)
        	       .css({"height":300});
        	
        	$dialog.find(".dialog_pane")
        	        .hide()
        	        .first()
        	        .show();
        	
        	$dialog.reveal({
        	     animation: 'fadeAndPop',                   //fade, fadeAndPop, none
        	     animationspeed: 200,                       //how fast animations are
        	     closeonbackgroundclick: false              //if you click background will modal close?
       	    });
        	
			var tableSelectionCallback = $.proxy(function(){
  	           var tableName = $('#dialog_form .[name="tablename"]').val();
	           this._loadFieldListbox(tableName);
			},this);
			$("#addTable_tablename").change(tableSelectionCallback);
			
			$(".CoreDialogAddTable_cancel").button().click($.proxy(function(){
				 $dialog.trigger('reveal:close');
			},this));
			
			$("#CoreDialogAddTable_next1").button().click($.proxy(function(){
			     if($("#addTable_alias").val()===""){
			        $("#addTable_alias_error").text("Name is a required field");
			     }
                 else{
				    $("#wizard_pane_01").fadeOut(300);
				    $("#wizard_pane_02").fadeIn(300);
				 }
			},this));
	        $('#addTable_alias')
		      .keydown(function(e) {
                if(e.keyCode == 13) {
                    $('#addTable_alias').blur();
				    $("#wizard_pane_01").fadeOut(300);
				    $("#wizard_pane_02").fadeIn(300);
                    e.preventDefault();
                }
            });
			
			$("#CoreDialogAddTable_next2").button().click($.proxy(function(){
				 $("#wizard_pane_02").fadeOut(300);
				 $("#wizard_pane_03").fadeIn(300);
			},this));
			
			$("#CoreDialogAddTable_back2").button().click($.proxy(function(){
				console.log("back");
				 $("#wizard_pane_02").fadeOut(300);
				 $("#wizard_pane_01").fadeIn(300);
			},this));

			
			$("#CoreDialogAddTable_create").button().click($.proxy(function(){
				this._onSubmit();
			},this));
			
			$("#CoreDialogAddTable_back3").button().click($.proxy(function(){
				console.log("back");
				 $("#wizard_pane_03").fadeOut(300);
				 $("#wizard_pane_02").fadeIn(300);
			},this));
			
			var input =$('#addTable_alias');
	        input.focus()

        },this)); // getTables
    },
	
    /************************************************************************************************/
	_onCancel: function(index){
    /************************************************************************************************/
		$("#dialogs").trigger('reveal:close');
	},

	
    /************************************************************************************************/
	_onSubmit: function(){
    /************************************************************************************************/
       $("#parentId").val(this.parentId);
       this._addTable();
 	   $("#dialogs").trigger('reveal:close');
	},

	
    /************************************************************************************************/
	_onNext: function(index){
    /************************************************************************************************/
	},

	
    /************************************************************************************************/
    _addTable: function(){
    /************************************************************************************************/
        $.ajax({
             url: "index.php/controller_core_application/addTableView/"+this.parentId,
             type: 'POST',
             data: $( '#dialog_form' ).serialize(),
             success: $.proxy(function( response ) {
                if(this.parentId=="0"){
                   coreTrigger(COMMAND_NAVIGATION_LOAD);
                }
                else{
                   coreTrigger(COMMAND_NAVIGATION_NAVIGATE,[".columnnav_listentry[data-id="+this.parentId+"]"]);
                }
            },this) //end success
        }); //end ajax()
    },
    
    /************************************************************************************************/
    _loadFieldListbox: function(/*:String*/ tableName){
    /************************************************************************************************/
		var modelName = "unused";
		CoreBackend.Model.getTableFields(tableName, modelName, $.proxy(function( data ) {
			   var items = [];
			   $.each(data.fields, function(key, val) {
				 if(key==0)
				   items.push('<option selected="selected" value="' + val.name + '">' + val.name + '</option>');
				 else
				   items.push('<option value="' + val.name + '">' + val.name + '</option>');
			   });
			   $("#addTable_representative_field" ).html(items.join(''));
			},this) //end callback
			
		); //end getTableFields()
    }
});
