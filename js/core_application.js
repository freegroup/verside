
String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}

String.prototype.endsWith = function(str)
{return (this.match(str+"$")==str)}

String.prototype.firstUpperCase = function() 
{ return this.charAt(0).toUpperCase() + this.slice(1); }

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

var _isWebPad = null;
function isWebPad(){
    if(_isWebPad!==null)
	  return _isWebPad;
	  
    _isWebPad= (
        //Detect iPhone
        (navigator.platform.indexOf("iPhone") != -1) ||
        //Detect iPod
        (navigator.platform.indexOf("iPod") != -1)||
        //Detect iPad
        (navigator.platform.indexOf("iPad") != -1)
    );
	return _isWebPad;
}

var CoreApplication = Class.extend({

  /************************************************************************************************/
  init: function(containerId){
  /************************************************************************************************/
	this.layout = new CoreLayout();
	this.navigation = new CoreNavigation();
	this.toolbar = new CoreToolbar();
	this.contentpane = new CoreContentpane();
	this.editor = new CoreUiEditor();
	
	this.navigation.load();
	
//	less.watch();

//   coreTrigger(COMMAND_LAYOUT_PORTRAIT);
  }

});
