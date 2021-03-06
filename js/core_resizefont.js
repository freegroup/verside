var CoreResizeFont = Class.extend({

  /************************************************************************************************/
  init: function(element){
  /************************************************************************************************/
	 this.element = element;
  },

  /************************************************************************************************/
  updatePosition: function(){
  /************************************************************************************************/
	 this.element.fontfit(400);
     var fontSize = this.element.css("fontSize");
     var css={"font-size":fontSize};
	 var width = this._textWidth(this.element.text(), css)+5;
	 this.element.css({"width":width});
  },
  

  
  /************************************************************************************************/
  updateElement: function(diffLeft, diffTop){
  /************************************************************************************************/
  },

  /************************************************************************************************/
  remove: function(){
  /************************************************************************************************/
  },
  
  
  /************************************************************************************************/
  _textWidth: function(text, css){
  /************************************************************************************************/
    var calc = $('<span style="display:none"></span>');
    calc.text(text);
    calc.css(css);
    $('body').append(calc);
    var width = $('body').find('span:last').width();
    $('body').find('span:last').remove();
    return parseInt(width);
  }

});



