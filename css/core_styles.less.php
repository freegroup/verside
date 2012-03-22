@import "elements.less";

<?php
$isiPad = (bool) strpos($_SERVER['HTTP_USER_AGENT'],'iPad');

if($isiPad)
   echo '@import "core_webpad.less";';
else
   echo '@import "core_desktop.less";';
?>

/******************************************************************
 * Global Settings for the common page
 ******************************************************************/
body{
 padding:0px;
 margin:0px;
 top:0px;
 left:0px;
 height:100%;
 font-family:@baseFontFamily;
 font-size:@baseFontSize;
 position:absolute;
}

.pane{
 padding:0px !important;
 margin:0px !important;
}

/********************************************************************************************************
 * Settings for the layout
 *******************************************************************************************************/
/* Root container of the application  */
#container_root{
 height:100%;
 width:100%;
 -webkit-tap-highlight-color: rgba(0,0,0,0); 
}


/* Container for the navigation.      */
#container_navigation{
 border:1px solid #D6D9D8;
 height: 100%;
 width: 100%;
 padding:0px;
 margin:0px;
 -webkit-tap-highlight-color: rgba(0,0,0,0); 
 background: url("../images/background.png");
}

#container_navigation_firstchild{
 height: 100%;
 padding:0px;
 overflow:hidden;
 border:0px;
}

/* Container for the detail view of records */
#container_detail{
-webkit-tap-highlight-color: rgba(0,0,0,0); 
 background: none repeat scroll 0 0 @formularBackgroundColor;
}

#container_ui_palette{
 min-width: 300px;
}

.button_layout_horizontal{
 color:green;
 background:url("../images/layout_horizontal.png") repeat-x scroll 50% 50% transparent !important;
}


.core_icon_preferences{
 background-image:url("../images/preferences.png") !important;
 margin-left: -14px !important;
 margin-top: -14px !important;
 height:26px;
 width:26px;
}

.button_glow{
  text-shadow:-1px -1px white, 1px 1px #333333 !important;
}

.button_back_icon{
 background-image:url("../images/media-backward_24.png") !important;
 margin-left: -14px !important;
 margin-top: -14px !important;
 height:26px;
 width:26px;
}

.button_fastback_icon{
 background-image:url("../images/media-fast-backward_24.png") !important;
 margin-left: -14px !important;
 margin-top: -14px !important;
 height:26px;
 width:26px;
}


/******************************************************************
 * SplitPane bar / Resizer
 ******************************************************************/
.ui-layout-resizer{ /* all 'resizer-bars' */
 background:darken(@baseBackgroundColor,12%);
 border-width:0;
}


/******************************************************************
 * Buttongroup with a group of cascading buttons
 ******************************************************************/
.toolbar{
 padding: @toolbarPadding !important;
 overflow:hidden !important;
 height:@toolbarHeight;
 .gradient(@toolbarBackgroundColorStart, @toolbarBackgroundColorStart, @toolbarBackgroundColorEnd,  @toolbarHeight);
}

/* Buttonschaltfläche */
.toolbar_button{
 min-width:4.4em;
 min-height: (@toolbarHeight - (@toolbarPadding * 2));
 .gradient(@toolbarBackgroundColorStart, @toolbarBackgroundColorStart, @toolbarBackgroundColorEnd,  @toolbarHeight);
 -webkit-box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset !important;
 -moz-box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset !important;
 box-shadow: 0 1px 0 rgba(255,255,255,0.6) inset !important;
 border: 1px solid darken(@toolbarBackgroundColorEnd,5%) !important;
 border-radius: @toolbarButtonRadius @toolbarButtonRadius @toolbarButtonRadius @toolbarButtonRadius !important;
}

/* Label eines Button*/
.toolbar_button span{
 color:@toolbarButtonFontColor !important;
 letter-spacing:@toolbarButtonLetterSpacing !important;
 cursor: default !important;
}


