<html>
<head>
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="viewport" content="width=device-width, maximum-scale=1.0" />
<link rel="apple-touch-icon-precomposed" href="images/icon.png"/>  
<link rel="apple-touch-icon" href="images/icon.png"/>  
<link rel="apple-touch-startup-image" href="images/splash.png" />  
<title>Verside</title>
<base href="<?php echo base_url() ?>" />

<link type="text/css" rel="stylesheet" href="css/aristo/jquery-ui-1.8.16.custom.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.stepy.css"  />
<link type="text/css" rel="stylesheet" href="css/jquery.jgrowl.css"  />
<link type="text/css" rel="stylesheet" href="css/core_styles.css" />
<link type="text/css" rel="stylesheet" href="css/jquery-iphone-checkboxes.css" />
<link type="text/css" rel="stylesheet" href="css/jquery.selectbox.css" />
<link type="text/css" rel="stylesheet" href="css/jquery-reveal.css" />

<link type="text/css" rel="stylesheet/less" href="css/core_styles.less" />
<link type="text/css" rel="stylesheet/less" href="css/core_webpad.less" media="only screen and (max-device-width: 1024px)" />

<script type="text/javascript" src="js/lib/jquery-1.6.4.js"></script>
<script type="text/javascript" src="js/lib/jquery-ui-1.8.16.custom.min.js"></script>
<script type="text/javascript" src="js/lib/jquery-tmpl.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_caret.js"></script>
<script type="text/javascript" src="js/lib/jquery-autogrow.js"></script>
<script type="text/javascript" src="js/lib/jquery-blockUI.js"></script>
<script type="text/javascript" src="js/lib/jquery-filedrop.js"></script>
<script type="text/javascript" src="js/lib/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/lib/jquery.stepy.js"></script>
<script type="text/javascript" src="js/lib/jquery.layout.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_fontfit.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_bounds.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_update_on_server.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_style.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_nicescroll.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_scrollcrumb.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_touch_punch.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_ants.js"></script>
<script type="text/javascript" src="js/lib/jquery-core_mousein.js"></script>
<script type="text/javascript" src="js/lib/jquery-jgrowl.js"></script>
<script type="text/javascript" src="js/lib/jquery-selectbox.js"></script>
<script type="text/javascript" src="js/lib/jquery-jswipe.js"></script>
<script type="text/javascript" src="js/lib/jquery-scrollintoview.js"></script>
<script type="text/javascript" src="js/lib/jquery-easing.1.3.js"></script>
<script type="text/javascript" src="js/lib/jquery-iphone-checkboxes.js"></script>
<script type="text/javascript" src="js/lib/jquery-longclick.js"></script>
<script type="text/javascript" src="js/lib/jquery-reveal.js"></script>
<script type="text/javascript" src="js/lib/less-1.2.2.js"></script>
<script type="text/javascript" src="js/lib/Class.js"></script>

<script type="text/javascript" src="js/core_backend.js"></script>
<script type="text/javascript" src="js/core_renderer.js"></script>
<script type="text/javascript" src="js/core_event.js"></script>
<script type="text/javascript" src="js/core_growl.js"></script>
<script type="text/javascript" src="js/core_layout_landscape.js"></script>
<script type="text/javascript" src="js/core_layout_portrait.js"></script>
<script type="text/javascript" src="js/core_layout.js"></script>
<script type="text/javascript" src="js/core_ui_editor.js"></script>
<script type="text/javascript" src="js/core_dialog_addtable.js"></script>
<script type="text/javascript" src="js/core_dialog_addfolder.js"></script>
<script type="text/javascript" src="js/core_dialog_phpblocks.js"></script>
<script type="text/javascript" src="js/core_navigation.js"></script>
<script type="text/javascript" src="js/core_contentpane.js"></script>
<script type="text/javascript" src="js/core_filterpanel.js"></script>
<script type="text/javascript" src="js/core_toolbar.js"></script>
<script type="text/javascript" src="js/core_application.js"></script>
<script type="text/javascript" src="js/core_resizehandle.js"></script>
<script type="text/javascript" src="js/core_resizehandle_w.js"></script>
<script type="text/javascript" src="js/core_resizehandle_e.js"></script>
<script type="text/javascript" src="js/core_resizehandle_n.js"></script>
<script type="text/javascript" src="js/core_resizehandle_s.js"></script>
<script type="text/javascript" src="js/core_resizehandle_nw.js"></script>
<script type="text/javascript" src="js/core_resizehandle_sw.js"></script>
<script type="text/javascript" src="js/core_resizehandle_se.js"></script>
<script type="text/javascript" src="js/core_resizehandle_ne.js"></script>
<script type="text/javascript" src="js/core_resizeborder.js"></script>
<script type="text/javascript" src="js/core_resizefont.js"></script>
<script type="text/javascript" src="js/core_resizefont_input.js"></script>
<script type="text/javascript" src="js/core_navigation_properties_panel.js"></script>
<script type="text/javascript" src="js/core_navigation_filter_panel.js"></script>
<script type="text/javascript" src="js/core_contentpane_properties_panel.js"></script>

<script>
$(document).ready(function() {

	var app = new CoreApplication();
    $(document).bind("contextmenu",function(e){
        return false;
    });
});
</script>

</head>
<body >

    <div id="container_toolbar" class="ui-widget-header ui-layout-north">
       My Application
    </div>

    <div id="container_application" class="pane ui-layout-center">
      <div id="container_root" >

       <div id="container_navigation" class="">
          <div id="container_navigation_firstchild" ></div>
       </div>
   
       <div id="xxx" style="height:20px;padding:0px;margin:0px;"  class="ui-layout-center">

          <div id="container_detail_toolbar" class="toolbar ui-widget-header ui-layout-north">
             <button class="toolbar_button" id="button_save_record">Save</button>
             <button class="toolbar_button" id="button_new_record">New</button>
             <button class="toolbar_button" id="button_delete_record">Delete </button>
       </div>

       <div id="container_detail" class="pane ui-widget-content ui-layout-center">
       </div>
      </div>
    </div>
    </div>

    <div id="dialogs" class="reveal-modal"></div>

</body>
</html>