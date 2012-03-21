var CoreLayoutLandscape = Class.extend({

  /************************************************************************************************/
  init: function(expandViewMode, globalDebugMode){
  /************************************************************************************************/
    $("#container_navigation").addClass("columnnav_panel_landscape");
    this.layoutObj = null;
    this.layoutObj2 = null;
	this.globalDebugMode = globalDebugMode;
    this.expandViewMode = expandViewMode;
 
    this.toolbarNavigation =$('<div id="navigation_toolbar" class="ui-layout-north toolbar">'+
                              '<button class="toolbar_button" id="button_fastback">Home</button>'+
                              '<button class="toolbar_button" id="button_back">Back</button>'+
                              '<div id="navigation_header_landscape" class="toolbar" ></div>'+
                              '</div>');

    this.toolbarNavigation.appendTo($("#container_navigation"));
    this.toolbarHeight=$("#navigation_toolbar").height();
      

    $("#button_fastback").button({text: false,
        icons: {
            primary: "button_fastback_icon" 
        }}
    ).click($.proxy(function(){
		 coreTrigger(COMMAND_NAVIGATION_LOAD);
	},this));
	
    $("#button_back").button({text: false,
        icons: {
            primary: "button_back_icon" 
        }}
    ).click($.proxy(function(){
		 coreTrigger(COMMAND_NAVIGATION_NAVIGATE_UP);
	},this));

    this.callbackHeader = $.proxy(this.adjustHeader,this);
    $(document).bind(EVENT_NAVIGATION_NAVIGATED,this.adjustHeader);

    this.callbackDesignMode =$.proxy(function(event, /*boolean*/ designMode){
       this.globalDesignMode = designMode;
	   this.layout();
    },this);
    $(document).bind(COMMAND_DESIGNMODE_GLOBAL,this.callbackDesignMode);

    this.callbackExpandedMode =$.proxy(function(event, /*boolean*/ expandViewMode){
       this.expandViewMode = expandViewMode;
	   this.layout();
	   
	   if(this.expandViewMode ==true)
	      return;
		var container_navigation_firstchild =$('#container_navigation_firstchild');
		
		// die Breite aller Pannel bestimmen
		var paneWidth = $("#container_navigation").width();
	
		var allPanes = $(".columnnav_panel");
		var navPanes = allPanes.not("#static_filter");
		var indexToShow = navPanes.size();
	
		$(".columnnav_listentry_label").css({"width":(paneWidth-75)+"px"});
		navPanes.css({"width":paneWidth+"px"});
	
		var width =this._getRequiredWidth()+20;
		container_navigation_firstchild.css({"width":width+"px"})
		var expectedLeft= -(paneWidth+3)*(indexToShow-1);
		container_navigation_firstchild.css("left",expectedLeft);
	
    },this);
    $(document).bind(COMMAND_LAYOUT_EXPANDED,this.callbackExpandedMode);

    this.toolbarAction =$('<div id="navigation_toolbar_actions" class="ui-layout-south toolbar ui-widget-header"></div>');
    this.toolbarAction.appendTo($("#container_navigation"));	

    $("#container_navigation_firstchild").addClass("ui-layout-center");
    $("#container_navigation").addClass("ui-layout-west");

    this.layout();
    this.adjustHeader(null, null,null,true);
  },
   
  /************************************************************************************************/
  adjustHeader: function(event, parentElementId, elementId, /*:boolean*/ drillDown ) {
  /************************************************************************************************/
    var oldTextDiv = $("#navigation_header_landscape").find("div");

    var fadeOutPos = drillDown?-150:+150;
    var fadeInPos = drillDown?100:-100;
   
	var allPanes = $(".columnnav_panel");
	var navPanes = allPanes.last().prev();

	var allPanes = navPanes.find(".columnnav_listentry.ui-state-active");
    var labels = [];
    allPanes.each(function(i,item){
      labels.push($(item).find(".columnnav_listentry_label").text());
    });
    
    var headerText = labels.length>0?labels.join(""):"Main Menu";
    
    // Der Text des Header hat sich nicht geändert -> keine Animation
    //
	if(oldTextDiv.text() === headerText)
		return;
		
    oldTextDiv.animate({
          left :fadeOutPos,
          opacity: 0.01,
        }, 300,function(){
    	oldTextDiv.remove();
    });

    var newTextDiv = $("<div>"+headerText+"</div>");
    newTextDiv.css({
          left :fadeInPos,
          opacity: 0.01
        });

	$("#navigation_header_landscape").append(newTextDiv);
    newTextDiv.animate({
          left :0,
          opacity: 1
        }, 300);
  },
  
  /************************************************************************************************/
  reset: function() {
  /************************************************************************************************/
    $("#container_navigation").removeClass("columnnav_panel_landscape");
    this.layoutObj.destroy();
    this.layoutObj2.destroy();
	
    this.toolbarNavigation.remove();
    this.toolbarAction.remove();

    $("#container_navigation").removeClass("ui-layout-west");
    $("#container_navigation_firstchild").removeClass("ui-layout-center");
	
    $(document).unbind(COMMAND_LAYOUT_EXPANDED,this.callbackExpandedMode);
    $(document).unbind(EVENT_NAVIGATION_NAVIGATED,this.callbackHeader);
    $(document).unbind(COMMAND_DESIGNMODE_GLOBAL,this.callbackDesignMode);
  },
  
  /************************************************************************************************/
  layout:function(){
  /************************************************************************************************/
	var container_navigation_firstchild =$('#container_navigation_firstchild');
 	this.lastCurrentLeft = parseInt(container_navigation_firstchild.css("left"));

    if(this.layoutObj===null){
      this.layoutObj = $('#container_root').layout({
	    west: {
            resizable:false,
            closable:false,
            initClosed : this.expandViewMode,
            spacing_closed:0,
            size: 300
        },
   	    center: {
            resizable:false,
            closable:false,
        }
      });
    }
    else{
        if(this.expandViewMode)
    		this.layoutObj.hide("west");
    	else
   			this.layoutObj.show("west");
    }
    
    if(this.layoutObj2!==null)
       this.layoutObj2.destroy();
     
	if(this.toolbarAction.html()==="")
	   this.toolbarAction.removeClass("ui-layout-south");
	else
	   this.toolbarAction.addClass("ui-layout-south");
	   
     this.layoutObj2 = $('#container_navigation').layout({
      onresizeall_end:$.proxy(function(){
       	    this.adjustViewport(false);
         },this),
	  north: {
          resizable:false,
          closable:false,
          spacing_open:0,
		  size: this.toolbarHeight*2
      },
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
    var width =this._getRequiredWidth()+20;
	$('#container_navigation_firstchild').delay(50).css({"width":width+"px","left":this.lastCurrentLeft});
    $(window).resize();
  },
   

  /************************************************************************************************/
  adjustViewport: function(/*boolean*/ animateFlag) {
  /************************************************************************************************/
	var container_navigation_firstchild =$('#container_navigation_firstchild');
    
    // die Breite aller Pannel bestimmen
  	var paneWidth = $("#container_navigation").width();

	var allPanes = $(".columnnav_panel");
	var navPanes = allPanes.not("#static_filter");
    var indexToShow = navPanes.size();

	$(".columnnav_listentry_label").css({"width":(paneWidth-85)+"px"});
  	navPanes.css({"width":paneWidth+"px"});

    var width =this._getRequiredWidth()+20;
	container_navigation_firstchild.css({"width":width+"px"})
 	var currentLeft = parseInt(container_navigation_firstchild.css("left"));
	
	var expectedLeft= -(paneWidth+3)*(indexToShow-1);
	
	if(expectedLeft===currentLeft)
	   return;
	   
	if(animateFlag===true){
     	container_navigation_firstchild.animate({"left":expectedLeft},"normal");
    }
	else{
     	container_navigation_firstchild.css("left",expectedLeft);
	}
	
	// scroll the selected entry into the visible area
	//
	var selectedEntry = navPanes.find(".ui-state-active").last();
	selectedEntry.scrollintoview({containerSelector:".columnnav_panel"});

	// adjust the nicescroll scrollbar
	//
	navPanes.niceScroll();

	coreTrigger(EVENT_NAVIGATION_FOLDER_ACTIVATED,[navPanes.last().data("parent_id")]);
    if(navPanes.size()>1){
       $("#button_back").button("enable");
       $("#button_fastback").button("enable");
    }
    else{
       $("#button_back").button("disable");
       $("#button_fastback").button("disable");
    }
  },
  
  
  /************************************************************************************************/
  _getRequiredWidth: function(){
  /************************************************************************************************/
  
   var sum=0;
   $(".columnnav_panel").each( function(){ sum += $(this).outerWidth();});
   return sum;
  }
  
});