.button_add{
 background-color: @toolbarButtonColorAdd;
 background-image: linear-gradient(bottom, @toolbarButtonColorAdd 50%, darken(@toolbarButtonColorAdd,2%)  74%) !important;
 background-image: -o-linear-gradient(bottom,  @toolbarButtonColorAdd 50%, darken(@toolbarButtonColorAdd,2%) 74%) !important;
 background-image: -moz-linear-gradient(bottom,  @toolbarButtonColorAdd 50%, darken(@toolbarButtonColorAdd,2%) 74%) !important;
 background-image: -webkit-linear-gradient(bottom, @toolbarButtonColorAdd 50%, darken(@toolbarButtonColorAdd,2%) 74%) !important;
 background-image: -ms-linear-gradient(bottom, @toolbarButtonColorAdd 50%, darken(@toolbarButtonColorAdd,2%) 74%) !important;
 border: 1px solid darken(@toolbarButtonColorAdd,2%) !important;
 box-shadow:none !important;
}

.button_add .ui-button-text{
 font-family:@baseFontFamily !important;
 text-shadow:none !important;
 font-weight: normal !important;
 color:white !important;
}

.button_ok{
 background-color: @toolbarButtonColorOk;
 background-image: linear-gradient(bottom, @toolbarButtonColorOk 50%, darken(@toolbarButtonColorOk,2%)  74%) !important;
 background-image: -o-linear-gradient(bottom,  @toolbarButtonColorOk 50%, darken(@toolbarButtonColorOk,2%) 74%) !important;
 background-image: -moz-linear-gradient(bottom,  @toolbarButtonColorOk 50%, darken(@toolbarButtonColorOk,2%) 74%) !important;
 background-image: -webkit-linear-gradient(bottom, @toolbarButtonColorOk 50%, darken(@toolbarButtonColorOk,2%) 74%) !important;
 background-image: -ms-linear-gradient(bottom,@toolbarButtonColorOk 50%, darken(@toolbarButtonColorOk,2%) 74%) !important;
 border: 1px solid darken(@toolbarButtonColorOk,5%) !important;
 box-shadow:none !important;
}
.button_ok .ui-button-text{
 font-family: @baseFontFamily !important;
 text-shadow:none !important;
 font-weight: normal !important;
 color:white !important;
}

.button_delete{
 background-color: @toolbarButtonColorDelete;
 background-image: linear-gradient(bottom,  @toolbarButtonColorDelete 50%, darken(@toolbarButtonColorDelete,2%)  74%) !important;
 background-image: -o-linear-gradient(bottom,   @toolbarButtonColorDelete 50%, darken(@toolbarButtonColorDelete,2%) 74%) !important;
 background-image: -moz-linear-gradient(bottom,  @toolbarButtonColorDelete 50%, darken(@toolbarButtonColorDelete,2%) 74%) !important;
 background-image: -webkit-linear-gradient(bottom, @toolbarButtonColorDelete 50%, darken(@toolbarButtonColorDelete,2%) 74%) !important;
 background-image: -ms-linear-gradient(bottom,  @toolbarButtonColorDelete 50%, darken(@toolbarButtonColorDelete,2%)  74%) !important;
 border: 1px solid darken(@toolbarButtonColorDelete,5%) !important;
 box-shadow:none !important;
}

.button_delete .ui-button-text{
 font-family: @baseFontFamily !important;
 text-shadow:none !important;
 font-weight: normal !important;
 color:white !important;
}

.button_right_align{
 float:right;
}


/********************************************************************************************************
 * Settings for the UI Editor of the form
 *******************************************************************************************************/
.resize_handle{
  position:absolute;
 .resizeHandle();
}

.resize_handle_N{
 .resizeHandleN();
}
.resize_handle_NE{
 .resizeHandleNE();
}
.resize_handle_E{
 .resizeHandleE();
}
.resize_handle_SE{
 .resizeHandleSE();
}
.resize_handle_S{
 .resizeHandleS();
}

.resize_handle_SW{
 .resizeHandleSW();
}
.resize_handle_W{
 .resizeHandleW();
}

.resize_handle_NW{
 .resizeHandleNW();
}

.resize_border{
 position:absolute;
 padding:0px;
 margin:0px;
 overflow:hidden;
}

.core_formelement_designmode{
border:1px dashed #88bfe8 !important;
border-width:1px !important;
cursor:move;
}

.core_navigation_designmode{
border:1px dashed #88bfe8 !important;
border-width:1px !important;
cursor:move;
}


.ui-draggable-helper{
 width:200px;
}


/******************************************************************
 * Styles for the property panel of the navigation properties
 ******************************************************************/
