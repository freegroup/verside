var CoreContentPanePropertiesPanel = Class.extend({
 
  /************************************************************************************************/
  init: function(tableName, modelName){
  /************************************************************************************************/
    this.tableName = tableName;
    this.modelName = modelName;
    this.currentUIElement = null;
	this.uiRenderer = new CoreRenderer();
 
    this.fieldTemplate='<div class="ui-layout-center pane" style="overflow:hidden">                                        '+
	
						' <div id="palette_pane_fields" style="position:absolute;top:0px;left:0px;height:100%;width:100%">'+
						' {{each fields}}                                                                                  '+
						'    <div class="palette_element palette_element_data ui-corner-all ui-widget-header"              '+
						'         data-column="${name}"                                                                    '+
						'         data-readonly="${readonly}"                                                              '+
						'         data-model="${modelName}"                                                                '+
						'         data-table="${tableName}" >                                                              '+
						'       <span style="float:left" class="ui-icon ui-icon-arrow-4"></span>                           '+
						'       ${name}                                                                                    '+
						'    </div>                                                                                        '+
						' {{/each}}                                                                                        '+
						' </div>                                                                                           '+
						
						' <div id="palette_pane_widget" style="position:absolute;top:0px;left:0px;height:100%;width:100%"> '+
						
						/*
						'    <div data-type="button" '+
						'         data-innerHTML="Button"'+
						'         class="palette_element palette_element_ui ui-corner-all ui-widget-header" >'+
						'       <span style="float:left" class="ui-icon ui-icon-arrow-4"></span>                           '+
						'       Button                                                                                     '+
						'    </div>                                                                                        '+
						*/
						
						'    <div data-type="line" '+
						'         data-innerHTML=""'+
						'         class="palette_element palette_element_ui ui-corner-all ui-widget-header" >'+
						'       <span style="float:left" class="ui-icon ui-icon-arrow-4"></span>                           '+
						'       Line                                                                                       '+
						'    </div>                                                                                        '+
						
						'    <div data-type="title" '+
						'         data-innerHTML=""'+
						'         class="palette_element palette_element_ui ui-corner-all ui-widget-header" >'+
						'       <span style="float:left" class="ui-icon ui-icon-arrow-4"></span>                           '+
						'       Title                                                                                      '+
						'    </div>                                                                                        '+

						'    <div data-type="input" '+
						'         data-innerHTML=""'+
						'         class="palette_element palette_element_ui ui-corner-all ui-widget-header" >'+
						'       <span style="float:left" class="ui-icon ui-icon-arrow-4"></span>                           '+
						'       Input                                                                                       '+
						'    </div>                                                                                        '+
						
   					    '    <div data-type="area" '+
						'         data-innerHTML=""'+
						'         class="palette_element palette_element_ui ui-corner-all ui-widget-header" >'+
						'       <span style="float:left" class="ui-icon ui-icon-arrow-4"></span>                           '+
						'       Area                                                                                       '+
						'    </div>                                                                                        '+
						
						' </div>                                                                                           '+
						
						' <div id="palette_pane_properties" style="position:absolute;top:0px;left:0px;height:100%;width:100%">'+
						' </div>                                                                                              '+
						'</div>';
                    
        // inject the column-palette into the content area
        //
        this.palette = $('<div id="container_ui_palette" class="pane ui-layout-east ui-widget-content">'+
						  '  <div id="palette_toolbar" class="ui-layout-south ui-widget-header">'+
						  '     <span id="palette_tab_properties" class="toolbar_segment  ui-state-active"  style="width:50%">Options</span>'+
						  '     <span id="palette_tab_ui" class="toolbar_segment" style="width:49%">Widget</span>'+
						  '  </div>'+
						  '</div>');
                                       
        $("#xxx").append(this.palette);
 
       
        // retrieve the column definition of the loaded model and init all drag&drop elements
        //
        CoreBackend.Model.getTableFields(this.tableName, this.modelName, $.proxy(function( data ) {
                   var container= $.tmpl(this.fieldTemplate,data);
                   $("#container_ui_palette").append(container);
                  
                   $(".palette_element_data").draggable({
                        appendTo:"#container_application",
                        stack:"#container_detail",
                        zIndex: 27000,
                        helper:"clone",
                        start: function(e, ui){$(ui.helper).addClass("ui-state-active ui-draggable-helper .ui-button.ui-state-focus");}
                   });
                  
                   $(".palette_element_ui").draggable({
                        appendTo:"#container_application",
                        stack:"#container_detail",
                        zIndex: 27000,
                        helper:"clone",
                        start: function(e, ui){$(ui.helper).addClass("ui-state-active ui-draggable-helper .ui-button.ui-state-focus");}
                   });
                  
                   coreTrigger(COMMAND_LAYOUT_CONTENTAREA);
                   var height = $("#container_detail_toolbar").height();
                   this.mainLayout = $('#container_ui_palette').layout({
                                south: {
                                   resizable:false,
                                   closable:false,
                                   spacing_open:0,
                                   spacing_closed:0,
                                   size: height
                                },
                                center: {
                                   resizable:false,
                                   closable:false,
                                }
                        });
                       
                        // add the TabPane listener
                        //
                        $("#palette_tab_properties").click(function(){
                          $('#palette_pane_fields').fadeOut();
                          $('#palette_pane_properties').fadeIn();
                          $('#palette_pane_widget').fadeOut();
                          $(this).parent().children().removeClass("ui-state-active");
                          $(this).addClass("ui-state-active");
                        });
 
                        // add the TabPane listener
                        //
                        $("#palette_tab_ui").click(function(){
                          $('#palette_pane_fields').fadeOut();
                          $('#palette_pane_properties').fadeOut();
                          $('#palette_pane_widget').fadeIn();
                          $(this).parent().children().removeClass("ui-state-active");
                          $(this).addClass("ui-state-active");
                        });
 
            this.show();        
                },this) //end success
        ); //end getJSON()
  },
 
 
  /************************************************************************************************/
  show: function(){
  /************************************************************************************************/
    this.update(this.currentUIElement);
  },
 
 
  /************************************************************************************************/
  update: function(uiElement){
  /************************************************************************************************/
     this.currentUIElement = uiElement;
     if(uiElement===null || uiElement.size()===0){
           this.showDefault();
           return;
     }
       
     switch(uiElement.data("type")){
            case "input":
                   this.showInput();
                   break;
            case "textarea":
                   this.showTextarea();
                   break;
            case "label":
                   this.showLabel();
                   break;
            case "title":
                   this.showTitle();
                   break;
            case "button":
                   this.showButton();
                   break;
            default:
                   this.showDefault();
        }
  },
 
  /************************************************************************************************/
  remove: function(){
  /************************************************************************************************/
	this.palette.removeClass("ui-layout-east");
	coreTrigger(COMMAND_LAYOUT_CONTENTAREA);
	this.palette.remove();
  },
 
  /************************************************************************************************/
  showDefault: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").html('<div class="property_container">'+
                                       '   <div class="dialog_label">Select element to show properties...</div>'+
									   ' </div>'
									   );
  },
 
  /************************************************************************************************/
  showButton: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").html('');
	
	this._addPropertyText();
	this._addPropertyFontFamily();
	this._addPropertyFontStyle();
	this._addPropertyFontSize();
	this._addPropertyEvent();
  },
 
  /************************************************************************************************/
  showInput: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").html('');
	
	this._addPropertyFontFamily();
	this._addPropertyFontStyle();
	this._addPropertyDBTextField();
  },
 
 
  /************************************************************************************************/
  showTextarea: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").html('');
	
	this._addPropertyFontFamily();
	this._addPropertyFontStyle();
	this._addPropertyDBTextField();
	this._addPropertyFontSize();
  },

  /************************************************************************************************/
  showLabel: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").html('');
       
	this._addPropertyText();
	this._addPropertyFontFamily();
	this._addPropertyFontStyle();
	this._addPropertyFontSize();
  },
 
   /************************************************************************************************/
  showTitle: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").html('');
       
	this._addPropertyText();
	this._addPropertyFontFamily();
	this._addPropertyFontStyle();
  },
 
 /************************************************************************************************/
  _addPropertyFontSize: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").append('<div class="property_container">'+
                                       '    <div class="dialog_label">Font-Size</div>'+
                                       '    <div class="core_buttonbar ui-widget-header">'+
                                       '           <div id="property_font_sizeSmaller" class="core_buttonbar_button leftEnd tab" ><span>A-</span></div>'+
                                       '           <div id="property_font_sizeNormal" class="core_buttonbar_button tab" ><span>1:1</span></div>'+
                                       '           <div id="property_font_sizeBigger"  class="core_buttonbar_button rightEnd tab"><span>A+</span></div>'+
                                       '   </div>'+
                                       '</div>'
                                       );
 
        // click listener für den Font-bigger installieren
        //
        $("#property_font_sizeSmaller").bind("click",$.proxy(function(event){
             if(this.currentUIElement.is("button")){
                this.currentUIElement.css("font-size", "-=2");
             }
             else if(this.currentUIElement.is("textarea")){
                this.currentUIElement.css("font-size", "-=2");
             }
             else{
                this.currentUIElement.css("height", "-=5");
                this.currentUIElement.css("top", "+=5");
                this.currentUIElement.fontfit();
                this.currentUIElement.click();
                }
             this.currentUIElement.updateOnServer();
        },this));
 
        $("#property_font_sizeNormal").bind("click",$.proxy(function(event){
             if(this.currentUIElement.is("button")){
                this.currentUIElement.css("font-size", "14px");
             }
             else if(this.currentUIElement.is("textarea") || this.currentUIElement.is("input")){
                this.currentUIElement.css("font-size", "14px");
             }
             else{
                this.currentUIElement.css("height", "25px");
                this.currentUIElement.fontfit();
                this.currentUIElement.click();
             }
             this.currentUIElement.updateOnServer();
        },this));

        $("#property_font_sizeBigger").bind("click",$.proxy(function(event){
             if(this.currentUIElement.is("button")){
                this.currentUIElement.css("font-size", "+=2");
             }
             else if(this.currentUIElement.is("textarea")){
                this.currentUIElement.css("font-size", "+=2");
             }
             else{
                this.currentUIElement.css("height", "+=2");
                this.currentUIElement.css("top", "-=2");
                this.currentUIElement.fontfit();
                this.currentUIElement.click();
             }
             this.currentUIElement.updateOnServer();
        },this));
  },
 
   /************************************************************************************************/
  _addPropertyFontStyle: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").append('<div class="property_container">'+
                                       '    <div class="dialog_label">Font-Style</div>'+
                                       '    <div class="core_buttonbar ui-widget-header">'+
                                       '           <div id="property_font_italic" class="property_css_entry core_buttonbar_button leftEnd tab"  data-cssname="font-style"  data-cssvalue="italic"><span>i</span></div>'+
                                       '           <div id="property_font_bold" class="property_css_entry core_buttonbar_button tab"  data-cssname="font-weight"  data-cssvalue="bold"><span>B</span></div>'+
                                       '           <div id="property_font_underline" class="property_css_entry core_buttonbar_button rightEnd tab"  data-cssname="text-decoration"  data-cssvalue="underline"><span>U</span></div>'+
                                       '   </div>'+
                                       '</div>'
                                       );
 
        $(".property_css_entry").each($.proxy(function(i, element){
                 var $element = $(element);
                 var cssName = $element.data("cssname");
                 var cssValue = $element.data("cssvalue");
                 var elementValue = this.currentUIElement.css(cssName);
                 // HACK
                 if(cssName==="font-weight" && elementValue == 700)
                   elementValue ="bold";
                  
                 if(elementValue===cssValue){
                   $element.addClass("ui-state-active");
                 }
        },this));
 
        $(".property_css_entry").bind("click",$.proxy(function(event){
                 var $element = $(event.currentTarget);
                 var cssName = $element.data("cssname");
                 var cssValue = $element.data("cssvalue");
                 var elementValue = this.currentUIElement.css(cssName);
                 // HACK
                 if(cssName==="font-weight" && elementValue == 700)
                   elementValue ="bold";
                 
                 if(elementValue==cssValue){
                   $element.removeClass("ui-state-active");
                   this.currentUIElement.css(cssName,"inherit");
                 }
                 else{
                   $element.addClass("ui-state-active");
                   this.currentUIElement.css(cssName,cssValue);
                 }
            if(!this.currentUIElement.is("button")){
               this.currentUIElement.fontfit();
           this.currentUIElement.click();
                }
            this.currentUIElement.updateOnServer();
        },this));
  },
 
  /************************************************************************************************/
  _addPropertyFontFamily: function(){
  /************************************************************************************************/
		var list = $('<div class="property_container">'+
					   '   <div class="dialog_label">Font-Family</div>'+
					   '   <div class="ui-widget-content">'+
					   '      <div id="property_font_arial" class="property_list_entry" data-fontname="Arial">Arial</div>'+
					   '      <div id="property_font_verdana" class="property_list_entry" data-fontname="verdana">Verdana</div>'+
					   '      <div id="property_font_curier"  class="property_list_entry" data-fontname="Curier New">Curier New</div>'+
					   '   </div>'+
					   '</div>'
					   );
        $("#palette_pane_properties").append(list);
		
        // den aktuellen font aus der Liste selektieren
        //
        var fontFamily = this.currentUIElement.css("font-family");
        if(!fontFamily.startsWith("'"))
            fontFamily = "'"+fontFamily+"'";
           
 
        var entryToSelect = list.find(".[data-fontname="+fontFamily+"]");
        if(entryToSelect.size()==0)
            entryToSelect = list.find(".property_list_entry").first();
        entryToSelect.addClass("ui-state-active");
       
        // click listener für den Font-Family installieren
        //
        list.find(".property_list_entry").bind("click",$.proxy(function(event){
            var $target= $(event.currentTarget);
            
            this.currentUIElement.css("font-family", $target.data('fontname'));
            if(!this.currentUIElement.is("button")){
                this.currentUIElement.fontfit();
                this.currentUIElement.click();
            }
			
			this.currentUIElement.updateOnServer();
            list.find(".property_list_entry").removeClass("ui-state-active");
            $target.addClass("ui-state-active");
        },this));
  },
  
  /************************************************************************************************/
  _addPropertyDBTextField: function(){
  /************************************************************************************************/
        var listTemplate = '<div class="property_container" >                                         '+
							'   <div class="dialog_label">DB Column</div>                            '+
							'   <div class="ui-widget-content">                                        '+
							'      <div class="property_list_entry" data-column="">-none-</div>        '+
							' {{each fields}}                                                          '+
							'      <div class="property_list_entry" data-column="${name}">${name}</div>'+
							' {{/each}}                                                                '+
							'   </div>                                                                 '+
							'</div>                                                                    '
							
        // retrieve the column definition of the loaded model and init all drag&drop elements
        //
        CoreBackend.Model.getTableFields(this.tableName, this.modelName, $.proxy(function( data ) {
			var list= $.tmpl(listTemplate,data);
			$("#palette_pane_properties").append(list);
	 
			// ddie aktuellen Column aus der Liste selektieren
			//
			var column = this.currentUIElement.data("column");
	 
			var entryToSelect = list.find(".[data-column="+column+"]");
			if(entryToSelect.size()==0)
				entryToSelect = list.find(".property_list_entry").first();
			entryToSelect.addClass("ui-state-active");
		   
			// click listener für den Font-Family installieren
			//
			list.find(".property_list_entry").bind("click",$.proxy(function(event){
				var $target= $(event.currentTarget);
				
				var newColumn= $target.data('column');
				list.find(".property_list_entry").removeClass("ui-state-active");
				$target.addClass("ui-state-active");
				this.currentUIElement.data("column",newColumn);
				this.currentUIElement.updateOnServer();
				
				// reload the single UI-Element from the server and replace them in the UI
				//
				var form  = $( '#content_formular' );
				var model = form.data("model");
				var table = form.data("table");
				var controller = form.data("controller");
				var recordId = form.data("recordpkey");
				var elementId = this.currentUIElement.data("pkey");

				CoreBackend.UI.getElementData(model, table, controller,elementId, recordId, $.proxy(function( json ) {
		            var newElements = this.uiRenderer.renderElements(json);
		            var newElement = newElements[0];
		            
					var manualReadOnly = this.currentUIElement.attr("data-manual_readonly")
					this.currentUIElement.replaceWith(newElement);
					this.currentUIElement = newElement;

					this.currentUIElement.attr("readonly","readonly");
					// hier mit "attr" arbeiten, da sonst der selector für das entfernen des READONLY-attr nicht
					// funktioniert.
					this.currentUIElement.attr("data-manual_readonly",manualReadOnly);
					this.currentUIElement.addClass("core_formelement_designmode");

					// nachdem das Element geändert wurde kann auch der Text des Label angepasst 
					// werden
					var label = newColumn.firstUpperCase();
					if(label==="")
					   label="Caption";
					var element =  $(".[data-relatedinput='"+this.currentUIElement.data("pkey")+"']")
					element.text(label);
					coreTrigger(COMMAND_DESIGNMODE_SELECTELEMENT, [this.currentUIElement]);
                    CoreBackend.UI.setLabel(element.data("pkey"), label);
				},this));
				
			},this));
        },this));
  },
 
  /************************************************************************************************/
  _addPropertyText: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").append('<div class="property_container">'+
                                       '   <div class="dialog_label">Label</div>'+
                                       '   <input class="dialog_input" id="dialog_label_text" style="width:100%">'+
                                       '</div>'
                                    );
 
     var ajaxTimeOut=-1;
     var label = (this.currentUIElement.is("button"))?this.currentUIElement.button( "option", "label" ):this.currentUIElement.text();
     $("#dialog_label_text").val(label);
     $("#dialog_label_text").bind("keyup",$.proxy(function(e){
           if (e.which == 13) {
                $("#dialog_label_text").blur();
           }
                   var label = $("#dialog_label_text").val();
                   if(ajaxTimeOut!=-1) {
                          clearTimeout(ajaxTimeOut);
                          ajaxTimeOut=-1;
                   }
                  
                   ajaxTimeOut = setTimeout($.proxy(function(){
                       if(this.currentUIElement.is("button")){
                              this.currentUIElement.button( "option", "label", label );
                           }
                           else{
                           this.currentUIElement.text(label);
                          this.currentUIElement.click();
                           }
                       CoreBackend.UI.setLabel(this.currentUIElement.data("pkey"), label);
                   },this),800);
                  
     },this));
  },
 
   /************************************************************************************************/
  _addPropertyEvent: function(){
  /************************************************************************************************/
    $("#palette_pane_properties").append(
                                           '  <div class="property_container">'+
                                       '    <div class="dialog_label">Events</div>'+
                                       '    <div class="core_buttonbar ui-widget-header">'+
                                       '           <div id="property_event_click" data-eventname="onClick" class="property_event_entry core_buttonbar_button leftEnd rightEnd tab"><span>onClick</span></div>'+
                                       '   </div>'+
                                       '  </div>'
                                                                           );
 
        $(".property_event_entry").bind("click",$.proxy(function(event){
                 var $element = $(event.currentTarget);
                 var eventName = $element.data("eventname");
                new CoreDialogPhpBlocks(eventName).show();
        },this));
 
  },
 
});
 