
var CoreToolbar = Class.extend({

  /************************************************************************************************/
  init: function(containerId){
  /************************************************************************************************/
	this.currentModelName = null;
	this.currentTableName = null;
	this.currentControllerName=null;
	this.currentRecordId = null;

	$( "#button_save_record" ).button({
      icons: {
         primary: "ui-icon-circle-check"
      }
    }).click(function(){
       coreTrigger(COMMAND_DETAIL_RECORD_SAVE);
    });

	$( "#button_new_record" ).button({
      icons: {
         primary: "ui-icon-circle-plus"
      }
    }).click($.proxy(function(){
       coreTrigger(COMMAND_DETAIL_RECORD_CREATE,[this.currentModelName,this.currentTableName,this.currentControllerName]);
    },this));
        
	$( "#button_delete_record" ).button({
      icons: {
         primary: "ui-icon-circle-minus"
      }
    }).click(function(){
       coreTrigger(COMMAND_DETAIL_RECORD_DELETE);
    });

	$(document).bind(EVENT_DETAIL_MODEL_LOADED, $.proxy(function(event, modelName, tableName, controllerName){
	  $("#container_detail_toolbar button").show();
	},this));
	  
	$(document).bind(EVENT_DETAIL_MODEL_CLEARED, $.proxy(function(){
 	  $("#container_detail_toolbar button").hide();
	},this));

	$(document).bind(EVENT_DETAIL_RECORD_LOADED, $.proxy(function(event,recordId, modelName, tableName, controllerName){
	  this._recordLoaded(recordId, modelName, tableName, controllerName);
	},this));
	  
	$(document).bind(EVENT_DETAIL_RECORD_CLEARED, $.proxy(function(){
	  this._recordUnloaded();
	},this));

	$(document).bind(EVENT_DETAIL_RECORD_SAVED, $.proxy(function(event,recordId, modelName, tableName, controllerName){
	  this._recordSaved(recordId, modelName, tableName, controllerName);
	},this));
  },


  /************************************************************************************************/
  _recordSaved: function(recordId, modelName, tableName, controllerName){
  /************************************************************************************************/
 	$( "#button_save_record .ui-button-text" ).removeClass("button_glow");
  },
  
  /************************************************************************************************/
  _recordLoaded: function(recordId, modelName, tableName, controllerName){
  /************************************************************************************************/
      this.currentRecordId = recordId;
	  this.currentModelName = modelName;
	  this.currentTableName = tableName;
	  this.currentControllerName = controllerName;
  },
  
  /************************************************************************************************/
  _recordUnloaded: function(){
  /************************************************************************************************/
	  this.currentModelName = null;
	  this.currentTableName = null;
	  this.currentControllerName=null;
	  this.currentRecordId = null;
  }
});
