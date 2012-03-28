var CoreNavigation = Class.extend({

  /************************************************************************************************/
  init: function(){
  /************************************************************************************************/
	this.lastNavigationEntry = null;
	this.navigationLocked = false;
	
    // Convert the markup string into a named template,
    // referenced by the "navigationTemplate" tag
    this.navigationTemplate=   '<div data-parent_id="${parent_id}" class="columnnav_panel" >'+
							   ' <ul class="columnnav_list">'+
							   ' {{each objects}}'+
							   '   <li id="${id}"'+ 
							   '    data-parent_id="${parent_id}" '+ 
							   '    data-id="${id}" '+ 
							   '    data-name="${name}" '+ 
							   '    data-controller="${controller}" '+ 
							   '    data-model="${model}" '+ 
							   '    data-table="${table}" '+ 
							   '    class="columnnav_listentry">'+ 
							   '    <span class="columnnav_listentry_label" data-display_field="${table}_${field}_${id}">${label}</span>'+ 
							   ' {{if childCount > 0 || controller == "controller_core_navigation"}}'+
							   '    <span class="columnnav_listentry_counter">${childCount}</span>'+ 
							   ' {{else}}'+
							   '    <span style="display:none" class="columnnav_listentry_counter">${childCount}</span>'+ 
							   ' {{/if}}'+
							   '   </li>'+  
							   ' {{/each}}'+
							   ' </ul>'+
							   '</div>';


    $(document).bind(COMMAND_NAVIGATION_NAVIGATE_UP,$.proxy(function(event){
       this.navigateUp();
    },this));
 
    $(document).bind(COMMAND_NAVIGATION_NAVIGATE,$.proxy(function(event, elementId, animation){
       this.navigateDown(elementId, animation);
    },this));
    
    $(document).bind(COMMAND_NAVIGATION_LOAD,$.proxy(function(event){
       this.load();
    },this));

    $(document).bind(COMMAND_NAVIGATION_REFRESH,$.proxy(function(event,elementToSelect){
       this.refresh(elementToSelect);
    },this));

    $(document).bind(COMMAND_NAVIGATION_LOCK,$.proxy(function(event,navigationLocked){
       this.navigationLocked = navigationLocked;
       if(navigationLocked===true)
          $("#container_navigation_firstchild").fadeTo( 500, 0.3 )
	   else
		  $("#container_navigation_firstchild").fadeTo( 500, 1.0 )
    },this));

	$('.columnnav_listentry').live('click', $.proxy(function(event) { 
        this.lastNavigationEntry = $(event.currentTarget);
        this.navigateDown($(event.currentTarget));
    } ,this)); 
  },
  
  /************************************************************************************************/
  load: function(){
  /************************************************************************************************/

	CoreBackend.Navigation.load("controller_core_navigation",0,$.proxy(function( response ) {
		var container= $.tmpl(this.navigationTemplate,response);
		$('#container_navigation_firstchild')
		   .empty()
		   .append(container);
		var list = container.find("ul");
		// add iOS scroll behaviour
		container.niceScroll();
		coreTrigger(COMMAND_DETAIL_RECORD_CLEAR);
		coreTrigger(EVENT_NAVIGATION_FOLDERS_LOADED, [container, list]);
		coreTrigger(COMMAND_LAYOUT);
		coreTrigger(EVENT_NAVIGATION_NAVIGATED,[0,null,true]);
	},this));
  },

  /************************************************************************************************/
  navigateUp: function(element, animation){
  /************************************************************************************************/
    if(this.navigationLocked===true)
       return;

 	var allPanes = $(".columnnav_panel");
	var navPanes = allPanes.not("#static_filter");
	var size = Math.max(0,navPanes.size()-2);
	var newPane = $(navPanes[size]);

    newPane.find(".ui-state-active").removeClass("ui-state-active");
    var all= newPane.nextAll();
    all.remove();

    coreTrigger(COMMAND_DETAIL_RECORD_CLEAR);
    coreTrigger(COMMAND_LAYOUT);
    coreTrigger(EVENT_NAVIGATION_NAVIGATED, [$(this.lastNavigationEntry).data("parent_id"),$(this.lastNavigationEntry).data("id"),false]);
  },

  /************************************************************************************************/
  navigateDown: function(element, animation){
  /************************************************************************************************/
    if(this.navigationLocked===true)
       return;

    element=$(element);
    
    if(element.length===0)
      return;
      
    // show the load indicator
    // (will be remove in the application.js with a global evnet handler
	$(element).find(".columnnav_listentry_label").activity({segments: 9,padding:0, align: 'right', valign: 'top', steps: 3, width:2, space: 1, length: 3, color: '#030303', speed: 1.5});

    var childrenAreSortable  = element.data("controller")==="controller_core_navigation";
    var childrenAreMenuitems = element.data("model")==="Model_formelement";
    
    element.parent().children().removeClass("ui-state-active");
    element.addClass("ui-state-active");
    element.scrollintoview({containerSelector:".columnnav_panel"});
    if(childrenAreMenuitems===true){
         var controller = $(element).data("controller");
         var id = element.data("id");
         CoreBackend.Navigation.load(controller, id, $.proxy(function( response ) {
              var container= $.tmpl(this.navigationTemplate,response);
              var p =$(element.parent().parent());
              var all= p.nextAll();
              all.remove();
              var list = container.find("ul");
              container.appendTo($("#container_navigation_firstchild"));
              // ist der Fall wenn es normale menuentries sind (keine Entries auf Models)
              //
              if(childrenAreSortable===true){
                 coreTrigger(COMMAND_DETAIL_RECORD_CLEAR);
                 coreTrigger(EVENT_NAVIGATION_FOLDERS_LOADED,[container, list]);
                 coreTrigger(COMMAND_LAYOUT);
                 coreTrigger(EVENT_NAVIGATION_NAVIGATED, [$(this.lastNavigationEntry).data("parent_id"),$(this.lastNavigationEntry).data("id"),true]);
              } // end if sortable
              else {
                coreTrigger(EVENT_NAVIGATION_RECORDS_LOADED,[element.data("controller")]);
                coreTrigger(COMMAND_DETAIL_MODEL_LOAD,[element.data("controller")]);
                coreTrigger(COMMAND_LAYOUT);
                coreTrigger(EVENT_NAVIGATION_NAVIGATED, [$(this.lastNavigationEntry).data("parent_id"),$(this.lastNavigationEntry).data("id"),true]);
              }
              container.niceScroll();
           },this)  // end success
       ); // end load
    }
    else{
       coreTrigger(COMMAND_DETAIL_RECORD_LOAD,[element.data("id"), 
                                               element.data("model"),  
                                               element.data("table"), 
                                               element.data("controller"),
                                               animation]);
       coreTrigger(EVENT_NAVIGATION_NAVIGATED, [$(this.lastNavigationEntry).data("parent_id"),$(this.lastNavigationEntry).attr("id"),true]);
    }
  },
  
  /************************************************************************************************/
  refresh: function(elementToSelect){
  /************************************************************************************************/
	var paneToRefresh = $(".columnnav_panel").not("#static_filter").last();
	var paneParent = paneToRefresh.prev();
	if(paneParent.size()===1){
  	    var id = paneToRefresh.data("parent_id");	
  	    var controller = paneParent.find("#"+id).data("controller");
  	    
         CoreBackend.Navigation.load(controller, id, $.proxy(function( response ) {
              var container= $.tmpl(this.navigationTemplate,response);
              var list = container.find("ul");
              paneToRefresh.replaceWith(container);
              coreTrigger(COMMAND_LAYOUT);
              container.niceScroll();
              coreTrigger(EVENT_NAVIGATION_REFRESHED);
              
              var $elementToSelect = $(elementToSelect);
              $elementToSelect.addClass("ui-state-active");
              $elementToSelect.scrollintoview({containerSelector:".columnnav_panel"});

           },this)  // end success
       ); // end load

	}
  }
  
});
