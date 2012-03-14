
var CoreNavigationFilterPanel = Class.extend({

  /************************************************************************************************/
  init: function(/*String*/ tableName,/*String*/ modelName){
  /************************************************************************************************/
    this.container = null;
    this.tableName = tableName;
    this.modelName = modelName;
    this.fields = null;
    
    this.filterContainerTemplate=
                "<div id='navigation_filter' class='ui-widget-content search_panel'>"+
                "<div id='navigation_filter_entries' class='ui-layout-center'>"+
                "   <div class='dialog_header'>Filter Criteria</div>"+
                "</div>"+
                "<div class='ui-layout-south toolbar'>"+
                "<button class='button_add toolbar_button' id='button_design_navigation_add'>Add Criteria</button>"+
                "<button class='button_ok toolbar_button button_right_align' id='button_design_navigation_done'>Done</button>"+
                "</div>"+
                "</div>";
			
     this.filterEntryTemplate=
                '<div id="filterentry_${id}" data-id="${id}" class="navigation_filter_constraint_group">'+
                '   <div class="">'+
                '      <div class="navigation_filter_constraint_pane">'+
                '         <select class="filterentry_column" style="margin:0.2em">'+
                '{{each fields}}'+
                '            <option value="${name}">${name}</option>'+
                '{{/each}}'+
                '         </select>'+
                '        <select class="filterentry_operation" style="margin:0.2em">'+
                '            <option value="equals" >equals</option>'+
                '            <option value="notEquals" >notEquals</option>'+
                '            <option value="contains" >contains</option>'+
                '            <option value="startsWith" >startsWith</option>'+
                '            <option value="endsWith" >endsWith</option>'+
                '            <option value="greater" >greater</option>'+
                '            <option value="less" >less</option>'+
                '         </select>'+
                '         <input class="filterentry_constraint dialog_input" type="${type}" style="height:25px; margin:2px;" value="${constraint}">'+
                '      </div>'+
                '      <div class="navigation_filter_action_pane">'+
                '        <button class="button_delete_contraint filterentry_remove">X</button>'+
                '      </div>'+
                '    </div>'+
                '</div>';
				
    this.filterInputTemplate = 
	            '<input class="filterentry_constraint" type="${type}" style="height:25px; margin:2px;width:290px" value="${constraint}" required>';
				
   CoreBackend.Model.getTableFields(this.tableName, this.modelName, $.proxy(this._onLoadedCallback,this));
  },

  /************************************************************************************************/
  _onLoadedCallback: function( /*:JSON*/ modelData){
  /************************************************************************************************/
     this.fields = modelData.fields;
     CoreBackend.Model.getFilters(this.modelName, $.proxy(function( constraints){
        this.show();
        $.each(constraints, $.proxy(function(i,item){
             this._addFilterEntry(item.id,item.column,item.operation,item.constraint);
        },this));
     },this));
 },
  
  /************************************************************************************************/
  show: function(){
  /************************************************************************************************/

     coreTrigger(COMMAND_NAVIGATION_LOCK, [true]);

     // Attach to the last navigation entry a "Filter" pane.
     // The user can reduce the returned content with this static content filter.
     //
     this.container = $.tmpl(this.filterContainerTemplate,{}); 
     this.container.appendTo($("#container_detail"));
     this.container.animate({"left":0},"normal");
    
	 // layout the pane
	 //
    this.toolbarHeight=$("#container_detail_toolbar").outerHeight();
 	this.layoutObj2 = $('#navigation_filter').layout({
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
         this._saveFilterEntries();
	     coreTrigger(COMMAND_DESIGNMODE_NAVIGATION, [false]);
	},this));


	$("#button_design_navigation_add").button()
	   .click($.proxy(function(){
			this._createFilterEntry(this.modelName);
	   },this));
	   
	$("#navigation_filter_entries").niceScroll();

  },
  
  
  /************************************************************************************************/
  update: function(navEntryToShow){
  /************************************************************************************************/
  },
  
  /************************************************************************************************/
  remove: function(){
  /************************************************************************************************/
     this.container.animate({"left":-460},"normal", $.proxy(function(){
     	this.container.remove();
     	this.container = null;
        coreTrigger(COMMAND_NAVIGATION_LOCK, [false]);
     },this));
  },
  
  
  /************************************************************************************************/
  _saveFilterEntries: function(){
  /************************************************************************************************/
    var entries = $(".navigation_filter_constraint_group");
    var counter = entries.length;
    $.each(entries, function(i,item){
        var $item = $(item);
        var id         = $item.data("id");
        var column     = $item.find(".filterentry_column").val();
        var operation  = $item.find(".filterentry_operation").val();
        var constraint = $item.find(".filterentry_constraint").val();
       
        CoreBackend.Model.saveFilter(id, column, operation, constraint, function(){
           counter--;
           if(counter<=0)
	          coreTrigger( COMMAND_NAVIGATION_REFRESH);
        });
    });
  },

  /************************************************************************************************/
  _addFilterEntry: function(/*:String*/ id, /*:String*/ column, /*:String*/ operation, /*:String*/ constraint){
  /************************************************************************************************/
   var entry = $.tmpl(this.filterEntryTemplate,{fields:this.fields, 
                                                id: id, 
                                                type: this._getColumnType(column), 
                                                constraint:constraint
                                                }); 
   entry
    .css('opacity',0)
    .appendTo('#navigation_filter_entries')
    .animate({'opacity': 1}, 500);

   entry.scrollintoview({containerSelector:"#navigation_filter_entries"});

   entry.find(".filterentry_column option[value='"+column+"']").attr('selected',true);
   entry.find(".filterentry_operation option[value='"+operation+"']").attr('selected',true);

   entry.find(".button_delete_contraint")
       .button()
       .click($.proxy(function(){
          CoreBackend.Model.removeFilter(id, $.proxy(function(){
              var item = $("#filterentry_"+id);
              item.hide(700, item.remove);
          },this));
       },this));

	var input = entry.find(".filterentry_constraint");
    input.bind("keyup",$.proxy(function(e){
       if (e.which == 13)
    	  input.blur();
    },this));

	// Change the input type of the field if the user change the db-column.
	// Reason: we want HTML5 input types which are related to the column-type. This is
	//         very usefull on iPad which shows a input-type sensitve keyboard.
    var columnCombo = entry.find(".filterentry_column");
    columnCombo.change($.proxy(function(){
	        var type = this._getColumnType(columnCombo.val()) ;
	        var newInputField = $.tmpl(this.filterInputTemplate,{type:type , constraint: input.val()});
	        input.replaceWith(newInputField);
			input = newInputField;
			input.bind("keyup",$.proxy(function(e){
                if (e.which == 13)
    	       input.blur();
            },this));
         },this));
   },
  
  /************************************************************************************************/
  _createFilterEntry: function(/*:String*/ modelName){
  /************************************************************************************************/
    CoreBackend.Model.createFilter(modelName, this.fields[0].name,"equals", $.proxy(function(entry){
       this._addFilterEntry(entry.id,entry.column,entry.operation,entry.constraint);
    },this));
  },

  
  /************************************************************************************************/
  _getColumnType: function(/*:String*/ columnName){
  /************************************************************************************************/
   	var column = $.grep(this.fields,function(element, index){
   		return element.name === columnName;
   	});
	
   	if(column.length>0)
		return column[0].type;
	return "text";
  }
  
});