#dialog_navigation_properties{
 border:0px;
 border-right:1px solid @dialogBorderColor;
 border-bottom:1px solid @dialogBorderColor;
 width:@dialogLeftDockWidth;
 left:-@dialogLeftDockWidth;
 height:90%;
 position:relative;
 overflow:visible;
 top:0px;
 box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
 .gradient(@dialogBackgroundColorStart, @dialogBackgroundColorStart, @dialogBackgroundColorEnd);
 .border-radius(@dialogRadius, @dialogRadius, 0, 0);
}


/******************************************************************
 * Styles for the property panel of the navigation filter
 ******************************************************************/
#dialog_navigation_filter{
 border:0px;
 border-right:1px solid @dialogBorderColor;
 border-bottom:1px solid @dialogBorderColor;
 width:@dialogLeftDockWidth;
 left:-@dialogLeftDockWidth;
 height:90%;
 position:relative;
 overflow:visible;
 top:0px;
 box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
 .gradient(@dialogBackgroundColorStart, @dialogBackgroundColorStart, @dialogBackgroundColorEnd);
 .border-radius(@dialogRadius, @dialogRadius, 0, 0);
}

.dialog_navigation_filter_constraint_group{
 background-color: rgba(5, 5, 5, 0.1);
 border: 1px solid rgba(25, 25, 25, 0.2);
 display: inline-block;
 margin-bottom: 20px;
 width: 100%;
}

.dialog_navigation_filter_constraint_pane{
 float:left;
 margin:10px;
 width:@dialogLeftDockWidth - 110;
}

.dialog_navigation_filter_action_pane{
 float:right;
 margin:10px;
}

.filterentry_remove{
 width:40px;
}

.filterentry_column{
 width:(( @dialogLeftDockWidth - 110) / 3 * 2 )- 10;
}

.filterentry_operation{
 width:(( @dialogLeftDockWidth - 110) / 3 ) - 5;
}

.filterentry_constraint{
 -moz-box-sizing: border-box;
 background: none repeat scroll 0 0 #FAFAFA;
 border-color: #C6C6C6 #DADADA #EAEAEA;
 border-radius: 4px 4px 4px 4px;
 border-style: solid;
 border-width: 1px;
 font-family: inherit;
 padding-left: 7px;
 vertical-align: middle;
 height:25px;
 font-size:1.2em;
 width:100%;
}

.dialog_navigation_filter_constraint_group select {
 background: none repeat scroll 0 0 #FAFAFA;
 border-color: #C6C6C6 #DADADA #EAEAEA;
 border-radius: 4px 4px 4px 4px;
 font-family: inherit;
 -moz-box-sizing: border-box;
 padding-left:5px;
 border-style: solid ;
 border-width: 1px;
 vertical-align: middle;
 height:25px;
 font-size:1.2em;
}


/******************************************************************
 * Styles für die Dialoge
 ******************************************************************/
.dialog_header{
 margin-bottom:10px;
 font-family: @baseFontFamily;
 font-size: @dialogHeaderFontSize;
 font-weight: normal;
 text-shadow: 0 1px 0 #000000;
 color: #f0f0f0 !important;
}
 
.dialog_pane{
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
 .gradient(@dialogBackgroundColorStart, @dialogBackgroundColorStart, @dialogBackgroundColorEnd);
 .border-radius(0,@dialogRadius, @dialogRadius,0);
}

.dialog_content{
 padding:@dialogContentPadding;
}

.dialog_content_header{
 padding-left:@dialogContentPadding;
 padding-top:@dialogContentPadding;
}

.dialog_label{
 font-family: @baseFontFamily;
 font-size: @dialogFontSize;
 color: #f0f0f0 !important;
 margin-bottom:2px;
}

.dialog_input{
 font-family: @baseFontFamily;
 font-size: @dialogFontSize;
 color: @baseFontColor !important;
 margin-bottom:2px;
 height: @dialogInputHeight;
 border-color: #C6C6C6 #DADADA #EAEAEA;
 border-radius: 4px 4px 4px 4px;
 font-family:@baseFontFamily;
 -moz-box-sizing: border-box;
 padding-left:7px;
 border-style: solid ;
 border-width: 1px;
 vertical-align: middle;
}

