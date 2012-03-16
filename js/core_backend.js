var CoreBackend = new Object();

/************************************************************************************************/
/************************************************************************************************/
CoreBackend.Navigation = new Object();
/************************************************************************************************/
/************************************************************************************************/

/************************************************************************************************/
CoreBackend.Navigation.load = function(/*:String*/ controller,/*:String*/ id, /*:function*/ onDoneCallback){
/************************************************************************************************/
    $.getJSON("index.php/"+controller+"/navigate/"+id,onDoneCallback);
};

/************************************************************************************************/
CoreBackend.Navigation.create = function(/*:String*/ parentNavigationId,/*:String*/ name, /*:function*/ onDoneCallback){
/************************************************************************************************/

    $.ajax({
	  url: "index.php/controller_core_navigation/create",
	  type: 'POST',
	  data:{
               "model": "Model_core_navigation",
               "order": 0,
               "parent_id": parentNavigationId,
               "name": name,
               "type": "folder",
               "controller":"controller_core_navigation"
              },
	  success: onDoneCallback
    });
};


/************************************************************************************************/
/************************************************************************************************/
CoreBackend.Workflow = new Object();
/************************************************************************************************/
/************************************************************************************************/

/************************************************************************************************/
CoreBackend.Workflow.execute = function(/*:String*/ actionEmitterId, /*:String*/ event, /*:function*/ onDoneCallback){
/************************************************************************************************/
    $.getJSON("index.php/controller_core_workflow/execute/"+actionEmitterId+"/"+event,onDoneCallback);
};



/************************************************************************************************/
/************************************************************************************************/
CoreBackend.Model = new Object();
/************************************************************************************************/
/************************************************************************************************/

CoreBackend.Model._fieldCacheKey = null;
CoreBackend.Model._fieldCacheData = null;
CoreBackend.Model._tableCacheData = null;

/************************************************************************************************/
CoreBackend.Model.getTables = function( /*:function*/ onDoneCallback){
/************************************************************************************************/
   if(null !== CoreBackend.Model._tableCacheData){
      onDoneCallback(CoreBackend.Model._tableCacheData);
	  return;
   }
   
   $.getJSON("index.php/controller_core_model/getTables/",function(response){
	 CoreBackend.Model._tableCacheData = response;
     onDoneCallback(response);
   });
};

/************************************************************************************************/
CoreBackend.Model.getTableFields = function(/*:String*/ tableName,/*:String*/ modelName, /*:function*/ onDoneCallback){
/************************************************************************************************/

   // simple Cache for the table fields. 
   // Reason: we have a lot of listener for the TableColumns if we switch to the "page edit mode".
   //
   var cacheKey = tableName+"__:__"+modelName;
   if(cacheKey === CoreBackend.Model._fieldCacheKey){
      onDoneCallback(CoreBackend.Model._fieldCacheData);
	  return;
   }
   
   $.getJSON("index.php/controller_core_model/getTableColumns/"+tableName+"/"+modelName,function(response){
     CoreBackend.Model._fieldCacheKey  = cacheKey;
	 CoreBackend.Model._fieldCacheData = response;
     onDoneCallback(response);
   });
};

/************************************************************************************************/
CoreBackend.Model.removeFilter = function(/*:String*/ constraintId, /*:function*/ onDoneCallback){
/************************************************************************************************/
     $.ajax({
		  url: "index.php/controller_core_filterentry/delete/"+constraintId,
		  success: onDoneCallback
     });
};

/************************************************************************************************/
CoreBackend.Model.saveFilter = function(/*String*/ id, /*:String*/ column, /*:String*/ operation , /*:String*/ constraint, /*function*/ onDoneCallback){
/************************************************************************************************/
    $.ajax({
	  url: "index.php/controller_core_filterentry/update/"+id,
	  type: 'POST',
	  data:{
             column: column,
             operation: operation,
             constraint: constraint
           },
	  success: onDoneCallback
    });
};

