
var CoreRenderer = Class.extend({

  /************************************************************************************************/
  init: function(){
  /************************************************************************************************/
    this.formTemplate =  '<form action="" '+
                         '      id="content_formular" '+
                         '      style="position:absolute;top:0px;left:0px;" '+
                         '      data-controller="${controller}" '+
                         '      data-table="${table}" '+
                         '      data-model="${model}" '+
                         '      data-recordpkey="${recordPkey}" '+
                         '      data-recordcontainer="true" '+
                         ' >'+
                         '</form>';
    
    this.templates = [];

    this.templates["line"] = '<div data-draggable="true" '+
                             '     data-type="${ui.type}" '+
                             '     data-column="" '+
                             '     data-pkey="${ui.id}" '+
                             '     id="${ui.id}" '+
                             '     style="position: absolute;${ui.css} " '+
                             '     class="core_formelement" '+
                             '>'+
                             ' <hr> '+
                             '</div>';
 
    this.templates["title"] ='<div data-draggable="true" '+
                             '     data-type="${ui.type}" '+
                             '     data-column="" '+
                             '     data-pkey="${ui.id}" '+
                             '     id="${ui.id}" '+
                             '     style="position: absolute; ${ui.css}" '+
                             '     class="core_formelement" '+
                             '>'+
                             '${ui.innerHTML}'+
                             '</div>';

    this.templates["label"] ='<div data-draggable="true" '+
                             '     data-type="${ui.type}" '+
                             '     data-column="" '+
                             '     data-pkey="${ui.id}" '+
                             '     id="${ui.id}" '+
                             '     {{html ui.extra_attributes}} '+
                             '     style="position: absolute; ${ui.css}" '+
                             '     class="core_formelement" '+
                             '>'+
                             '${ui.innerHTML}'+
                             '</div>';
                   
    this.templates["image"] ='<image data-draggable="true" '+
                             '     data-type="${ui.type}" '+
                             '     data-column="" '+
                             '     data-pkey="${ui.id}" '+
                             '     id="${ui.id}" '+
                             '     {{html ui.extra_attributes}} '+
                             '     style="position: absolute; ${ui.css}" '+
                             '     class="core_formelement" '+
                             '>'+
                             '${ui.innerHTML}'+
                             '</div>';

    this.templates["input"] = '<input data-draggable="true" '+
                              '     data-type="${ui.type}" '+
                              '     data-column="${ui.column}" '+
                              '     data-pkey="${ui.id}" '+
                              '     data-value="${value}" '+
                              '     value="${value}" '+
                              '     name="${ui.column}" '+
                              '     id="${ui.id}" '+
                              '     style="position: absolute; ${ui.css}" '+
                              '     autocomplete="off" '+
                              '     class="core_formelement" '+
                              '>'+
                              '</input>';
                             
    this.templates["textarea"] = '<textarea data-draggable="true" '+
                              '     data-type="${ui.type}" '+
                              '     data-column="${ui.column}" '+
                              '     data-pkey="${ui.id}" '+
                              '     data-value="${value}" '+
                              '     name="${ui.column}" '+
                              '     id="${ui.id}" '+
                              '     style="position: absolute; ${ui.css}" '+
                              '     autocomplete="off" '+
                              '     class="core_formelement" '+
                              '>'+
                              '${value}'+
                              '</textarea>';
                             
  },

  
  /************************************************************************************************/
  renderForm: function(/*:JSON*/ data){
  /************************************************************************************************/
      var form= $.tmpl(this.formTemplate, data);

  	  $.each(data.form, $.proxy(function(index, element){
          var template = this.templates[element.type];
    	
      	  if(template){
      	     if(data.record)
                form.append( $.tmpl(template, {"value":data.record[element.column], "record":data.record, "ui":element}));
             else
                form.append( $.tmpl(template, {"value":null, "record":null, "ui":element}));
      	  }
      	  else{
      	  	console.log("missing template for:"+element.type);
      	  }

  	  },this));
  	  return form;
  },

 
  /************************************************************************************************/
  renderElements: function(/*:JSON*/ data){
  /************************************************************************************************/
      var result = [];
 	  $.each(data.form, $.proxy(function(index, element){
          var template = this.templates[element.type];
    	
      	  if(template){
      	     if(data.record)
                result.push( $.tmpl(template, {"value":data.record[element.column], "record":data.record, "ui":element}));
             else
                result.push( $.tmpl(template, {"value":null, "record":null, "ui":element}));
      	  }
      	  else{
      	  	console.log("missing template for:"+element.type);
      	  }

  	  },this));
  	  return result;
  }

 
 });
