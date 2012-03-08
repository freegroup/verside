(function($){

  /************************************************************************************************/
  $.fn.niceScroll = function(opt) {    
  /************************************************************************************************/

    if (typeof opt=="undefined") 
       opt = {};

    var cantouch = ("ontouchstart" in document.documentElement);
    if(!cantouch)
       return;
 
    this.each(function() {      
      var nice = $(this).data('__nicescroll')||false;
      if (!nice) {
        opt.doc = $(this);
        nice = new NiceScrollClass(opt);
        $(this).data('__nicescroll',nice);
      }
      else{
        nice.onResize();
      }
    });
    
    return this;
  };
 

  var NiceScrollClass = function(myopt) {

    this.opt = {
      zindex:9000,
      thumbopacitymin:0,
      thumbopacitymax:1,
      thumbcolor:"#424242",
      thumbwidth:"5px",
      thumbborder:"1px solid #fff",
      thumbborderradius:"5px",
      scrollspeed:30,
      background:""
    };
    
    if (myopt||false) {
      for(var a in myopt) {
         this.opt[a] = myopt[a];
      }
    }

    this.doc = $(this.opt.doc);
 
    this.scroll = {x:0,y:0};
    this.scrollratio = {x:0,y:0};    
    this.thumbheight = 20;
    this.scrollvaluemax = 0;
 
    this.rail = null;
    this.thumb = null;
    
  /************************************************************************************************/
  this.updateScrollBar = function() {
  /************************************************************************************************/
     var pos = this.doc.position();
     pos.left+=this.doc.outerWidth()-this.rail.width;
     this.rail.css({position:"absolute",top:0,left:pos.left,height:this.doc.outerHeight()});
  };
    
  /************************************************************************************************/
  this.init = function() {
  /************************************************************************************************/

        this.doc.css({'overflow-y':'hidden'});
        this.rail = $('<div>');
        this.rail.width = 4+parseFloat(this.opt.thumbwidth);
        this.rail.css({
          'zIndex':this.opt.zindex+2,
          "background":this.opt.background
        });
  
        this.doc.parent().append(this.rail);     
        this.thumb = $('<div>');
        this.thumb.css({
          'position':"relative",
          'top':"0px",
          'width':this.opt.thumbwidth,
          'background-color':this.opt.thumbcolor,
          'border':this.opt.thumbborder,
          'background-clip':'padding-box',
          'border-radius':this.opt.thumbborderradius
        });
        this.rail.append(this.thumb);
        this.rail.css({opacity:this.opt.thumbopacitymin});
        
        this.onResize();

        this.doc.bind("touchstart",$.proxy(function(e) {
          this.rail.drag = {
            x:e.pageX,
            y:e.pageY,
            st:this.doc.scrollTop(),
            lx:e.pageX,
            ly:e.pageY,
            nx:e.pageX,
            ny:e.pageY,
            dragged:false,
            tt:(new Date()).getTime(),
            lt:(new Date()).getTime()
          };
          this.doc.stop();
        },this));

        this.doc.bind("touchend",$.proxy(function(e) {
          this.doScrollMomentum(this.rail.drag);
          if(this.rail.drag.dragged===true)
             this.cancelEvent(e);
          this.rail.drag = null;
        },this));
          
        $(document).bind("touchmove",$.proxy(function(e) {
           if (this.rail.drag!==null) {
              this.rail.drag.dragged=true;
              var my = (e.pageY-this.rail.drag.y);
              this.rail.drag.ly = this.rail.drag.ny;
              this.rail.drag.ny = e.pageY;
              this.rail.drag.lt = (new Date()).getTime();
              
              this.showThumb();
              
              this.doScrollTo(this.rail.drag.st-my);
              this.cancelEvent(e);
            }
        },this));

        $(document).bind("touchend",$.proxy(function(e) {
          this.rail.drag = null;      
          this.hideThumb();
        },this));
  };
    
  /************************************************************************************************/
  this.showThumb = function() {
  /************************************************************************************************/
      this.onResize();
      this.rail.stop().css({opacity:this.opt.thumbopacitymax});
  };
    
  /************************************************************************************************/
  this.hideThumb = function(tm) {
  /************************************************************************************************/
      this.rail.stop().delay(1000).animate({opacity:this.opt.thumbopacitymin},"slow");
  };
    
  /************************************************************************************************/
  this.noticeThumb = function() {
  /************************************************************************************************/
      this.showThumb();
      this.hideThumb();
  };
    
  /************************************************************************************************/
  this.getContentSize = function() {
  /************************************************************************************************/
    var obj= {
         w:parseInt(this.doc[0].scrollWidth)-1,
         h:parseInt(this.doc[0].scrollHeight)-1
      };
      
    return obj;
  };
    
  /************************************************************************************************/
  this.onResize = function() {      
  /************************************************************************************************/
      this.view = {
        w:this.doc.innerWidth(),
        h:this.doc.innerHeight()
      };
      
      this.updateScrollBar();
      this.page = this.getContentSize();
      this.thumbheight = Math.min(this.view.h,Math.round(this.view.h * (this.view.h / this.page.h)));
      this.scrollvaluemax = this.view.h-this.thumbheight-2;
      
      this.scrollratio = {
        x:0,
        y:((this.page.h - this.view.h)/this.scrollvaluemax)
      };
    };
       
  /************************************************************************************************/
  this.cancelEvent = function(e) {
  /************************************************************************************************/
      e.stopPropagation();
      e.preventDefault();
  };
   
  /************************************************************************************************/
  this.doScroll = function(y) {
  /************************************************************************************************/
      this.showThumb();
      this.doc.stop().animate({scrollTop:y},{
          duration:1500,
          specialEasing: {
            scrollTop: 'easeOutQuart'
          },
          step: $.proxy(function(){
             var thumbY = Math.round(this.doc.scrollTop() * (1/this.scrollratio.y));
             this.thumb.css({height:this.thumbheight,top:thumbY});
          },this),
          complete: $.proxy(function() {
            this.hideThumb();
          },this)
      });
    };
    
  /************************************************************************************************/
  this.doScrollTo = function(pos) {
  /************************************************************************************************/
      ny=Math.round(pos * 1/this.scrollratio.y);
      if (ny<0) pos=0;
      var my = this.scrollvaluemax;
      if (ny>my) 
         pos=Math.round(my*this.scrollratio.y);
      this.doScroll(pos);
  };
    
  
  /************************************************************************************************/
  this.doScrollMomentum = function(mom) {
  /************************************************************************************************/
      var dy = mom.ly-mom.ny;
      var tt = ((new Date()).getTime()-mom.lt);
      if (tt<30) {   
        this.doScroll(parseInt((dy*(500/tt))+ this.doc.scrollTop()));
      }
    };
    
    this.init();
  };
  
})( jQuery );
  