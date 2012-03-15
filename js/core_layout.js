var CoreLayout = Class.extend({

  /************************************************************************************************/
  init: function(containerId){
  /************************************************************************************************/
    this.layoutDelegate=null;
    this.contentLayout = null;
    this.mainLayout = null;
    this.toolbarHeight = 0;
    this.expandedViewMode = false;
    this.globalDesignMode = false;
	
	window.onorientationchange = $.proxy(this.handleOrientation,this);
    
    $(document).bind(COMMAND_LAYOUT,$.proxy(function(event){
       this._refrehNavigationLayout();
    },this));

    $(document).bind(COMMAND_LAYOUT_CONTENTAREA,$.proxy(function(event){
       this._refrehContentLayout();
    },this));

    $(document).bind(COMMAND_DESIGNMODE_GLOBAL,$.proxy(function(event, /*boolean*/ globalDesignMode){
  	    this.globalDesignMode = globalDesignMode;
    },this));

    $(document).bind(COMMAND_LAYOUT_EXPANDED,$.proxy(function(event, /*boolean*/ expandedViewMode){

  	    this.expandedViewMode = expandedViewMode;
	    if(expandedViewMode){
          this.mainLayout.hide("north");
	    }
	    else{
          this.mainLayout.show("north");
	    }
	    $(window).resize();
    },this));

    $(document).bind(COMMAND_LAYOUT_LANDSCAPE,$.proxy(function(event){
       if(this.layoutDelegate!=null)
          this.layoutDelegate.reset();
       this.layoutDelegate = new CoreLayoutLandscape(this.expandedViewMode,this.globalDesignMode);
    },this));

    $(document).bind(COMMAND_LAYOUT_PORTRAIT,$.proxy(function(event){
       if(this.layoutDelegate!=null)
          this.layoutDelegate.reset();
       this.layoutDelegate = new CoreLayoutPortrait(this.expandedViewMode,this.globalDesignMode);
    },this));

    // layout FIRST the body
    this.mainLayout = $('body').layout({
         defaults: {
             fxName: "none"
         },
	     north: {
           resizable:false,
           closable:false,
           paneSelector: "#teaser",
           spacing_open:0,
           spacing_closed:0
         },
         center: {
           resizable:false,
           closable:false,
           paneSelector: "#container_application"
         }
    });
    
   this.toolbarHeight=$("#container_detail_toolbar").height();
   this.contentLayout= $('#xxx').layout({
	  north: {
          resizable:false,
          closable:false,
          spacing_open:0,
          size:this.toolbarHeight
      },
      center: {
          resizable:false,
          closable:false,
          resizeWhileDragging:true,
          resizeContentWhileDragging:true
      }
   });

   if(isWebPad()===true){
      this.handleOrientation();
   }
   else{
      this.layoutDelegate = new CoreLayoutLandscape(this.expandedViewMode,this.globalDesignMode);
      //this.layoutDelegate = new CoreLayoutPortrait(this.expandedViewMode,this.globalDesignMode);
    }
	
  },
  
  /************************************************************************************************/
  handleOrientation:function(){
  /************************************************************************************************/

    if(this.layoutDelegate!=null)
        this.layoutDelegate.reset();
        
	 var orientation = window.orientation;
  	 if ( orientation == 0 ) {
		  this.layoutDelegate = new CoreLayoutPortrait(this.expandedViewMode,this.globalDesignMode);
	 }
	 else if ( orientation == 90 ) {
         this.layoutDelegate = new CoreLayoutLandscape(this.expandedViewMode,this.globalDesignMode);
	 }
	 else if ( orientation == -90 ) {
         this.layoutDelegate = new CoreLayoutLandscape(this.expandedViewMode,this.globalDesignMode);
	 }
	 else  {
         this.layoutDelegate = new CoreLayoutPortrait(this.expandedViewMode,this.globalDesignMode);
	}
 },
 
 
  /************************************************************************************************/
  _refrehContentLayout: function() {
  /************************************************************************************************/
    if(this.contentLayout!=null)
       this.contentLayout.destroy();
   
    this.contentLayout= $('#xxx').layout({ 
	   north: {
          resizable:false,
          closable:false,
          spacing_open:0,
          size:this.toolbarHeight
       },
	   east: {
          resizable:false,
          closable:false,
          spacing_open:0
       },
       center: {
          resizable:false,
          closable:false,
          resizeWhileDragging:true,
          resizeContentWhileDragging:true
       }
     });  
   },
   
  /************************************************************************************************/
  _refrehNavigationLayout: function() {
  /************************************************************************************************/
     if(this.layoutDelegate!==null){
        this.layoutDelegate.adjustViewport(true);
	}
  }
  
});
