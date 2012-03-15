
var CoreContentpane = Class.extend({

  /************************************************************************************************/
  init: function(){
  /************************************************************************************************/
    this._container_detail = $("#container_detail");
	this.uiRenderer = new CoreRenderer();
	
	$(document).bind(COMMAND_DETAIL_MODEL_LOAD, $.proxy(function(event,controller){
	   this._loadEmptyModel(controller);
	},this));

	$(document).bind(COMMAND_DETAIL_RECORD_LOAD, $.proxy(function(event, id, model, table, controller, animation){
	   this._loadRecord(id, model, table, controller, animation);
	},this));
	
	$(document).bind(COMMAND_DETAIL_RECORD_REFRESH, $.proxy(function(event){
	   this._refreshRecord();
	},this));

	$(document).bind(EVENT_DETAIL_RECORD_LOADED, $.proxy(function(event, id, model, table, controller){
	   this._recordLoaded(id, model, table, controller);
	},this));

	$(document).bind(COMMAND_DETAIL_RECORD_CREATE, $.proxy(function(event){
	   this._createRecord();
	},this));

	$(document).bind(COMMAND_DETAIL_RECORD_DELETE, $.proxy(function(event){
	   this._deleteRecord();
	},this));
	
	$(document).bind(COMMAND_DETAIL_RECORD_SAVE, $.proxy(function(event){
	   this._saveRecord();
	},this));

	$(document).bind(COMMAND_DETAIL_RECORD_CLEAR, $.proxy(function(event){
	   this._clearPane();
	},this));

    $("#content_formular input, textarea").live("change keyup",$.proxy(function(event) {

        var $target = $(event.target);
        if(event.keyCode == 13 && !$target.is("textarea")) {
           this._saveRecord();
           return;
        }
        
  		var parent = $target.parent(".[data-recordcontainer=true]");
  		var $inputs = parent.children(".[data-recordcontainer=true] > input[name="+$target.attr("name")+"]");//.not(event.target);
  		$inputs.val($target.val());

	    if($inputs.data("value")!=$inputs.val())
	  	  $inputs.addClass("input_dirty");
	    else
     	  $inputs.removeClass("input_dirty");
     	  
    },this));
  },
  
  /************************************************************************************************/
  _clearPane: function(recordUrl){
  /************************************************************************************************/
      
	  // nothing todo. don't fire any expensive events to the application
	  //
     if(this._container_detail.html()==="")
	   return;
	   
     this._container_detail.html("");
     coreTrigger(EVENT_DETAIL_RECORD_CLEARED);
     coreTrigger(EVENT_DETAIL_MODEL_CLEARED);
  },

  /************************************************************************************************/
  _createRecord: function( ){
  /************************************************************************************************/
    var form = $("#content_formular");
    var model = form.data("model");
    var table = form.data("table");
    var controller = form.data("controller");
    CoreBackend.Persistence.createRecord(model, table, controller, $.proxy(function( response ) {
           $("#container_detail").html($(response));
           $("#content_formular input:first").focus();
           
           // send a global event that a record has been loaded
           //
           coreTrigger(EVENT_DETAIL_MODEL_LOADED,[model, table, controller]);
        },this)  // end success
    ); // end ajax
  },
  
  /************************************************************************************************/
  _loadEmptyModel: function( controller){
  /************************************************************************************************/
    var form  = $( '#content_formular' );
    var model = form.data("model");
    var table = form.data("table");
    CoreBackend.UI.getFormData(model, table, controller,"", $.proxy(function( json ) {
           var newContent = this.uiRenderer.renderForm(json);
           $("#container_detail").html(newContent);
		   var form = $("#content_formular");
		   var model = form.data("model");
		   var table = form.data("table");
           $("#content_formular button").button().click(function(){
             $this = $(this);
             // HACK: check the manuel disable state from the edit mode
             //
             if(!$this.data("disabled")){
				 CoreBackend.Workflow.execute("12","onClick",function(data){
					console.log(data);
				 });
             }
             return false;
           });
           // send a global event that a record has been loaded
           //
           coreTrigger(EVENT_DETAIL_MODEL_LOADED,[model, table, controller]);
        },this)  // end success
    ); // end ajax
  },
  
  
  /************************************************************************************************/
  _recordLoaded: function(id, model, table, controller){
  /************************************************************************************************/
    $("#content_formular button").button().click(function(){
        $this = $(this);
        // HACK: check the manuel disable state from the edit mode
        //
        if(!$this.data("disabled")){
           CoreBackend.Workflow.execute("12","onClick",function(data){
              console.log(data);
           });
        }
        return false;
    });
    /*
    var form =$("#content_formular");
	form.swipe({
      swipeLeft: function() {
          // next Record
          var controller = form.data("controller");
          var recordId = form.data("recordpkey");
 	      // determine the next to selected entry in the menu
		  //
          var items = $(".[data-controller=\""+controller+"\"][data-id=\""+recordId+"\"]");
          var next = items.next("li");
          if(next.length!==0)
            coreTrigger(COMMAND_NAVIGATION_NAVIGATE,[next, "slideLeft"]);
       },
       swipeRight: function() {
          // next Record
          var controller = form.data("controller");
          var recordId = form.data("recordpkey");
 	      // determine the next to selected entry in the menu
		  //
          var items = $(".[data-controller=\""+controller+"\"][data-id=\""+recordId+"\"]");
          var prev = items.prev("li");
          if(prev.length!==0)
            coreTrigger(COMMAND_NAVIGATION_NAVIGATE,[prev, "slideRight"]);
     },
    });
    */
  },
  
  /************************************************************************************************/
  _loadRecord: function(id, model, table, controller, animation){
  /************************************************************************************************/

    CoreBackend.UI.getFormData(model, table, controller,id, $.proxy(function( json ) {
           var oldContent = $("#content_formular");
           oldContent.attr("id","6789");
           var newContent = this.uiRenderer.renderForm(json);
           switch(animation){
             case "slideLeft":
                 $("#container_detail").css("overflow","hidden");
                 var pos = this._container_detail.width();
                 newContent.css({left:pos+"px"});
                 this._container_detail.append(newContent);
                 newContent.animate({left:'-='+pos});
                 oldContent.animate({left:'-='+pos}, function(){
                    oldContent.remove();
                    $("#container_detail").css("overflow","scroll");
                    var firstInput =  $("#content_formular input:first");
                    firstInput.caret(0,0); // required for Chrome. Remove text selection after focus
                    firstInput.focus();
                 });
                 break;
             case "slideRight":
                 this._container_detail.css("overflow","hidden");
                 var pos = this._container_detail.width();
                 newContent.css({left:"-"+pos+"px"});
                 this._container_detail.append(newContent);
                 newContent.animate({left:'+='+pos},"slow");
                 oldContent.animate({left:'+='+pos},"slow", function(){
                    oldContent.remove();
                    this._container_detail.css("overflow","scroll");
                    var firstInput =  $("#content_formular input:first");
                    firstInput.caret(0,0); // required for Chrome. Remove text selection after focus
                    firstInput.focus();
                 });
                 break;
             default:
                 newContent.hide();
                 this._container_detail.append(newContent);
                 newContent.fadeIn(300, function(){oldContent.remove();});
                 var firstInput =  $("#content_formular input:first");
                 firstInput.caret(0,0); // required for Chrome. Remove text selection after focus
                 firstInput.focus();
           }
           // send a global event that a record has been loaded
           //
           coreTrigger(EVENT_DETAIL_RECORD_LOADED,[id, model, table, controller]);
        },this)  // end success
    ); // end ajax
  },
  
  /************************************************************************************************/
  _refreshRecord: function(){
  /************************************************************************************************/
    var form  = $( '#content_formular' );
    var model = form.data("model");
    var table = form.data("table");
    var controller = form.data("controller");
    var recordId = form.data("recordpkey");
	
    this._loadRecord(recordId, model, table, controller);
  },
  
  /************************************************************************************************/
  _saveRecord: function(){
  /************************************************************************************************/

    var form  = $( '#content_formular' );
    var model = form.data("model");
    var table = form.data("table");
    var controller = form.data("controller");
    var recordId = form.data("recordpkey");
    var json = $("#content_formular :input").not("#content_formular :input[readonly=readonly]").serialize();
    CoreBackend.Persistence.saveRecord(model, table, controller, recordId, json, $.proxy(function( response ) {
           // hide the keyboard if we are on a iPad like device.
           if(isWebPad()){
           	$( "#button_save_record" ).focus();
           }

           coreTrigger(EVENT_DETAIL_RECORD_SAVED,[recordId, model,table,controller]);
     	   $("#content_formular :input").removeClass("input_dirty");
     	   
           growl("The Record has been saved.","Record Save");
		   
		   // Falls es ein "NEW" war, dann sollte der pkey in die Form eingetragen werden
		   // und die Navigation aktualisiert werden
		   //
		   if(response.crud ==="create"){
		      form.data("recordpkey", response.pkey);
		      console.log(response.pkey);
              coreTrigger(COMMAND_NAVIGATION_REFRESH,["#"+response.pkey]);
		   }
		   
		   var record = response.record;
		   
           // Jedes Feld des geänderten Objectes in der Seite suchen und aktualisieren
           // z.b. in der navigation oder in irgendeinem text auf der Seite....kann überall sein
           for(var key in record){
               var value = record[key];
               var displayFields = $('[data-display_field="'+table+'_'+key+'_'+recordId+'"]');
               displayFields.text(value);
               displayFields = $('[data-input_field="'+table+'_'+key+'_'+recordId+'"]');
               displayFields.val(value);
           }
                
           // alle formvariablen mit den aktuellen werten anpassen....
           // TODO: Könnte man auch mit der obigen MEthode machen.....
           for(var key in record){
              var value = record[key];
               var displayFields = $('#content_formular input[name='+key+']');
               displayFields.text(value);
               displayFields.val(value);
               displayFields.data("value",value);
           }
       },this) //end success
    ); //end ajax()
  },
  
  /************************************************************************************************/
  _deleteRecord: function(){
  /************************************************************************************************/
    var form  = $( '#content_formular' );
    var table =form.data("table");
    var model = form.data("model");
    var controller = form.data("controller");
    var recordId = form.data("recordpkey");
    CoreBackend.Persistence.deleteRecord(model, table, controller, recordId, $.proxy(function( response ) {

           // TODO: hat hier eigentlich nichts verloren. gehört in die navigation selber rein
           // !!!!!!!!!!!
           
		   // determine the next to selected entry in the menu
		   //
           var items = $(".[data-controller=\""+controller+"\"][data-id=\""+recordId+"\"]");
           var next = items.next("li");
           if(next.length===0)
               next =items.prev("li");
           
           coreTrigger(COMMAND_NAVIGATION_NAVIGATE,[next]);
           items.animate({'color':'#fb6c6c'},100)
               .hide(700,items.remove);
        },this)  // end success
    ); // end ajax
  }
  
});
