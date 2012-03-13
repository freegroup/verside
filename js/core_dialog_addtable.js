var CoreDialogAddTable = Class.extend({

     /************************************************************************************************/
     init: function( parentId ){
     /************************************************************************************************/
        this.parentId = parentId;
         
         this.template = '<form id="dialog_form" target="#" onsubmit="return false;">'+
         
                         '   <fieldset title="1. Screen Name">'+
                         '      <legend>Provide Screen information</legend> '+           
                         '      <div class="wizard_content">'+
                         '         <label>Screen Name:</label>'+
                         '         <input type="text" id="addTable_alias" name="alias" value="">'+
                         '         <br>'+
				         '         <div id="addTable_alias_error" class="validateErrorContainer"></div>'+
			             '     </div>'+
                         '   </fieldset>'+
                         
                         '   <fieldset title="2. Screen Data">'+
                         '     <legend>Select the data to use</legend>   '+       
                         '     <div class="wizard_content">'+
                         '         <label>Screen Data</label>'+
                         '         <select size="7" name="tablename" id="addTable_tablename" >'+
  						 '            {{each tables}}                    '+
                         '            <option value="${name}">${name}</option>'+
  						 '            {{/each}}                                          '+
                         '         </select>'+
                         '         <div id="addTable_tablename_error" class="validateErrorContainer"></div>'+
                         '     </div>'+
                         '    </fieldset>'+
                         
                         '    <fieldset title="3. Display Column">'+
                         '       <legend>Select the major field to show</legend>      '+
                         '       <div class="wizard_content">'+
                         '           <label>Display Column</label>'+
                         '           <select size="7" name="representative_field" id="addTable_representative_field" style="width:100%">'+
                         '             <option selected="true" value="any">any</option>'+
                         '           </select>'+
                         '           <div id="addTable_representative_field_error" class="validateErrorContainer"></div>'+
		                 '      </div>'+
                         '    </fieldset>'+
                         
                         '   <input type="hidden" id="parentId" name="parent_id" />'+
                         '   <button id="dialog_finish" class="finish">Create</button>'+
                         '</form>';
    },

    /************************************************************************************************/
    show: function(){
    /************************************************************************************************/
        $("#dialogs" ).attr("style","");
        
        CoreBackend.Model.getTables($.proxy(function(json){
        	var $html= $.tmpl(this.template,{"tables":json});
        	$("#dialogs" ).html($html);
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
        },this)); // getTables
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
