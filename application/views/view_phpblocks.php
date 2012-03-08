<html>
<head>
<link  type="text/css" rel="stylesheet" href="./css/editor.css">
<link  type="text/css" rel="stylesheet" href="./css/menu.css" />
<link  type="text/css" rel="stylesheet" href="./css/editor_ns.css" />
<link  type="text/css" rel="stylesheet" href="./css/ui-lightness/jquery-ui-1.8.17.custom.css" />
<?php 
  foreach ($plugins as $plugin)
  {
      echo "<link type=\"text/css\" rel =\"stylesheet\" href=\"../plugins/".$plugin->getName()."/plugin.css\"></script>\n";
  }

?>

<script type="text/javascript" src="./javascript/jquery-1.7.1.min.js"></script>
<script type="text/javascript" src="./javascript/jquery-ui-1.8.17.custom.min.js"></script>

<script type="text/javascript" src="./javascript/flow.js"></script>
<script type="text/javascript" src="./javascript/Configuration.js"></script>
<script type="text/javascript" src="./javascript/UUID.js"></script>
<script type="text/javascript" src="./javascript/Canvas.js"></script>
<script type="text/javascript" src="./javascript/PalettePart.js"></script>
<script type="text/javascript" src="./javascript/Application.js"></script>
<script type="text/javascript" src="./javascript/menu/MenuItem.js"></script>
<script type="text/javascript" src="./javascript/command/Command.js"></script>
<script type="text/javascript" src="./javascript/command/CommandSetProperty.js"></script>
<script type="text/javascript" src="./javascript/command/CommandStack.js"></script>
<script type="text/javascript" src="./javascript/command/CommandStackEvent.js"></script>
<script type="text/javascript" src="./javascript/command/CommandStackEventListener.js"></script>
<script type="text/javascript" src="./javascript/block/DropZone.js"></script>
<script type="text/javascript" src="./javascript/block/AbstractBlock.js"></script>
<script type="text/javascript" src="./javascript/block/math/ControlBlock_AbstractMath.js"></script>
<script type="text/javascript" src="./javascript/block/math/ControlBlock_Add.js"></script>
<script type="text/javascript" src="./javascript/block/math/ControlBlock_Divide.js"></script>
<script type="text/javascript" src="./javascript/block/math/ControlBlock_Max.js"></script>
<script type="text/javascript" src="./javascript/block/math/ControlBlock_Min.js"></script>
<script type="text/javascript" src="./javascript/block/math/ControlBlock_Multiply.js"></script>
<script type="text/javascript" src="./javascript/block/math/ControlBlock_RoundUp.js"></script>
<script type="text/javascript" src="./javascript/block/math/ControlBlock_Sqrt.js"></script>
<script type="text/javascript" src="./javascript/block/data/ControlBlock_AbstractData.js"></script>
<script type="text/javascript" src="./javascript/block/data/ControlBlock_UseField.js"></script>
<script type="text/javascript" src="./javascript/block/data/ControlBlock_UseFieldFrom.js"></script>
<script type="text/javascript" src="./javascript/block/data/ControlBlock_SetField.js"></script>
<script type="text/javascript" src="./javascript/block/data/ControlBlock_UseVariable.js"></script>
<script type="text/javascript" src="./javascript/block/data/ControlBlock_DefineVariable.js"></script>
<script type="text/javascript" src="./javascript/block/control/ControlBlock_Start.js"></script>
<script type="text/javascript" src="./javascript/block/control/ControlBlock_If.js"></script>
<script type="text/javascript" src="./javascript/block/dialog/ControlBlock_AbstractUI.js"></script>
<script type="text/javascript" src="./javascript/block/dialog/ControlBlock_Alert.js"></script>
<script type="text/javascript" src="./javascript/block/dialog/ControlBlock_Prompt.js"></script>
<script type="text/javascript" src="./javascript/block/text/ControlBlock_AbstractText.js"></script>
<script type="text/javascript" src="./javascript/block/text/ControlBlock_NULL.js"></script>
<script type="text/javascript" src="./javascript/block/text/ControlBlock_Text.js"></script>
<script type="text/javascript" src="./javascript/block/text/ControlBlock_Join.js"></script>
<script type="text/javascript" src="./javascript/xml/ModelXMLSerializer.js"></script>
<script type="text/javascript" src="./javascript/xml/ModelXMLDeserializer.js"></script>

