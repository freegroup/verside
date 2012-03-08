var CoreLayoutPortrait = Class.extend({

  /************************************************************************************************/
  init: function(expandViewMode, globalDesignMode){
  /************************************************************************************************/
    $("#container_navigation").addClass("columnnav_panel_portrait");

    this.layoutObj = null;
    this.layoutObj2 = null;
    this.currentPaneWidth = 0;
	this.globalDesignMode = globalDesignMode;
    this.expandViewMode = expandViewMode;

    this.toolbar =$('<div id="navigation_toolbar" class="breadcrumb ui-widget-header"></div>');
    this.toolbar.appendTo($("#container_navigation"));
    this.toolbarHeight=$("#navigation_toolbar").height();
 
    $("#navigation_toolbar").scrollcrumb({
       click: $.proxy(function(event, index){
           this._scrollPaneIntoView(index) 
       },this)
    });
    
    this.callbackBreadcrumb = $.proxy(this.adjustBreadcrumb,this);
    $(document).bind(EVENT_NAVIGATION_NAVIGATED,this.callbackBreadcrumb);

    this.callbackDesignMode =$.proxy(function(event, /*boolean*/ designMode){
       this.globalDesignMode = designMode;
	   this.layout();
	   $(window).resize();
    },this);
    $(document).bind(COMMAND_DESIGNMODE_GLOBAL,this.callbackDesignMode);

    this.callbackExpandedMode =$.proxy(function(event, /*boolean*/ expandViewMode){
       this.expandViewMode = expandViewMode;
	   this.layout();
	   $(window).resize();
    },this);
    $(document).bind(COMMAND_LAYOUT_EXPANDED,this.callbackExpandedMode);

    $("#container_navigation").addClass("ui-layout-north");

    this.layout();
	this.adjustViewport(false);
   },

  /************************************************************************************************/
  reset: function() {
  /************************************************************************************************/  
    $("#container_navigation").removeClass("columnnav_panel_portrait");
    $("#container_navigation").removeClass("ui-layout-north");

    this.layoutObj.destroy();
    this.layoutObj2.destroy();
    this.toolbar.remove();
    
    $(document).unbind(EVENT_NAVIGATION_NAVIGATED,this.callbackBreadcrumb);
    $(document).unbind(COMMAND_LAYOUT_EXPANDED,this.callbackExpandedMode);
    $(document).unbind(COMMAND_DESIGNMODE_GLOBAL,this.callbackDesignMode);
  },
  
  /************************************************************************************************/
  adjustBreadcrumb: function(parentElementId, elementId ) {
  /************************************************************************************************/
	var allPanes = $(".columnnav_listentry.ui-state-active");
    var labels = [];
    allPanes.each(function(i,item){
      labels.push($(item).find(".columnnav_listentry_label").text());
    });
    
	$("#navigation_toolbar").scrollcrumb("set",{
	  labels:labels
	});
  },
  
  /************************************************************************************************/
  _scrollPaneIntoView: function(index) {
  /************************************************************************************************/
    var innerContainer = $('#container_navigation_firstchild');
    var selectedEntry = innerContainer.find(".columnnav_panel:nth-child("+(index+1)+") .ui-state-active");
    var newPos = Math.min(0,-(index-1)*this.currentPaneWidth);
    innerContainer.animate({
         left: newPos
       }, 
       {
          duration:600,
          specialEasing: {
            left: 'easeOutCirc'
          },
          complete:function(){
            coreTrigger(COMMAND_NAVIGATION_NAVIGATE,[selectedEntry]);
          }
       });
  },

  /************************************************************************************************/
  layout:function(){
  /************************************************************************************************/

   if(this.layoutObj!==null)
       this.layoutObj.destroy();
       
   if(this.layoutObj2!==null)
       this.layoutObj2.destroy();
     
   this.layoutObj =$('#container_root').layout({
        center: {
           resizable:false,
           closable:false,
        },
	    north: {
           resizable:false,
           closable:false,
           spacing_closed:0,
           initClosed : this.expandViewMode,
           size: 250
        }
      });

     this.layoutObj2 = $('#container_navigation').layout({
	  north: {
          resizable:false,
          closable:false,
          paneSelector: "#navigation_toolbar",
          size:this.toolbarHeight,
          spacing_closed:0,
          spacing_open:0
      },
      center: {
          resizeWhileDragging:true,
          resizeContentWhileDragging:true,
          paneSelector: "#container_navigation_firstchild",
          onresize_end: $.proxy(function(){
            this.adjustViewport(false);
          },this)
      }
    });
    $(window).resize();
  },

  /************************************************************************************************/
  adjustViewport: function(/*boolean*/ animateFlag) {
  /************************************************************************************************/
    var containerWidth = $("#container_navigation").width();

    var innerContainer = $('#container_navigation_firstchild');
	var allPanes = innerContainer.find(".columnnav_panel");
	var navPanes = allPanes.not("#static_filter");

    var countOfPanes = navPanes.size();

    this.currentPaneWidth = (containerWidth/3);
	$(".columnnav_listentry_label").css({"width":(this.currentPaneWidth-75)+"px"});
  	allPanes.css({width:this.currentPaneWidth});
    // die tatsächlich gesetzte Breite holen
    this.currentPaneWidth=allPanes.outerWidth();

   	innerContainer.css("width",(this.currentPaneWidth*countOfPanes+50));
    
    var newPos = Math.min(0,-(countOfPanes-3)*this.currentPaneWidth);
    
    if(animateFlag===true){
       innerContainer.animate(
          {
		   "left": newPos
		  }, 
		  {
           duration:300,
           specialEasing: {
            left: 'easeOutCirc'
           }
        });
    }
    else {
       innerContainer.css({"left": newPos});
    }
	
	// scroll the last selected entry into the visible area
	//
	var selectedEntry = navPanes.find(".ui-state-active").last();
	selectedEntry.scrollintoview({containerSelector:".columnnav_panel"});

	// adjust the nicescroll scrollbar
	//
	navPanes.niceScroll();

    if(navPanes.size()===1)
   	   coreTrigger(EVENT_NAVIGATION_FOLDER_ACTIVATED,[navPanes.data("parent_id")]);
   	else
       coreTrigger(EVENT_NAVIGATION_FOLDER_ACTIVATED,[selectedEntry.data("parent_id")]);
  }
  
});
