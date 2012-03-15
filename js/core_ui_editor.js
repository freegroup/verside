var CoreUiEditor = Class.extend({

  /************************************************************************************************/
  init: function(){
  /************************************************************************************************/
    this.BASE_URL = "index.php/";

	this.uiRenderer = new CoreRenderer();
	
    this.designMode = false;
    this.editModeForm = false;
    this.editModeNavigation = false;
    this.lastClickElement = null;
    this.lastHoverElement = null;
    this.currentSelectedElement = null;
    this.resizeHandle = null;
    this.duringResize = false;
    this.duringDrag = false;
    this.filedropLeft=0;
    this.filedropTop =0;
    this.currentActiveFolderId=0;
    this.detailModelLoaded=false;
    this.editButton = null;
    this.palette=null;
    this.navProperties = null;
    this.currentSelectNavEntryForEdit=null;

    this.detailModelLoaded = false;
    this.currentModelName = null;
    this.currentTableName = null;
    this.currentControllerName = null;
	/*
	this.toggler = $('<div id="edittoggler_container" ><span id="edittoggler_label">Design Mode</span> <INPUT type="checkbox" id="edittoggler_toggler" /> </div>');
	$("#teaser").append(this.toggler);
    $('#edittoggler_toggler')
	  .iphoneStyle()
	  .bind("change", $.proxy(function(event) {	  
         this._setDesignMode($("#edittoggler_toggler").is(":checked"));	     
       },this));
	$('#edittoggler_label').bind("click",function(){
	    var toggler = $("#edittoggler_toggler");
		toggler.attr("checked",!toggler.is(":checked"));
		toggler.change();
	});
	*/
	
    $(document).bind(EVENT_DETAIL_RECORD_LOADED, $.proxy(function(event, recordId, modelName, tableName, controllerName){
      this._onDetailRecordLoaded(recordId,modelName, tableName, controllerName);
    },this));

    $(document).bind(EVENT_DETAIL_MODEL_LOADED, $.proxy(function(event,  modelName, tableName, controllerName){
      this._onDetailModelLoaded(modelName, tableName, controllerName);
    },this));

    $(document).bind(EVENT_DETAIL_MODEL_CLEARED, $.proxy(function(event){
      this._onDetailModelCleared();
    },this));

    $(document).bind(EVENT_DETAIL_RECORD_CLEARED, $.proxy(function(event){
      this._onDetailRecordCleared();
    },this));
    
    $(document).bind(EVENT_NAVIGATION_FOLDERS_LOADED,$.proxy(function(event, container, list){
      this._onFoldersLoaded(container, list);
    },this));

    $(document).bind(EVENT_NAVIGATION_FOLDER_ACTIVATED,$.proxy(function(event, folderId){
      this._onFolderActivated(folderId);
    },this));

    $(document).bind(COMMAND_DESIGNMODE_NAVIGATION, $.proxy(function(event, flag){
      this._setEditModeNavigation(flag);
    },this));
    
    $(document).bind(COMMAND_NAVIGATION_DELETE, $.proxy(function(event, entry){
        this._deleteNavigationEntry(entry); 
    },this));
 
    $(document).bind(COMMAND_DESIGNMODE_SELECTELEMENT, $.proxy(function(event, element){
        this._updateResizeHandle(element,true);
    },this));

    $("#container_detail").bind('click', $.proxy(function(event) { 
        var $target = $(event.target);
        if(!$target.is("form"))
           return;
        this._updateResizeHandle(null);
    } ,this)); 

    $("#container_detail").delegate('.[data-editable=true]','click', $.proxy(function(event) { 
        this.lastClickElement = event.currentTarget;
        this._updateResizeHandle($(this.lastClickElement),true);
    } ,this)); 
    

    // hier wird das "Click-Event" auf dem Element registriert und das DragDrop gehandelt.
    //
    $("#container_detail").delegate(".[data-draggable=true]","mousedown touchstart", $.proxy(function(event){
    
        if(this.editModeForm===false)
           return;

		// egentlich würde $(event.target) reichen, da dies das element ist auf dem das 
		// Event mittels delegate registriert wurde. Dummerweise stimmt dies nicht auf dem
		// iPad. Das touch-Event.target ist nicht das registrierte Element sondern das elemente 
		// welches das Event gefangen hat.
		//
        var element = $(event.target).closest(".[data-draggable=true]");

        this._updateResizeHandle(element,true);

        var width = element.outerWidth();
        var height = element.outerHeight();

        this.duringDrag = true;
        var oldLeft = event.clientX;
        var oldTop =  event.clientY;
      
       var callbackMouseMove= $.proxy(function(event) {
			event = this._getEvent(event);
            var moveOverRecycleBin = $("#recycle_bin").mouseIn(event);

            if(moveOverRecycleBin===true)
               $("#recycle_bin").addClass("hover");
            else
               $("#recycle_bin").removeClass("hover");
               
            var diffLeft = oldLeft-event.clientX;
            var diffTop = oldTop-event.clientY;
            oldLeft = event.clientX;
            oldTop =  event.clientY;

            var realTop  = element.data("top");
            var realLeft = element.data("left");
 
            var snappedTop  = oldSnappedTop  = parseInt(element.css("top"));
            var snappedLeft = oldSnappedLeft = parseInt(element.css("left"));
                
            if(realTop){
                // don't change to "if(!realTop)"
                // didn't work on iPad
            }
            else{
            	realTop  = snappedTop;
            	realLeft = snappedLeft;
            } 
            
            realLeft = realLeft-diffLeft;
            realTop = realTop-diffTop;
            
            element.data("top", realTop);
            element.data("left", realLeft);

            snappedLeft = parseInt((realLeft/10))*10;
            snappedTop = parseInt((realTop/10))*10;
            
            diffLeft = oldSnappedLeft-snappedLeft;
            diffTop  = oldSnappedTop-snappedTop;
            
            element.css({"left": snappedLeft, "top": snappedTop});

            this._updateResizeHandle(element,true);

            $.each($(".[data-relatedinput='"+element.data("pkey")+"']"), function(i,item){
                var $item = $(item);
                var top = parseInt($item.css("top"));
                var left = parseInt($item.css("left"));
                $item.css({"top":top-diffTop,"left":left-diffLeft});
            });
            
        },this);
        $("body").bind(isWebPad()?"touchmove":"mousemove",callbackMouseMove);
        
        var callbackMouseUp=$.proxy(function(e){
             $("body").unbind(isWebPad()?"touchmove":"mousemove", callbackMouseMove);
             element.unbind("mouseup touchend",callbackMouseUp);
             $('#container_detail').unbind("mouseup touchend",callbackMouseUp);
             var droppedOverRecycleBin = $("#recycle_bin").mouseIn(this._getEvent(e));

             this.duringDrag = false;
             if(droppedOverRecycleBin===true){
                this._deleteElement(element);
                $("#recycle_bin").removeClass("hover");
             }
             else{
                var pos = element.position();
                element.css(pos);
                element.updateOnServer();
                $(".[data-relatedinput='"+element.data("pkey")+"']").updateOnServer();
             }
             this._adjustFormHeight();
        },this);// end mouseup    
        element.bind("mouseup touchend",callbackMouseUp);
        $('#container_detail').bind("mouseup touchend",callbackMouseUp);
        return false;
    },this)); // end mousedown
    
    
   
    $('#container_detail').filedrop({
        url: 'index.php/controller_core_formelement/upload',              // upload handler, handles each file separately
        paramname: 'userfile',          // POST parameter name used on serverside to reference file
        data:{
           table : function(){return $('#content_formular').data("table")},
           model : function(){return $("#content_formular").data("model")},
           table : function(){return $("#content_formular").data("table")},
           controller : function(){return $("#content_formular").data("controller")},
           left:$.proxy(function(){return this.filedropLeft;},this),
           top:$.proxy(function(){return this.filedropTop;},this)
        },
        responseType:"text/plain",
        error: function(err, file) {
            switch(err) {
                case 'BrowserNotSupported':
                    alert('browser does not support html5 drag and drop')
                    break;
               case 'TooManyFiles':
                    // user uploaded more than 'maxfiles'
                    break;
                case 'FileTooLarge':
                    // program encountered a file whose size is greater than 'maxfilesize'
                    // FileTooLarge also has access to the file which was too large
                    // use file.name to reference the filename of the culprit file
                    break;
               default:
                    break;
            }
        },
        maxfiles: 1,
        maxfilesize: 2,    // max file size in MBs
        drop: $.proxy(function(event) {
           var eventPos =this._toContainerPaneCoordinate({"left":event.pageX, "top":event.pageY});
           this.filedropLeft=eventPos.left;
           this.filedropTop=eventPos.top;
           growl("Image Import","Start upload image to server...");
        },this),
        uploadFinished: function(index, file, response, timeDiff){
           growl("Image Import","Upload done successfully.");
           $('#content_formular').append($(response));
        }
    });
    
    this._setDesignMode(true);
  },

  /************************************************************************************************/
  _getEvent: function(event){
  /************************************************************************************************/
    if(event.originalEvent.touches && event.originalEvent.touches.length) {
         return event.originalEvent.touches[0];
    } else if(event.originalEvent.changedTouches && event.originalEvent.changedTouches.length) {
         return event.originalEvent.changedTouches[0];
    }
	return event;
  },

  /************************************************************************************************/
  _deleteNavigationEntry: function(item){
  /************************************************************************************************/
    item = $(item);
  
    var next = item.next("li");
    if(next.length===0)
        next =item.prev("li");
    $(".columnnav_listentry").ants("remove");
	
    $.ajax({
      url: this.BASE_URL+"/controller_core_navigation/delete/"+item.data("id"),
      type: 'POST',
      success: $.proxy(function( response ) {
        var parentContainer = item.parent().parent();
        var all= parentContainer.nextAll();
        var form =$("#content_formular");
        form.fadeOut(500,form.remove);
        all.fadeOut(500,all.remove);
        item.animate({'color':'#fb6c6c'},100)
            .hide(700,function(){
			    item.remove();
                next.click();
		});
      },this)
    });
  },

  /************************************************************************************************/
  _createFolder: function(){
  /************************************************************************************************/
    var dialog = new CoreDialogAddFolder(this.currentActiveFolderId);
    dialog.show();
  },

  /************************************************************************************************/
  _createForm: function(){
  /************************************************************************************************/
    var dialog = new CoreDialogAddTable(this.currentActiveFolderId);
    dialog.show();
  },

  /************************************************************************************************/
  _onFolderActivated: function(folderId){
  /************************************************************************************************/
    this.currentActiveFolderId = folderId;
  },

  /************************************************************************************************/
  _onFoldersLoaded: function(container, list){
  /************************************************************************************************/
	list.sortable({
		axis: 'y',
		update : $.proxy(function(event, ui) {
		  $(".columnnav_listentry").ants("update");
		  var serial=list.sortable("serialize");
	    
		  $.ajax({
			 type: "POST",
			 url: this.BASE_URL+"controller_core_navigation/sort/"+container.data("parent_id"),
			 data: serial
		  });    // end ajax
	   },this) // end update
	}); // end sortable
	 
	// NICHT mit data arbeiten. Man kann attribute welche man mit data gesetzt hat nicht mit einem
	// selector abfragen.....wird aber später benötigt
    list.attr("navigation_sortable","true");
    
    // sortierbarkeit ausschalten wenn das UI nicht im Designmodus ist
    //
    if(this.editModeNavigation!==true){
      list.sortable("disable");
    }
    else{
      list.find("li").addClass("core_navigation_designmode");
    }

	// an die neuen Menueinträge einen Listener hängen welcher eventuell verhindert, dass
	// man das Menu benutzen kann. Dies ist im EditNavigation-Mode wichtig
	//
	list.find('.columnnav_listentry').bind('click', $.proxy(function(event) { 
	   if(this.editModeNavigation===true){
          this._adjustNavigationPropertyPalette($(event.currentTarget));
          event.stopPropagation();
	   }
    } ,this)); 
    
  },

  /************************************************************************************************/
  _onDetailRecordLoaded: function(recordId, modelName, tableName, controllerName){
  /************************************************************************************************/
    $('.[data-recordcontainer=true]' ).droppable({
       accept: '.palette_element',
       drop:$.proxy(function(event, ui){
          if(ui.draggable.hasClass("palette_element_data"))
             this._paletteDataDropped(event,ui);
          else
             this._paletteWidgetDropped(event,ui);
       },this)
    });
/*
    $(".[data-draggable=true]").longclick( $.proxy(function(event){
        alert("ddd");
    },this));
*/
    this._adjustFormHeight();
  },

  /************************************************************************************************/
  _onDetailRecordCleared: function(){
  /************************************************************************************************/
  },

  /************************************************************************************************/
  _onDetailModelLoaded: function( modelName, tableName, controllerName){
  /************************************************************************************************/
    this.detailModelLoaded=true;
    this.currentModelName = modelName;
    this.currentTableName = tableName;
    this.currentControllerName = controllerName;

    this._adjustContentActionBar();
    this._adjustNavigationActionBar();
    this._adjustEditPalette(this.editModeForm);

    $('.[data-recordcontainer=true]' ).droppable({
       accept: '.palette_element',
       drop:$.proxy(function(event, ui){
          if(ui.draggable.hasClass("palette_element_data"))
             this._paletteDataDropped(event,ui);
          else
             this._paletteWidgetDropped(event,ui);
       },this)
    });

    this._adjustFormHeight();
  },

  /************************************************************************************************/
  _onDetailModelCleared: function(){
  /************************************************************************************************/
    this.detailModelLoaded = false;
    this.currentModelName = null;
    this.currentTableName = null;
    this.currentControllerName = null;

    this._adjustContentActionBar();
    this._adjustNavigationActionBar();
    this._adjustEditPalette(this.editModeForm);
  },

  /************************************************************************************************/
  _setDesignMode: function(/*boolean*/ designMode){
  /************************************************************************************************/
     this.designMode = designMode;
     
     if(this.designMode ===false){
       this._setEditModeNavigation(false);
       this._setEditModeForm(false);
     }
     this._adjustNavigationActionBar();
     this._adjustContentActionBar();
     
	 coreTrigger(COMMAND_DESIGNMODE_GLOBAL, [this.designMode]);
  },

  /************************************************************************************************/
  _setEditModeNavigation: function(/*boolean*/ editMode){
  /************************************************************************************************/
   this.editModeNavigation = editMode;
   $(".[navigation_sortable=true]").each($.proxy(function(i, e){
      $e = $(e);
      // sortierbarkeit ausschalten wenn das UI nicht im Designmodus ist
      //
      if(this.editModeNavigation===true){
         $e.sortable("enable");
         $e.find("li").addClass("core_navigation_designmode");
       }
      else{
         $e.sortable("disable");
         $e.find("li").removeClass("core_navigation_designmode");
      }
   },this));

   // Setup the property panel for the Navigation Entries
   //
   if(this.editModeNavigation===true){
        // prüfen ob die Navigation oder der Filter angezeigt werden soll
        //
        if(this.detailModelLoaded===false){
           this.navProperties = new CoreNavigationPropertiesPanel();
           // Select the current entry in the navigation panel as "pre selection" for edit
           //
           var lastPanel = $(".columnnav_panel").last();
           var entryToSelect = lastPanel.find(".columnnav_listentry").first();
           this._adjustNavigationPropertyPalette(entryToSelect);
	    }
	    else{
           this.navProperties = new CoreNavigationFilterPanel(this.currentTableName, this.currentModelName);
	    }

console.log("DISABLE BUTTONS....");
	    // disable the navigation buttons at the top 
	    $("#navigation_toolbar button").each(function(i,item){
	       $item = $(item);
	  	   var oldDisabled = $item.button( "option", "disabled");
		   $item.button( "option", "disabled", true );
		   $item.attr("oldDisabled",oldDisabled);
	   });
   }
   else{
       if(this.navProperties!==null){
          this.navProperties.remove();
   	      this.navProperties = null;
   	   }
	   
console.log("DISABLE BUTTONS2....");
	   $("#navigation_toolbar button").each(function(i,item){
	     $item = $(item);
		                     
		 var oldDisabled = $item.attr( "oldDisabled")=="true";// make a cast from string to boolean
		 $item.button( "option", "disabled", oldDisabled );
		 $item.removeAttr("disabled");
		 $item.removeAttr("oldDisabled");
	   });
	   
       this._adjustNavigationPropertyPalette(null);
   }
   this._adjustNavigationActionBar();
  },

  /************************************************************************************************/
  _setEditModeForm: function(/*boolean*/ editMode){
  /************************************************************************************************/
   this.editModeForm = editMode;
   this._updateResizeHandle(null, false);
   this._adjustEditPalette(this.editModeForm);

   // disable the default click-event during the edit mode.
   //
   $("#content_formular button").data("disabled",editMode);

   // toggle all input elements to "readonly" if we use a iPad,Android,...to prevent the
   // keyboard popup if an element retrieves the focus
   //
   if(/*isWebPad()===*/true){
      if(this.editModeForm===true){
      

        $("#container_detail .[data-draggable=true]").each(function(i, item){
           $(item).addClass("core_formelement_designmode");
        });
        
        $("#container_detail .[data-draggable=true]:not([readonly='readonly'])").each(function(i, item){
           item = $(item);
           item.attr("readonly","readonly");
           // hier mit "attr" arbeiten, da sonst der selector für das entfernen des READOLY-attr nicht
           // funktioniert.
           item.attr("data-manual_readonly","true");
        });
        $("#container_detail_toolbar .toolbar_button").not("#button_design_formular").button("disable");
        
        // Mülleimer einrichten
        //
        var recycleBin =  $('<div id="recycle_bin"></div>');
        recycleBin.prependTo("#container_detail");
        var recycleBinTop = parseInt($("#recycle_bin").css("top"))-3-100;
        $("#container_detail").scroll(function(e){
            var $this = $(this);
            if($this.scrollTop()>recycleBinTop){
              recycleBin.addClass("fixed");
            }
            else{
              recycleBin.removeClass("fixed");
            }
        });
        // end RecycleBin Stuff
        
      }
      else{
        $("#container_detail .[data-manual_readonly=true]").each(function(i, item){
           item = $(item);
           item.removeAttr("readonly");
           item.removeAttr("data-manual_readonly");
        });
        $("#container_detail .[data-draggable=true]").each(function(i, item){
           $(item).removeClass("core_formelement_designmode");
        });
        $("#container_detail_toolbar .toolbar_button").not("#button_design_formular").button("enable");
        $("#recycle_bin").remove();
      }
   }
   
   coreTrigger(COMMAND_LAYOUT_EXPANDED, [ this.editModeForm]);
  },

  /************************************************************************************************/
  _adjustNavigationPropertyPalette: function( navEntryToSelect){
  /************************************************************************************************/
      $(".columnnav_listentry").ants("remove");
      
      // Update the ANT's status of the selected element
      //
      this.currentSelectNavEntryForEdit=navEntryToSelect;
      if(this.currentSelectNavEntryForEdit!==null){
      	this.currentSelectNavEntryForEdit.ants();
      }

      // update the property view of the NavEntries
      //
      if(this.navProperties!==null){
         this.navProperties.update(this.currentSelectNavEntryForEdit);
      }
  },
  
  /************************************************************************************************/
  _adjustEditPalette: function(/*boolean*/ show){
  /************************************************************************************************/
    if(show===true){
		this.palette = new CoreContentPanePropertiesPanel(this.currentTableName,this.currentModelName);				
     }
     else if(this.palette!==null){
		// it is not possible to remove the palette. This must happen AFTER the relayout of
		// the UI. The layoutmanager needs the element (palette) for cleanup
		this.palette.remove();
		this.palette=null;
     }
  },

  /************************************************************************************************/
  _adjustContentActionBar: function(){
  /************************************************************************************************/
	// inject a "Edit Form" Button into the formular area
	//
	if(this.editButton===null && this.designMode===true && this.detailModelLoaded===true){
	   this.editButton = $('<button class="toolbar_button button_right_align" id="button_design_formular"></button>');
	   this.editButton.button({
	      text:false,
          icons: {
            primary: "core_icon_preferences"
         }
       }).click($.proxy(function(){
	      this._setEditModeForm(!this.editModeForm);
	      if(this.editModeForm){
	        this.editButton.addClass("button_ok");
	      	this.editButton.button( "option", "label", "Done" );
	      	this.editButton.button( "option", "text", true );
	      	this.editButton.button( "option", "icons", false );
	      }
	      else{
	        this.editButton.removeClass("button_ok");
	        this.editButton.button( "option", "label", "" );
	      	this.editButton.button( "option", "text", false );
	      	this.editButton.button( "option", "icons", {primary: "core_icon_preferences"} );
	      }
	   },this));
	   $("#container_detail_toolbar").append(this.editButton);
    }
    else if(this.designMode===false && this.editButton!==null){
       this.editButton.remove();
       this.editButton=null;
    }
  },
  
  /************************************************************************************************/
  _adjustNavigationActionBar: function(){
  /************************************************************************************************/
    var alreadyDone = $("#button_new_folder").size()>0;
	
	// inject the buttonbar
	//
    if(this.designMode===true && alreadyDone ===false){
       $('#navigation_toolbar_actions')
          .append('<button class="toolbar_button" id="button_new_folder">Folder</button>'+
                  '<button class="toolbar_button" id="button_new_form">Form</button>'+
                  '<button class="toolbar_button button_right_align" id="button_edit_navigation">Edit</button>'
                  );

       $("#button_new_folder").button({
          icons: {
            primary: "ui-icon-circle-plus"
         }
       }).click($.proxy(function(){
           this._createFolder();
       },this));
       
       $("#button_new_form").button({
          icons: {
            primary: "ui-icon-circle-plus"
         }
       }).click($.proxy(function(){
            this._createForm();
       },this));
       
       $("#button_edit_navigation").button({
          text:false,
          icons: {
            primary: "core_icon_preferences"
         }
       }).click($.proxy(function(){
           this._setEditModeNavigation(true);
           $("#button_edit_navigation").button( "option", "disabled", true );
       },this));
  	   coreTrigger(COMMAND_LAYOUT, [this.designMode]);
    }
	else if(this.designMode ===true && alreadyDone===true){
	    $("#button_edit_navigation").show();
	}
    else if(this.designMode ===false && alreadyDone===true){
       $('#navigation_toolbar_actions').html("");
	   
	   // remove the class attributes. In this case this is no more part of the layout
	   //
  	   coreTrigger(COMMAND_LAYOUT, [this.designMode]);
     }

     if(this.detailModelLoaded===true){
        $("#navigation_toolbar_actions .toolbar_button").button("disable");
     }
     else{
        $("#navigation_toolbar_actions .toolbar_button").button("enable");
     }
     
     // Der edit-Button ist immer aktiv. Der Button entscheidet ob die Navigation
     // oder die Filter bearbeitet werden sollen.
     $("#button_edit_navigation").button("enable");
  },
  

  /************************************************************************************************/
  _adjustFormHeight: function(){
  /************************************************************************************************/
    // adjust the form to the children bounding box.
    // Required for the DragDrop of UI elements during scrolling
    var bounds = $("#content_formular").children().bounds();
    $("#content_formular").css({"width":Math.max( $("#container_detail").width(),bounds.width), 
                                "height":Math.max( $("#container_detail").height(),bounds.height)});
  },
  
  /************************************************************************************************/
  _paletteDataDropped: function(event, ui){
  /************************************************************************************************/
    var formPos = this._getFormPos();
    var target = $(event.target);

    var pos = this._toContainerPaneCoordinate(ui.offset);
    var readonly = ui.draggable.data("readonly");
    var recordId = $("#content_formular").data("recordpkey");;
    var column = ui.draggable.data("column");
    var model =  ui.draggable.data("model");

	CoreBackend.UI.createDataElement(model, column,  readonly, pos.left, pos.top, recordId, $.proxy(function( response ) {
        var newElements = $(response);
         newElements.appendTo("#content_formular");
         $("#content_formular .[data-draggable=true]:not([readonly='readonly'])").each(function(i, item){
              $item = $(item);
              $item.attr("readonly","readonly");
              // hier mit "attr" arbeiten, da sonst der selector für das entfernen des READOLY-attr nicht
              // funktioniert.
              $item.attr("data-manual_readonly","true");
         });
         $("#content_formular .[data-draggable=true]").each(function(i, item){
              $(item).addClass("core_formelement_designmode");
         });
         this._adjustFormHeight();
         this._updateResizeHandle(newElements.last(),true);
       },this)
     );
  },
  
  /************************************************************************************************/
  _paletteWidgetDropped: function(event, ui){
  /************************************************************************************************/
    var formPos = this._getFormPos();
    
    var readonly  = false;
    var target    = $(event.target);
    var type      = ui.draggable.data("type");
    var column    = "";
    var model     = this.currentModelName;
    var table     = this.currentTableName;
    var controller = this.currentControllerName;
    var innerHTML = ui.draggable.data("innerHTML");
    
    var pos = this._toContainerPaneCoordinate(ui.offset);
	
    var recordId = $("#content_formular").data("recordpkey");;

    CoreBackend.UI.createGeneric(model, table, controller, column, readonly, pos.left, pos.top, type, innerHTML, recordId, $.proxy(function( json ) {
         var newElements = this.uiRenderer.renderElements(json);
         $.each(newElements, function(index, element){
            $("#content_formular").append(element);
            if(element.is("button")){
               element.button().click(function(){
                  return false;
               });
            }
         });
         this._adjustFormHeight();
         var elementToSelect = newElements.length>0?newElements[newElements.length-1]:null;

         $("#content_formular .[data-draggable=true]").each(function(i, item){
             $(item).addClass("core_formelement_designmode");
         });
         
         this._updateResizeHandle(elementToSelect,true);
    },this));
  },
  

  /************************************************************************************************/
  _deleteElement: function(element){
  /************************************************************************************************/
       this._updateResizeHandle(null,false);
       
	   // remove all related LABEL elements 
	   //
	   $.each($(".[data-relatedinput='"+element.data("pkey")+"']"), function(i,item){
		  item = $(item);
		  $.ajax({
			url: "index.php/controller_core_formelement/delete/"+item.data("pkey"),
			type: 'POST',
			beforeSend: function() {
			  item.animate({'color':'#fb6c6c'},100);
			},
			success: $.proxy(function( response ) {
			   item.effect("scale", {percent:20}, 400).fadeOut(500, function(){$(this).remove();});
			},this) // end success
		   }); // end ajax
		});// end each
		
	   // remove the INPUT/LABEL itself
	   //
	   $.ajax({
		 url: "index.php/controller_core_formelement/delete/"+element.data("pkey"),
		 type: 'POST',
		 beforeSend: function() {
			 element.animate({'color':'#fb6c6c', borderColor:'#fb6c6c'},100);
		 },
		 success: $.proxy(function( response ) {
			element.effect("scale", {percent:10}, 400).fadeOut(500, function(){$(this).remove();});
		 },this) // end success
		}); // end ajax
  },
  
 
  /************************************************************************************************/
  _updateResizeHandle: function(element, showHandle){
  /************************************************************************************************/
      // Create new Handle
      //
      if(this.editModeForm===true){
          if(element===null){
            if(this.resizeHandle!==null)
               $.each(this.resizeHandle,function(i,e){e.remove();});
            this.resizeHandle=null;
            this.currentSelectedElement = null;
            if(this.palette!=null)
               this.palette.update(null);
          }
          else if(element!=null && !element.equals(this.currentSelectedElement) && showHandle===true && this.duringResize===false){
              this.currentSelectedElement = element;
              
              if(this.palette!=null)
             	this.palette.update(this.currentSelectedElement);

              if(this.resizeHandle!=null)
                 $.each(this.resizeHandle,function(i,e){e.remove();});
           
              var settings = {
                update:$.proxy(function(){
                   $.each(this.resizeHandle,function(i,e){e.updatePosition();});
                },this),
                start:$.proxy(function(){
                   this.duringResize=true;
                },this),
                stop:$.proxy(function(){
                   this.duringResize=false;
                   this.currentSelectedElement.updateOnServer();
                   $(".[for='"+this.currentSelectedElement.attr("name")+"']").updateOnServer();
                },this)
              }
          
              if(element.is("div") && element.find("hr").length>0){
                  this.resizeHandle = [
                             new CoreResizeBorder(element),
                             new CoreResizeHandle_W(element,settings),
                             new CoreResizeHandle_E(element,settings)
                             ];
              }
              // Falls es ein LABEL oder DIV ist, wird der Font automatisch vergrößert/verkleinert
              // wenn sich das Elemetn selber vergrößert/verkleiner. => Text passt immer 100% in den
              // DIV oder LABEL container
              else if(element.is("label")||element.is("div")){
                  this.resizeHandle = [
                             new CoreResizeBorder(element),
                             new CoreResizeHandle_N(element,settings),
                             new CoreResizeHandle_S(element,settings),
                             new CoreResizeFont(element)
                             ];
              }
              else if(element.is("button")){
                  this.resizeHandle = [
                             new CoreResizeBorder(element),
                             new CoreResizeHandle_NW(element,settings),
                             new CoreResizeHandle_SW(element,settings),
                             new CoreResizeHandle_SE(element,settings),
                             new CoreResizeHandle_NE(element,settings),
                             new CoreResizeHandle_N(element,settings),
                             new CoreResizeHandle_S(element,settings),
                             new CoreResizeHandle_W(element,settings),
                             new CoreResizeHandle_E(element,settings)
                             ];
              }
              else{
                  this.resizeHandle = [
                             new CoreResizeBorder(element),
                             new CoreResizeHandle_NW(element,settings),
                             new CoreResizeHandle_SW(element,settings),
                             new CoreResizeHandle_SE(element,settings),
                             new CoreResizeHandle_NE(element,settings),
                             new CoreResizeHandle_N(element,settings),
                             new CoreResizeHandle_S(element,settings),
                             new CoreResizeHandle_W(element,settings),
                             new CoreResizeHandle_E(element,settings),
                             new CoreResizeFontInput(element)
                             ];
              }
          }
          // Move the handle the new position of the object
          //
          else if(showHandle===true/* && (this.duringResize===true || this.duringDrag===true)*/){
            $.each(this.resizeHandle,function(i,e){e.updatePosition();});
          }
      }
      // Remove Handle, because the CTRL is not pressed
      //
      else if(this.resizeHandle!=null && showHandle===false && this.duringResize===false){
        $.each(this.resizeHandle,function(i,e){e.remove();});
        this.resizeHandle=null;
        this.currentSelectedElement=null;
      } 
  },

  /************************************************************************************************/
  _toContainerPaneCoordinate: function(offset) {
  /************************************************************************************************/
      var pos = this._getFormPos();
      var scroll = this._getScrollPos();
      return {"top":offset.top-pos.top+scroll.top,"left":offset.left-pos.left+scroll.left}
  },
    
  /************************************************************************************************/
  // return the position of the FORM-Element in the page
  /************************************************************************************************/
  _getFormPos: function() {
      return $("#container_detail").offset();
  },
  

  /************************************************************************************************/
  _getScrollPos: function() {
  /************************************************************************************************/
      return {"top":$("#container_detail").scrollTop(),"left":$("#container_detail").scrollLeft()};
  }
});