<script>
// A Path ends always with a "/"
//
flow.Configuration.IMAGE_PATH  = "./css/editor/";
flow.Configuration.GET_FILE    = "../../getDefinition";
flow.Configuration.SAVE_FILE   = "../../saveDefinition";
flow.Configuration.CREATE_FILE = "../../createDefinition";
flow.Configuration.DELETE_FILE = "../../deleteDefinition";
// unused flow.Configuration.GET_FILES   = "../../getFiles";

</script>

<?php 
  foreach ($plugins as $plugin)
  {
      echo "<script type=\"text/javascript\" src=\"../plugins/".$plugin->getName()."/plugin.js\"></script>\n";
  }
?>

<script>

  var app=null;
  var documentId  = 'data/test2';
  
  $(document).ready(function() 
  {
	app = new flow.Application();    
	app.loadDocument(documentId);

    $("#cancel_button").click(function()
    {
        window.parent.location.href= "index.php";
    });

    $("#save_button").click(function()
    {
        app.saveDocument(documentId, function()
        {
            window.parent.location.href= "index.php";
        });
    });

    $("#test_button").click(function()
    {
        app.saveDocument(documentId, function()
        {
            window.open("../demo/formular/run.php?xml="+documentId,"_new");
        });
    });

    /*
    var MyTabs = new Tabs('tabs', {
          start: Tabs.LAST,
          callback: 
          {
                afterOpen: function(panel) {
                },
                isEmpty: function() {
                }
          }
    });
*/
    resize();
  });
  
  
  function resize()
  {
  var width = 0, height = 0;
  if( typeof( window.innerWidth ) == 'number' ) 
  {
    //Non-IE
    width = window.innerWidth;
    height = window.innerHeight;
  } 
  else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) 
  {
    //IE 6+ in 'standards compliant mode'
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  } 
  else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) 
  {
    //IE 4 compatible
    width = document.body.clientWidth;
    height = document.body.clientHeight;
  }

  var toolbarPanel = $("#toolbar");
  var objectPanel = $("#object_panel");
  var editorPanel= $("#scrollarea");
  var tabstrip = $("#tabstrip");
  
  var tool_height = toolbarPanel.height();
  var strip_height = tabstrip.height();
  
  editorPanel.css({width:Math.max(10,width-300),
                   height:Math.max(10,height-tool_height)+"px",
                   top :tool_height,
                   left :302});

  objectPanel.css({width:300,
  height : Math.max(10,height-tool_height),
  top :tool_height,
  left: 0});

  var pane_height = Math.max(10,height-tool_height-strip_height)+"px";
  $(".tab").css({height:pane_height});
}

</script>
</head>
<body id="body" onresize="resize()" onselectstart="return false;" style="overflow:hidden;margin:0px;padding:0px;" onkeydown="">

<div id="toolbar" style="position:absolute;top:0px;width:100%;" >
<button id="save_button">Save</button>
<button id="cancel_button">Cancel</button>
<button id="test_button">Test</button>
</div>


<div id="scrollarea" style="position:absolute;overflow:auto;" >
   <div id="paintarea" style="position:absolute;left:0px;top:0px;width:3000px;height:3000px" >
   </div>
</div>