.dialog_validateError{
 color:@dialogErrorColor;
 font-size:@dialogErrorFontSize;
 padding-top:5px;
}

/******************************************************************
 * Styles für Eingabemaske/Formular des Benutzer
 ******************************************************************/

.input_dirty{
 background: url(../images/dirty_tick.png) right top  no-repeat @formularInputBackgroundColor !important;
}

form input.core_formelement,
form textarea.core_formelement, 
form select.core_formelement {
 background: none repeat scroll 0 0 @formularInputBackgroundColor;
 border-color: #C6C6C6 #DADADA #EAEAEA;
 border-radius: 4px 4px 4px 4px;
 font-family:@baseFontFamily;
 -moz-box-sizing: border-box;
 padding-left:7px;
 border-style: solid ;
 border-width: 1px;
 vertical-align: middle;
}

form input.core_formelement[readonly=readonly]{
 border-width: 0px;
}

.ui-sortable-helper{
 background-color:white;
}


/******************************************************************
 * Buttongroup with a group of cascading buttons
 ******************************************************************/
.core_buttonbar {
 display: -webkit-box;
 -webkit-box-orient: horizontal;
 -webkit-box-pack:justify;
 -webkit-box-sizing: border-box;
 display: -moz-box;
 -moz-box-orient: horizontal;
 -moz-box-pack:justify;
 -moz-box-sizing: border-box;
 width:100%;
 border-radius: @paletteButtonGroupRadius;
 border: 0px !important;
 font-size:12px;
 line-height:@paletteButtonGroupHeight;
 height:@paletteButtonGroupHeight;
}

.core_buttonbar_button {
 display: block;
 -webkit-box-flex: 1;
 -moz-box-flex: 1;
 text-align: center;
 color: @baseFontColor;
 cursor:pointer;
 border-left: none !important;
 border-top: none !important;
 border-bottom: none !important;
 border-right: solid 1px lighten(@baseFontColor,5%) !important;
 font-size:12px;
}

.core_buttonbar_button.leftEnd {
 .border-radius(0,0,@paletteButtonGroupRadius, @paletteButtonGroupRadius);
}

.core_buttonbar_button.rightEnd {
 .border-radius(@paletteButtonGroupRadius, @paletteButtonGroupRadius,0,0);
}

.core_buttonbar_button.ui-state-active{
}    
    
/******************************************************************
 * Einstellungen der PropertyViews im Editmodus der "Form".
 ******************************************************************/
.property_container{
 padding:5px;
 padding-bottom:15px;
}

.property_container .ui-widget-content{
 border : 0px !important;
}

.property_list_entry{
 white-space:nowrap;
 padding: 5px 20px;
 cursor:pointer;
 border-color: #FFFFFF #D9D9D9 #D9D9D9;
 border-style: solid;
 border-width: 1px 1px 1px 0;
 border-right:0px;
 border-top:0px;
 font-size: @palettePropertyListFontSize;
 line-height: @palettePropertyListFontSize * 1.1;
}


/******************************************************************
 * TrashCan im Editomodus der Form
 ******************************************************************/
#recycle_bin{
position:absolute;
top:120px;
right:2px;
width:62px;
height:62px;
border:2px solid rgb(71,134,237);
background: url("../images/trash.png") no-repeat  transparent !important;
}

#recycle_bin.fixed{
 position: fixed;
 right: 220px;
 top: 150px;
}


#recycle_bin.hover{
-moz-border-radius: 8px;
-webkit-border-radius: 8px;
border-radius: 8px;
-moz-box-shadow: 0px 0px 40px rgb(71,134,237);
-webkit-box-shadow: 0px 0px 40px rgb(71,134,237) ;
box-shadow: 0px 0px 40px rgb(71,134,237);
}


/******************************************************************
 * Umschalter (TABS) der einzelenen PropertyPanes im Edimodus der Form
 ******************************************************************/
#palette_toolbar{
 padding:0px !important;
 margin:0px;
 overflow:hidden;
}

.toolbar_segment{
 display:inline-block;
 text-align:center;
 height:100%;
 float:left;
 border:0px;
 border-left:1px solid darken(@paneTabBackgroundColor,15%);
 border-top:2px solid darken(@paneTabBackgroundColor,10%);
 cursor:pointer;
 font-size: @paneTabFontSize;
 line-height: @paneTabFontSize;
 padding-top:(@toolbarHeight / 2) - (@paneTabFontSize - 2) + 3;
 background:@paneTabBackgroundColor;
 color:@paneTabFontColor;
 font-weight:normal;
}

