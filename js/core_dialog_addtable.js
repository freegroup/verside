var CoreDialogAddTable = Class.extend({

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
        $("#dialogs").load(this.BASE_URL+"controller_core_dialog/addTable", $.proxy(function(){
            $.blockUI({ 
			   message: $('#dialogs'), 
			   css: { border: "1px solid black", 
			          textAlign:"", 
			          top:"15%",
			          height: "270px", 
			          width: '575px' } 
			
			});
            this.stepDialog = $("#dialog_form" ).stepy({
			     legend: false,
			     validate:true,
			     block: true,
			     next: $.proxy(this._onNext,this),
			     submit: $.proxy(this._onSubmit,this),
			     cancel: $.proxy(this._onCancel,this)
			});
			
			var tableSelectionCallback = $.proxy(function(){
  	           var tableName = $('#dialog_form .[name="tablename"]').val();
	           this._loadFieldListbox(tableName);
			},this);
			tableSelectionCallback();
			$("#addTable_tablename").change(tableSelectionCallback);
			
            // <!-- Optionaly -->
            $('#dialog_form').validate({
                errorClass: "error",
                errorPlacement: function(error, element) {
                   $('#'+element.attr("id")+"_error").html(error);
                },
                rules: {
                   'alias': 'required',
                   'tablename': 'required',
                   'representative_field': 'required'
            	},
                messages: {
                   'alias': {required: 'The name of the form is required.'},
                   'tablename': {required: 'Select the table to display.'},
                   'representative_field': {required: 'Select the main representative field to show.'}
                }
            }); 
        },this)); // end load
    },
	
    /************************************************************************************************/
	_onCancel: function(index){
    /************************************************************************************************/
	   $("#dialogs").html("");
       $.unblockUI();
	},

    /************************************************************************************************/
	_onSubmit: function(index){
    /************************************************************************************************/
       $.unblockUI();
       $("#parentId").val(this.parentId);
       this._addTable();
	   $("#dialogs").html("");
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