/************************************************************************************************/
CoreBackend.Model.createFilter = function(/*String*/ modelClass, /*:String*/ column, /*:String*/ operation, /*function*/ onDoneCallback){
/************************************************************************************************/
    $.ajax({
	  url: "index.php/controller_core_filterentry/create/",
	  type: 'POST',
	  data:{model_class: modelClass,
	        column: column,
			operation: operation
	       },
	  success: onDoneCallback
    });
};

/************************************************************************************************/
CoreBackend.Model.getFilters = function(/*String*/ modelClass, /*function*/ onDoneCallback){
/************************************************************************************************/
   $.getJSON("index.php/controller_core_filterentry/get/"+modelClass,onDoneCallback);
};


/************************************************************************************************/
/************************************************************************************************/
CoreBackend.UI = new Object();
/************************************************************************************************/
/************************************************************************************************/

/************************************************************************************************/
CoreBackend.UI.setLabel = function(/*String*/ id,/*String*/ label){
/************************************************************************************************/
     $.ajax({
		  url: "index.php/controller_core_formelement/update/"+id,
		  type: 'POST',
		  data:{innerHTML: label}
     });
};


/************************************************************************************************/
/************************************************************************************************/
CoreBackend.UI.getElementData = function(/*:String*/ model,
                                         /*:String*/ table, 
                                         /*:String*/ controller, 
                                         /*:String*/ uiElementId,
                                         /*:String*/ recordId, 
                                         onDoneCallback){
/************************************************************************************************/
    $.ajax({
        url: "index.php/"+controller+"/getElementData/"+uiElementId+"/"+recordId,
        success: onDoneCallback
    });
};

/************************************************************************************************/
/************************************************************************************************/
CoreBackend.UI.getFormData = function(/*:String*/ model,
                                      /*:String*/ table, 
                                      /*:String*/ controller, 
                                      /*:String*/ recordId, 
                                      onDoneCallback){
/************************************************************************************************/
    $.ajax({
        url: "index.php/"+controller+"/getFormData/"+recordId,
        dataType: "json",
        success: onDoneCallback
    });
};


/************************************************************************************************/
/************************************************************************************************/
CoreBackend.UI.createGeneric= function(/*:String*/ model,
                                       /*:String*/ table, 
                                       /*:String*/ controller, 
                                       /*:String*/ column, 
                                       /*:String*/ readonly, 
                                       /*:int*/    left, 
                                       /*:int*/    top,
                                       /*:String*/ type,
                                       /*:String*/ innerHTML,
                                       /*:String*/ recordId, 
                                       onDoneCallback){
/************************************************************************************************/

    type = type.toLowerCase().firstUpperCase();
    $.ajax({
       url: "index.php/controller_core_formelement/create"+type+"/",
       type: 'POST',
       dataType: "json",
       data: {left:left,
	          top:top,
			  readonly:readonly,
			  recordId:recordId,
			  column:column,
			  model:model,
			  table:table,
			  controller:controller,
			  innerHTML:innerHTML
			 },
       success: onDoneCallback
     });
};


/************************************************************************************************/
/************************************************************************************************/
CoreBackend.Persistence = new Object();
/************************************************************************************************/
/************************************************************************************************/

/************************************************************************************************/
CoreBackend.Persistence.createRecord = function(/*String*/ model,/*String*/ table, /*String*/ controller, onDoneCallback){
/************************************************************************************************/
    $.ajax({
        url: "index.php/"+controller+"/create/",
        success: onDoneCallback
    });
};

/************************************************************************************************/
CoreBackend.Persistence.saveRecord = function(/*String*/ model,/*String*/ table, /*String*/ controller,id, json, onDoneCallback){
/************************************************************************************************/
  $.ajax({
       url: "index.php/"+controller+"/update/"+id,
       type: 'POST',
       dataType: "json",
       data: json,
       success:onDoneCallback
    });
};

/************************************************************************************************/
CoreBackend.Persistence.deleteRecord = function(/*String*/ model,/*String*/ table, /*String*/ controller,id, onDoneCallback){
/************************************************************************************************/
  $.ajax({
       url: "index.php/"+controller+"/delete/"+id,
       success:onDoneCallback
    });
};