.toolbar_segment.ui-state-active{
 background:@paneActiveTabBackgroundColor url("../images/background_dreieck.png") no-repeat 50% -44px;
 color:@paneActiveTabFontColor;
 line-height:@paneTabFontSize;
 border:0px;
 border-left:1px solid darken(@paneTabBackgroundColor,15%);
 font-weight:normal;
 letter-spacing:1px;
}

.toolbar_segment:last-child{
}


/******************************************************************
 * Palette im DesignMode der Form
 ******************************************************************/
#palette_pane_fields{
 background:url("../images/background.png") repeat scroll 0 0 transparent;
}

#palette_pane_properties{
 background:url("../images/background.png") repeat scroll 0 0 transparent;
}

#palette_pane_widget{
 background:url("../images/background.png") repeat scroll 0 0 transparent;
}

.palette_element_ui{
 cursor:move;
 padding:5px;
 margin:5px;
 margin-left:10px;
 margin-right:10px;
 white-space: nowrap;
 box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);
 height:@paletteElementOuterHeight;
 line-height:@paletteElementOuterHeight;
 background: none repeat scroll 0 0  #303030;
 color:@paletteElementColor;
 font-weight:normal;
 font-size:@paletteUIElementFontSize;
}

.palette_element_ui .ui-icon{
 width:50px;
 height:@paletteElementImageHeight;
 top:(@paletteElementOuterHeight / 2)- (@paletteElementImageHeight / 2);
 position:relative;
 margin-right:10px;
}

.palette_element_ui[data-type="input"] .ui-icon{
 background: url("../images/palette_input.png") no-repeat scroll 0 0 transparent;
}


.palette_element_ui[data-type="line"] .ui-icon{
 background: url("../images/palette_line.png") no-repeat scroll 0 0 transparent;
}


.palette_element_ui[data-type="title"] .ui-icon{
 background: url("../images/palette_title.png") no-repeat scroll 0 0 transparent;
}

.palette_element_ui[data-type="area"] .ui-icon{
 background: url("../images/palette_area.png") no-repeat scroll 0 0 transparent;
}


#property_font_verdana{
 font-family:verdana;
}

#property_font_curier{
 font-family:"Courier New";
}

#property_font_georgia{
 font-family:Georgia;
}

#property_font_andale_mono{
 font-family:"Andale Mono ";
}

#property_font_arial{
 font-family:Arial;
}

#property_font_trebuchet{
 font-family:"Trebuchet MS";
}

#property_font_bold{
 font-weight:bold;
 font-size:1.2em;
}

#property_font_italic{
 font-style:italic;
 font-size:1.2em;
}

#property_font_underline{
 text-decoration:underline;
 font-size:1.2em;
}

#property_font_sizeBigger{
 font-size: 1.6em;
 line-height: 1.6em;
 padding: 3px;
}

#property_font_sizeSmaller{
}

/******************************************************************
 * Columnnavigation f�r Landscape und Portrait
 ******************************************************************/
.columnnav_panel_portrait{
 border-right: 1px solid #D6D9D8;
 float: left;
 height:100%;
 overflow-x: hidden;
 overflow-y: auto;
 min-width: 200px;
 z-index:20;
 position:relative; /*requried for the stacking context of the z-ordering*/
}

.columnnav_panel_landscape{
 border-right: 1px solid #D6D9D8;
 float: left;
 height:100%;
 overflow-x: hidden !important;
 overflow-y: hidden !important;
 min-width: 200px;
 z-index:20;
 position:relative; /*requried for the stacking context of the z-ordering*/
}


.columnnav_list{
 padding:0px;
 margin:0px;
 -webkit-perspective: 1000;
 -webkit-backface-visibility: hidden;
}


.columnnav_listentry{
 list-style: none outside none;
 white-space:nowrap;
 padding: 5px @applicationLeftPadding;
 height:@navigationListEntryHeight;
 cursor:default;
 border-top: 1px solid rgb(75,75,75) !important;
 border-bottom: 1px solid  rgba(37,37,40, 0.5) !important;
 border-width: 1px 1px 1px 0;
 border-right:0px;
 color: @navigationListFontColor;
}