<div id="object_panel" style="position:absolute" >
<div id="tabs">
        <ul id="tabstrip" class="tabs">
                <li><a href="#tab-link" rel="target_1">Data</a></li>
                <li><a href="#tab-link" rel="target_2">Control</a></li>
                <li><a href="#tab-link" rel="target_4">UI</a></li>
                <li><a href="#tab-link" rel="target_5">Math</a></li>
                <li><a href="#tab-link" rel="target_6">Text</a></li>
                <li><a href="#tab-link" rel="target_7">Messaging</a></li>
        </ul>
        <div id="target_1" class="tab" >
            <ul class="panel_part">
              <li block="flow.ControlBlock_UseVariable" class="palette_part ControlBlock_UseVariable_palette Parameter" ></li>
              <li block="flow.ControlBlock_DefineVariable" class="palette_part ControlBlock_DefineVariable_palette Next Before" ></li>
              <?php 
              foreach ($plugins as $plugin)
              {
              	if($plugin->getEditorGroup()=="data")
              	   echo "<li block=\"".$plugin->getJavascriptClass()."\" class=\"".$plugin->getCSSClass()."\" ></li>\n";
              }
              ?>
            </ul>
        </div>
        <div id="target_2" class="tab" >
            <ul class="panel_part">
              <li block="flow.ControlBlock_If" class="palette_part ControlBlock_If_palette Next Before" ></li>
              <?php 
              foreach ($plugins as $plugin)
              {
              	if($plugin->getEditorGroup()=="control")
              	   echo "<li block=\"".$plugin->getJavascriptClass()."\" class=\"".$plugin->getCSSClass()."\" ></li>\n";
              }
              ?>
            </ul>
        </div>
        <div id="target_4" class="tab" >
            <ul class="panel_part">
              <li block="flow.ControlBlock_Alert" class="palette_part ControlBlock_Alert_palette Next Before"></li>
              <li block="flow.ControlBlock_Prompt" class="palette_part ControlBlock_Prompt_palette Parameter" ></li>
              <?php 
              foreach ($plugins as $plugin)
              {
              	if($plugin->getEditorGroup()=="ui")
              	   echo "<li block=\"".$plugin->getJavascriptClass()."\" class=\"".$plugin->getCSSClass()."\" ></li>\n";
              }
              ?>
            </ul>
        </div>
        <div id="target_5" class="tab" >
            <ul class="panel_part">
              <li block="flow.ControlBlock_Add" class="palette_part ControlBlock_Add_palette Parameter"></li>
              <li block="flow.ControlBlock_Divide" class="palette_part ControlBlock_Divide_palette Parameter"></li>
              <li block="flow.ControlBlock_Max" class="palette_part ControlBlock_Max_palette Parameter"></li>
              <li block="flow.ControlBlock_Min" class="palette_part ControlBlock_Min_palette Parameter"></li>
              <li block="flow.ControlBlock_Multiply" class="palette_part ControlBlock_Multiply_palette Parameter"></li>
              <li block="flow.ControlBlock_RoundUp" class="palette_part ControlBlock_RoundUp_palette Parameter"></li>
              <li block="flow.ControlBlock_Sqrt" class="palette_part ControlBlock_Sqrt_palette Parameter"></li>
              <?php 
              foreach ($plugins as $plugin)
              {
              	if($plugin->getEditorGroup()=="math")
              	   echo "<li block=\"".$plugin->getJavascriptClass()."\" class=\"".$plugin->getCSSClass()."\" ></li>\n";
              }
              ?>
            </ul>
        </div>
        <div id="target_6" class="tab" >
            <ul class="panel_part">
              <li block="flow.ControlBlock_Text" class="palette_part ControlBlock_Text_palette Parameter"></li>
              <li block="flow.ControlBlock_Join" class="palette_part ControlBlock_Join_palette Parameter" ></li>
              <?php 
              foreach ($plugins as $plugin)
              {
              	if($plugin->getEditorGroup()=="text")
              	   echo "<li block=\"".$plugin->getJavascriptClass()."\" class=\"".$plugin->getCSSClass()."\" ></li>\n";
              }
              ?>
            </ul>
        </div>
        <div id="target_7" class="tab" >
            <ul class="panel_part">
              <?php 
              foreach ($plugins as $plugin)
              {
              	if($plugin->getEditorGroup()=="messaging")
              	   echo "<li block=\"".$plugin->getJavascriptClass()."\" class=\"".$plugin->getCSSClass()."\" ></li>\n";
              }
              ?>
            </ul>
        </div>
    </div>
</div>
 
</body>


