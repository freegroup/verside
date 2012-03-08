/**
 **
 ** This file is part of @APPLICATIONNAME@ @VERSION@.
 **
 ** Andreas Herz proprietary/confidential. Use is subject to license terms.
 **
 ** Unauthorized redistribution of this file are strictly forbidden.
 **
 ** Copyright (c) 2011 by Andreas Herz, Fichtenstrasse 70,
 ** 68535 Edingen Neckarhausen, Germany. All rights reserved.
 **
 **/

var flow= {};

function urlParam(/*:String*/ paramName )
{
  paramName = paramName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+paramName+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results === null )
  {
    return "";
  }
  return results[1];
}



function TransparentMessage(/*:String*/ msg)
{
    this.msg = msg;
}

/**
 *
 *
 **/
TransparentMessage.prototype.show=function()
{
      var content = $("body");

      this.center = document.createElement("center");
      this.center.id ="transparentMessage";
      this.center.style.padding="20px";
      this.center.style.position ="absolute";
      this.center.style.top ="0px";
      this.center.style.width ="100%";
      this.center.style.opacity="0.001";
      this.center.style.filter = "alpha(opacity=1)";

      var jacob_window = document.createElement("div");
      this.center.appendChild(jacob_window);
      jacob_window.innerHTML=this.msg;
      jacob_window.className ="transparent_message";
      jacob_window.style.backgroundColor="#8CC73F";
      jacob_window.style.color="white";
      jacob_window.style.width="300px";
      jacob_window.style.fontWeight="bold";
      jacob_window.style.fontSize="15pt";
      jacob_window.style.position="relative";
      content.appendChild(this.center);
      var x= new fx.Opacity( 'transparentMessage',{duration:300} ).custom(0.001,0.8);
      var y= new fx.Interval( function() 
      { 
          try
          {
              var z1=new fx.Opacity( 'transparentMessage',{duration:1000} ).custom(0.8,0) ;
              var z2=new fx.Top( 'transparentMessage',{duration:1500, onComplete: function(){$("transparentMessage").remove();}} ).custom(0,-100) ; 
          }
          catch(e)
          {
             alert(e);
           }
      },1);
};