.columnnav_listentry:first-child{
 border-top: 0px !important;
}

.columnnav_listentry.ui-state-active{
 background: url("../images/background_bright.png") repeat scroll 0 0 transparent;
 color: @navigationListActiveFontColor;
}

.columnnav_listentry_label{
 float:left;
 overflow:hidden;
 text-overflow: ellipsis;
 font-size:@navigationListEntryFontSize !important;
 text-shadow: 1px 1px 1px #101010;
 letter-spacing:1px;
}


.columnnav_listentry_counter{
 float:right;
 background-color: rgba(255, 255, 255, 0.1);
 border: 1px solid #9F9F9F;
 border-radius: 5px 5px 5px 5px;
 color: #9F9F9F;
 font-weight: bold;
 height: 18px;
 line-height: 18px;
 position: relative;
 text-align: center;
 top: 0;
 width: 16px;
}

.columnnav_panel{
 border-right: 1px solid #D6D9D8;
 float: left;
 height:100%;
 overflow-x: hidden;
 overflow-y: auto;
 min-width: 100px;
 z-index:20;
 position:relative; /*requried for the stacking context of the z-ordering*/
 box-shadow:0 3px 5px rgba(0, 0, 0, 0.15) inset;
 border-top:1px solid rgb(47,47,47);
}


/********************************************************************************************************
 * Settings for the Teaser/Header
 *******************************************************************************************************/
#teaser{
 background: url("../images/header.jpg") repeat-x scroll 50% 50% #32323D;
 border: 0px;
 font-size: @teaserFontSize;
 height: @teaserHeight;
 line-height: @teaserHeight;
 margin-bottom: 15px;
 color: @teaserFontColor !important;
 font-weight:normal;
 letter-spacing:2px;
 -webkit-tap-highlight-color: rgba(0,0,0,0); 
 padding-left: @applicationLeftPadding !important;
}

#logout{
 float:right;
 font-size: @baseFontSize;
 margin-right: 20px;
 border-bottom:1px solid @teaserFontColor;
 margin-top: 5px;
 height: @teaserHeight / 2;
 line-height: @teaserHeight / 2;
 cursor:pointer;
}

/********************************************************************************************************
 * Settings for the toolbar in the Column navigation
 *******************************************************************************************************/
#navigation_toolbar{
 padding-left: @applicationLeftPadding !important;
}


#navigation_toolbar_actions{
 box-shadow:0px 0px 20px #101010
}


/******************************************************************
 * Header im Landscape Mode
 ******************************************************************/
#navigation_header_landscape{
 left: -@toolbarPadding;
 position: absolute;
 top: @toolbarHeight - 1; /* 2. Zeile der Toolbar um die H�he der Toolbar nach unten legen */
 width: 100%;
 padding:10px !important;
 background: url("../images/background_dark.png") repeat scroll 0 0 transparent;
 color: @navigationListHeaderFontColor;
 font-weight:normal;
 letter-spacing:2px;
 font-size:@navigationListHeaderFontSize;
}

#navigation_header_landscape div{
 position: absolute;
 top: ((@toolbarHeight / 2) - (@navigationListEntryFontSize / 1.5 ));
 padding-left:@applicationLeftPadding + @toolbarPadding;
}


/********************************************************************************************************
 * Settings for the breadcrumb in the portrait layout mode
 *******************************************************************************************************/
.breadcrumb{
 padding: 0px !important;
 overflow:hidden !important;
 font-size:@breadcrumbFontSize;
 height:@breadcrumbHeight;
}

.breadcrumb_delimiter{
 opacity: 0.4;
 overflow: hidden;
 padding: 0px;
 line-height:@breadcrumbHeight;
 text-overflow: ellipsis;
 white-space:nowrap;
 display: inline-block; /* required to set a width*/
 background: url("../images/breadcrumb.png") no-repeat scroll 20px top transparent;
 width: 32px;
}

.breadcrumb_link{
 overflow: hidden;
 padding: 0 0 0 10px;
 line-height:@breadcrumbHeight;
 text-overflow: ellipsis;
 white-space:nowrap;
 display: inline-block; /* required to set a width*/
 color: #909090;
 cursor:pointer;
}

