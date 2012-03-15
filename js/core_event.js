/* ***********************************************************************************************
 * Events which starts with EVENT_* are notifications about previous
 * process actions.
 * This is usefull for components which wants react on record_load or layout change
 * events like the Navigation or the contetn pane.
 *
 * **********************************************************************************************/
var EVENT_NAVIGATION_NAVIGATED        = 'EVENT_NAVIGATION_NAVIGATED';
var EVENT_NAVIGATION_FOLDER_ACTIVATED = 'EVENT_NAVIGATION_FOLDER_ACTIVATED';
var EVENT_NAVIGATION_RECORDS_LOADED   = "EVENT_NAVIGATION_RECORDS_LOADED";
var EVENT_NAVIGATION_FOLDERS_LOADED   = "EVENT_NAVIGATION_FOLDERS_LOADED";
var EVENT_NAVIGATION_REFRESHED        = "EVENT_NAVIGATION_REFRESHED";

var EVENT_DETAIL_MODEL_LOADED   = "EVENT_DETAIL_MODEL_LOADED";
var EVENT_DETAIL_MODEL_CLEARED  = "EVENT_DETAIL_MODEL_CLEARED";
var EVENT_DETAIL_RECORD_LOADED  = "EVENT_DETAIL_RECORD_LOADED";
var EVENT_DETAIL_RECORD_SAVED   = "EVENT_DETAIL_RECORD_SAVED";
var EVENT_DETAIL_RECORD_CLEARED = "EVENT_DETAIL_RECORD_CLEARED";

/* ***********************************************************************************************
 * Events which starts with COMMAND_* are requests to do something like
 * load a dedicated record or switch the layout from prtrait to landscape.
 * 
 * This kind of command delegation is very usefull for events which consumes
 * more than one component.
 *
 * **********************************************************************************************/
var COMMAND_LAYOUT                  = "COMMAND_LAYOUT";
var COMMAND_LAYOUT_LANDSCAPE        = "COMMAND_LAYOUT_LANDSCAPE";
var COMMAND_LAYOUT_PORTRAIT         = "COMMAND_LAYOUT_PORTRAIT";
var COMMAND_LAYOUT_EXPANDED         = "COMMAND_LAYOUT_EXPANDED";
var COMMAND_LAYOUT_CONTENTAREA      = "COMMAND_LAYOUT_CONTENTAREA";

var COMMAND_DESIGNMODE_GLOBAL       = "COMMAND_DESIGNMODE_GLOBAL";
var COMMAND_DESIGNMODE_NAVIGATION   = "COMMAND_DESIGNMODE_NAVIGATION";
var COMMAND_DESIGNMODE_SELECTELEMENT= "COMMAND_DESIGNMODE_SELECTELEMENT";

var COMMAND_NAVIGATION_LOAD        ='COMMAND_NAVIGATION_LOAD';
var COMMAND_NAVIGATION_NAVIGATE    ='COMMAND_NAVIGATION_NAVIGATE';
var COMMAND_NAVIGATION_NAVIGATE_UP ='COMMAND_NAVIGATION_NAVIGATE_UP';
var COMMAND_NAVIGATION_DELETE      ='COMMAND_NAVIGATION_DELETE';
var COMMAND_NAVIGATION_REFRESH     ='COMMAND_NAVIGATION_REFRESH';
var COMMAND_NAVIGATION_LOCK        ='COMMAND_NAVIGATION_LOCK';

var COMMAND_DETAIL_MODEL_LOAD      = "COMMAND_DETAIL_MODEL_LOAD";
var COMMAND_DETAIL_RECORD_LOAD     = "COMMAND_DETAIL_RECORD_LOAD";
var COMMAND_DETAIL_RECORD_SAVE     = "COMMAND_DETAIL_RECORD_SAVE";
var COMMAND_DETAIL_RECORD_REFRESH  = "COMMAND_DETAIL_RECORD_REFRESH";
var COMMAND_DETAIL_RECORD_CLEAR    = "COMMAND_DETAIL_RECORD_CLEAR";
var COMMAND_DETAIL_RECORD_CREATE   = "COMMAND_DETAIL_RECORD_CREATE";
var COMMAND_DETAIL_RECORD_DELETE   = "COMMAND_DETAIL_RECORD_DELETE";

/* ***********************************************************************************************
 * Central method for communication between different javascript objects.
 * This is usefull for decoupled communication.
 * It is possible to create your own eventsId's.....no magic. It's just a string.
 *
 * Fire Event:
 *
 *    coreTrigger(COMMAND_DESIGNMODE_NAVIGATION, [true]);
 *
 *
 * Listen for Event:
 *
 *	  $(document).bind(COMMAND_DESIGNMODE_NAVIGATION, $.proxy(function( flag){
 *	     // do the stuff for enable/disable
 *	  },this));
 *
 * **********************************************************************************************/
function coreTrigger(event, arg){
 //  console.log(event);
 //  if(arg)
 //  	console.log(arg);
   $(document).trigger(event,arg);
}