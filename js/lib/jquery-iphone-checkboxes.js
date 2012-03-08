(function($){

  /************************************************************************************************/
  $.fn.iphoneStyle = function(opt) {    
  /************************************************************************************************/

    if (typeof opt=="undefined") 
       opt = {};

    this.each(function() {      
      var nice = $(this).data('__iphoneStyle')||false;
      if (!nice) {
        opt.element = $(this);
        nice = new iphoneStyleClass(opt);
        $(this).data('__iphoneStyle',nice);
      }
      else{
      //  nice.onResize();
      }
    });
    
    return this;
  };

  var iphoneStyleClass = function(myopt) {

	 this.settings = {
		  duration:          "slow",                    // Time spent during slide animation
		  checkedLabel:      'ON',                      // Text content of "on" state
		  uncheckedLabel:    'OFF',                     // Text content of "off" state
		  disabledClass:     'iPhoneCheckDisabled',
		  containerClass:    'iPhoneCheckContainer',
		  labelOnClass:      'iPhoneCheckLabelOn',
		  labelOffClass:     'iPhoneCheckLabelOff',
		  handleClass:       'iPhoneCheckHandle',
		  handleCenterClass: 'iPhoneCheckHandleCenter',
		  handleRightClass:  'iPhoneCheckHandleRight'
	 };

     if (myopt||false) {
      for(var a in myopt) {
         this.settings[a] = myopt[a];
      }
     }
    
    /************************************************************************************************/
     this.init = function(  ) {
    /************************************************************************************************/
	 
		  // Initialize the control
		  this.wrapCheckboxWithDivs();
		  this.attachEvents();
		  this.disableTextSelection();
 		  this.optionallyResize('handle'); 
		  this.optionallyResize('container'); 
		  this.initialPosition();
     };
  
  
     /************************************************************************************************/
     this.wrapCheckboxWithDivs = function(  ) {
     /************************************************************************************************/
		var obj = this.settings.element;

		obj.wrap('<div class="' + this.settings.containerClass + '" />');

		this.container = obj.parent();
		
		this.offLabel  = $('<label class="'+ this.settings.labelOffClass +'">' +
							 '<span>'+ this.settings.uncheckedLabel +'</span>' +
						   '</label>').appendTo(this.container);
		this.offSpan   = this.offLabel.children('span');
		
		this.onLabel   = $('<label class="'+ this.settings.labelOnClass +'">' +
							 '<span>'+ this.settings.checkedLabel +'</span>' +
						   '</label>').appendTo(this.container);
		this.onSpan    = this.onLabel.children('span');
		
		this.handle    = $('<div class="' + this.settings.handleClass + '">' +
							 '<div class="' + this.settings.handleRightClass + '">' +
							   '<div class="' + this.settings.handleCenterClass + '" />' +
							 '</div>' +
						   '</div>').appendTo(this.container);
    };
  
    /************************************************************************************************/
    this.disableTextSelection=function() {
    /************************************************************************************************/
      if (!$.browser.msie) { return; }
      // Elements containing text should be unselectable
      $.each([this.handle, this.offLabel, this.onLabel, this.container], function(el) {
        $(el).attr("unselectable", "on");
      });
    };
  
    /************************************************************************************************/
    this.optionallyResize= function(mode) {
    /************************************************************************************************/
      var onLabelWidth  = this.onLabel.width(),
          offLabelWidth = this.offLabel.width(),
          newWidth      = (onLabelWidth < offLabelWidth) ? onLabelWidth : offLabelWidth;

      if (mode == 'container') { 
        newWidth += this.handle.width() + 15; 
      }
      this[mode].css({ width: newWidth });
    };

    /************************************************************************************************/
    this.attachEvents= function() {
    /************************************************************************************************/
		var obj = this.settings.element;
		
		// A mousedown anywhere in the control will start tracking for dragging
		this.container.bind('click', function(event) {        
			obj.attr('checked', !obj.attr('checked'));
			obj.change();
		  });
	  
		// Animate when we get a change event
		obj.change($.proxy(function() {
		  if (obj.is(':disabled')) {
			this.container.addClass(this.settings.disabledClass);
		  } else {
			this.container.removeClass(this.settings.disabledClass);
		  }
		  var new_left = obj.attr('checked') ? this.rightSide : 0;
          this.handle.animate({left: new_left }, this.settings.duration);
		  this.onLabel.animate({width: new_left + 4 }, this.settings.duration);
		  this.offSpan.animate({ marginRight: -new_left },this.settings.duration);
		  this.onSpan.animate({ marginLeft: new_left - this.rightSide }, this.settings.duration);
		},this));
    };
   
    /************************************************************************************************/
    this.initialPosition= function() {
    /************************************************************************************************/
		var obj = this.settings.element;

		this.offLabel.css({ width: this.container.width() - 5 });
	
		var offset = ($.browser.msie && $.browser.version < 7) ? 3 : 6;
		this.rightSide = this.container.width() - this.handle.width() - offset;
	
		if (obj.is(':checked')) {
		  this.handle.css({ left: this.rightSide });
		  this.onLabel.css({ width: this.rightSide + 4 });
		  this.offSpan.css({ marginRight: -this.rightSide });
		} else {
		  this.onLabel.css({ width: 0 });
		  this.onSpan.css({ marginLeft: -this.rightSide });
		}
		
		if (obj.is(':disabled')) {
		  this.container.addClass(this.disabledClass);
		}
     };
    
    this.init();
  };
  
})( jQuery );
