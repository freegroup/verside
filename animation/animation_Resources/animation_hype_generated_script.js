//	HYPE.documents["animation"]

(function HYPE_DocumentLoader() {
	var resourcesFolderName = "animation_Resources";
	var documentName = "animation";
	var documentLoaderFilename = "animation_hype_generated_script.js";

	// find the URL for this script's absolute path and set as the resourceFolderName
	try {
		var scripts = document.getElementsByTagName('script');
		for(var i = 0; i < scripts.length; i++) {
			var scriptSrc = scripts[i].src;
			if(scriptSrc != null && scriptSrc.indexOf(documentLoaderFilename) != -1) {
				resourcesFolderName = scriptSrc.substr(0, scriptSrc.lastIndexOf("/"));
				break;
			}
		}
	} catch(err) {	}

	// Legacy support
	if (typeof window.HYPE_DocumentsToLoad == "undefined") {
		window.HYPE_DocumentsToLoad = new Array();
	}
 
	// load HYPE.js if it hasn't been loaded yet
	if(typeof HYPE_100 == "undefined") {
		if(typeof window.HYPE_100_DocumentsToLoad == "undefined") {
			window.HYPE_100_DocumentsToLoad = new Array();
			window.HYPE_100_DocumentsToLoad.push(HYPE_DocumentLoader);

			var headElement = document.getElementsByTagName('head')[0];
			var scriptElement = document.createElement('script');
			scriptElement.type= 'text/javascript';
			scriptElement.src = resourcesFolderName + '/' + 'HYPE.js?hype_version=100';
			headElement.appendChild(scriptElement);
		} else {
			window.HYPE_100_DocumentsToLoad.push(HYPE_DocumentLoader);
		}
		return;
	}
	
	var hypeDoc = new HYPE_100();
	
	var attributeTransformerMapping = {b:"i",c:"i",bC:"i",d:"i",aS:"i",M:"i",e:"f",N:"i",f:"d",aT:"i",O:"i",g:"c",aU:"i",P:"i",Q:"i",aV:"i",R:"c",aW:"f",aI:"i",S:"i",T:"i",l:"d",aX:"i",aJ:"i",m:"c",n:"c",aK:"i",X:"i",aZ:"i",A:"c",Y:"i",aL:"i",B:"c",C:"c",D:"c",t:"i",E:"i",G:"c",bA:"c",a:"i",bB:"i"};

var scenes = [{initialValues:{"10":{o:"content-box",h:"Macbook.png",x:"visible",a:422,q:"100% 100%",b:95,j:"absolute",r:"inline",c:300,k:"div",z:"7",d:225,e:"0.000000",f:"0deg"},"2":{o:"content-box",w:"",h:"iPad.png",p:"no-repeat",x:"visible",a:154,q:"100% 100%",b:114,j:"absolute",r:"inline",c:200,k:"div",z:"12",d:156,aY:"0",e:"1.000000",t:15,f:"0deg"},"21":{o:"content-box",h:"firefox.png",x:"visible",a:422,q:"100% 100%",b:114,j:"absolute",r:"inline",c:148,k:"div",z:"8",d:148,e:"0.000000",f:"0deg"},"15":{o:"content-box",h:"magento1.png",x:"visible",a:177,q:"100% 100%",b:540,j:"absolute",r:"inline",c:48,k:"div",z:"15",d:48},"19":{o:"content-box",h:"desktop.png",x:"visible",a:422,q:"100% 100%",b:80,j:"absolute",r:"inline",c:256,k:"div",z:"6",d:256,e:"0.000000",f:"0deg"},"16":{o:"content-box",h:"wordpress.png",x:"visible",a:214,q:"100% 100%",b:481,j:"absolute",r:"inline",c:176,k:"div",z:"16",d:145},"22":{o:"content-box",h:"safari.jpg",x:"visible",a:422,q:"100% 100%",b:114,j:"absolute",r:"inline",c:167,k:"div",z:"5",d:167,e:"0.000000",f:"0deg"},"5":{o:"content-box",h:"iPad.png",x:"visible",a:422,q:"100% 100%",b:114,j:"absolute",r:"inline",c:200,k:"div",z:"9",d:156,aY:"0",e:"0.000000",f:"0deg"},"23":{o:"content-box",h:"ie.jpg",x:"visible",a:422,q:"100% 100%",b:142,j:"absolute",r:"inline",c:121,k:"div",z:"4",d:128,e:"0.000000",f:"0deg"},"17":{c:20,q:"100% 100%",d:157,r:"inline",aW:"0.005453",f:"0deg",t:17,h:"arrow.png",aY:"0",w:"",j:"absolute",x:"visible",k:"div",Q:0,z:"2",R:"#000000",S:0,a:242,o:"content-box",T:0,b:270},"18":{c:267,d:154,I:"Solid",J:"Solid",aW:"0.000000",K:"Solid",g:"#FFFFFF",aX:0,L:"Solid",M:1,N:1,A:"#F0F0F0",x:"visible",j:"absolute",O:1,P:1,B:"#F0F0F0",C:"#F0F0F0",Q:0,k:"div",D:"#F0F0F0",z:"13",R:"#279ACD",S:0,a:117,T:0,b:444},"8":{o:"content-box",h:"iPad.png",x:"visible",a:422,q:"100% 100%",b:114,j:"absolute",r:"inline",c:200,k:"div",z:"3",d:156,aY:"0",e:"0.000000",f:"0deg"},"14":{o:"content-box",h:"php-mysql.gif",x:"visible",a:174,q:"100% 100%",b:452,j:"absolute",r:"inline",c:110,k:"div",z:"14",d:97},"20":{o:"content-box",h:"GoogleChrome.png",x:"visible",a:422,q:"100% 100%",b:108,j:"absolute",r:"inline",c:167,k:"div",z:"10",d:167,e:"0.000000",f:"0deg"},"9":{o:"content-box",h:"iMac.png",x:"visible",a:422,q:"100% 100%",b:114,j:"absolute",r:"inline",c:300,k:"div",z:"11",d:187.17391,aY:"0",e:"0.000000",f:"0deg"}},timelines:{kTimelineDefaultIdentifier:{framesPerSecond:30,animations:[{f:"2",t:0,d:4.0999999,i:"b",e:114,r:1,s:114,o:"2"},{f:"2",t:0,d:20.666666,i:"b",e:114,r:1,s:114,o:"5"},{f:"2",t:0,d:31.266666,i:"b",e:95,r:1,s:95,o:"10"},{f:"2",t:0,d:48.266666,i:"a",e:422,r:1,s:422,o:"8"},{f:"2",t:4.0999999,d:1.4666667,i:"a",e:104,r:1,s:422,o:"9"},{f:"2",t:4.0999999,d:1.4666667,i:"e",e:"1.000000",r:1,s:"0.000000",o:"9"},{f:"2",t:4.0999999,d:1.4666667,i:"f",e:"-90deg",r:1,s:"0deg",o:"2"},{f:"2",t:4.0999999,d:1.4666667,i:"a",e:-275,r:1,s:154,o:"2"},{f:"2",t:4.0999999,d:1.4666667,i:"b",e:-276,s:114,o:"2"},{f:"2",t:5.5666666,d:3.333333,i:"a",e:104,s:104,o:"9"},{f:"2",t:8.8999996,d:1.4666672,i:"b",e:-212,r:1,s:114,o:"9"},{f:"2",t:8.8999996,d:1.4666672,i:"a",e:-275,s:104,o:"9"},{f:"2",t:8.8999996,d:1.4666672,i:"f",e:"-90deg",r:1,s:"0deg",o:"9"},{f:"2",t:8.9333334,d:1.4666662,i:"a",e:170,r:1,s:422,o:"20"},{f:"2",t:8.9333334,d:1.4666662,i:"e",e:"1.000000",r:1,s:"0.000000",o:"20"},{f:"2",t:10.4,d:4.5,i:"a",e:170,s:170,o:"20"},{f:"2",t:14.9,d:1.4666672,i:"f",e:"-90deg",r:1,s:"0deg",o:"20"},{f:"2",t:14.9,d:1.4666672,i:"b",e:-218,r:1,s:108,o:"20"},{f:"2",t:14.9,d:1.4666672,i:"a",e:-275,s:170,o:"20"},{f:"2",t:14.9,d:1.4666672,i:"e",e:"1.000000",r:1,s:"0.000000",o:"5"},{f:"2",t:14.9,d:1.4666672,i:"a",e:154,r:1,s:422,o:"5"},{f:"2",t:16.366667,d:4.2999992,i:"a",e:154,s:154,o:"5"},{f:"2",t:20.666666,d:1.4666672,i:"a",e:175,r:1,s:422,o:"21"},{f:"2",t:20.666666,d:1.4666672,i:"e",e:"1.000000",r:1,s:"0.000000",o:"21"},{f:"2",t:20.666666,d:1.4666672,i:"f",e:"-90deg",r:1,s:"0deg",o:"5"},{f:"2",t:20.666666,d:1.4666672,i:"a",e:-275,s:154,o:"5"},{f:"2",t:20.666666,d:1.4666672,i:"b",e:-276,s:114,o:"5"},{f:"2",t:22.133333,d:3.666666,i:"a",e:175,s:175,o:"21"},{f:"2",t:25.799999,d:1.4666672,i:"f",e:"-90deg",r:1,s:"0deg",o:"21"},{f:"2",t:25.799999,d:1.4666672,i:"a",e:-275,s:175,o:"21"},{f:"2",t:25.799999,d:1.2666683,i:"b",e:-199.9234,r:1,s:114,o:"21"},{f:"2",t:25.833334,d:1.4666653,i:"a",e:104,r:1,s:422,o:"10"},{f:"2",t:25.833334,d:1.4666653,i:"e",e:"1.000000",r:1,s:"0.000000",o:"10"},{f:"2",t:27.066668,d:0.19999886,i:"b",e:-212,s:-199.9234,o:"21"},{f:"2",t:27.299999,d:3.9666672,i:"a",e:104,s:104,o:"10"},{f:"2",t:31.266666,d:1.4666672,i:"a",e:104,r:1,s:422,o:"19"},{f:"2",t:31.266666,d:1.4666672,i:"e",e:"1.000000",r:1,s:"0.000000",o:"19"},{f:"2",t:31.266666,d:1.4666672,i:"b",e:-276,s:95,o:"10"},{f:"2",t:31.266666,d:1.4666672,i:"a",e:-275,s:104,o:"10"},{f:"2",t:31.266666,d:1.4666672,i:"f",e:"-90deg",r:1,s:"0deg",o:"10"},{f:"2",t:32.733334,d:4.3333321,i:"a",e:104,s:104,o:"19"},{f:"2",t:37.033333,d:1.4666672,i:"a",e:170,r:1,s:422,o:"22"},{f:"2",t:37.033333,d:1.4666672,i:"e",e:"1.000000",r:1,s:"0.000000",o:"22"},{f:"2",t:37.066666,d:1.4666672,i:"b",e:-374,r:1,s:80,o:"19"},{f:"2",t:37.066666,d:1.4666672,i:"a",e:-209,s:104,o:"19"},{f:"2",t:37.066666,d:1.4666672,i:"f",e:"-90deg",r:1,s:"0deg",o:"19"},{f:"2",t:38.5,d:3.6333351,i:"a",e:170,s:170,o:"22"},{f:"2",t:42.099998,d:1.4666672,i:"e",e:"1.000000",r:1,s:"0.000000",o:"23"},{f:"2",t:42.099998,d:1.4666672,i:"a",e:181,r:1,s:422,o:"23"},{f:"2",t:42.133335,d:1.4666634,i:"f",e:"-90deg",r:1,s:"0deg",o:"22"},{f:"2",t:42.133335,d:1.4666634,i:"a",e:-275,s:170,o:"22"},{f:"2",t:42.133335,d:1.4666634,i:"b",e:-212,r:1,s:114,o:"22"},{f:"2",t:43.566666,d:4.6333351,i:"a",e:181,s:181,o:"23"},{f:"2",t:48.200001,d:1.4666672,i:"f",e:"-90deg",r:1,s:"0deg",o:"23"},{f:"2",t:48.200001,d:1.4666672,i:"a",e:-275,s:181,o:"23"},{f:"2",t:48.200001,d:1.4666672,i:"b",e:-184,r:1,s:142,o:"23"},{f:"2",t:48.266666,d:1.4666672,i:"a",e:154,s:422,o:"8"},{f:"2",t:48.266666,d:1.4666672,i:"e",e:"1.000000",r:1,s:"0.000000",o:"8"}],identifier:"kTimelineDefaultIdentifier",name:"Main Timeline",duration:49.733334}},sceneIndex:0,perspective:"600px",oid:"1",onSceneAnimationCompleteAction:{type:1,transition:1,sceneSymbol:3},backgroundColor:"#FFFFFF",name:"Untitled Scene"}];


	
	var javascripts = [];


	
	var Custom = {};
	var javascriptMapping = {};
	for(var i = 0; i < javascripts.length; i++) {
		try {
			javascriptMapping[javascripts[i].identifier] = javascripts[i].name;
			eval("Custom." + javascripts[i].name + " = " + javascripts[i].source);
		} catch (e) {
			hypeDoc.log(e);
			Custom[javascripts[i].name] = (function () {});
		}
	}
	
	hypeDoc.setAttributeTransformerMapping(attributeTransformerMapping);
	hypeDoc.setScenes(scenes);
	hypeDoc.setJavascriptMapping(javascriptMapping);
	hypeDoc.Custom = Custom;
	hypeDoc.setCurrentSceneIndex(0);
	hypeDoc.setMainContentContainerID("animation_hype_container");
	hypeDoc.setResourcesFolderName(resourcesFolderName);
	hypeDoc.setShowHypeBuiltWatermark(0);
	hypeDoc.setShowLoadingPage(false);
	hypeDoc.setDrawSceneBackgrounds(true);
	hypeDoc.setDocumentName(documentName);

	HYPE.documents[documentName] = hypeDoc.API;

	hypeDoc.documentLoad(this.body);
}());

