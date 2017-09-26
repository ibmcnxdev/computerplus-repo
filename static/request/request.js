// ==UserScript==
// @copyright    Copyright IBM Corp. 2017
//
// @name         helloWorld
// @version      0.1
// @description  *** PROTOTYPE CODE *** demonstrates simple hello world script to customize the Home Page
//
// @namespace  http://ibm.com
//
// @author       Hello World (aka You!)
//
// @include      *://apps.collabservintegration.com/homepage/*
//
// @exclude
//
// @run-at       document-end
//
// ==/UserScript==

if(typeof(dojo) != "undefined") {
	 require(['dojo/domReady', "dojo/dom-construct", "dojo/request"], function (domReady, domConstruct, request) {
        try {
            // utility function to let us wait for a specific element of the page to load...
            var waitFor = function(callback, elXpath, elXpathRoot, maxInter, waitTime) {
                if(!elXpathRoot) var elXpathRoot = dojo.body();
                if(!maxInter) var maxInter = 10000;  // number of intervals before expiring
                if(!waitTime) var waitTime = 1;  // 1000=1 second
                if(!elXpath) return;
                var waitInter = 0;  // current interval
                var intId = setInterval( function(){
                    if( ++waitInter<maxInter && !dojo.query(elXpath,elXpathRoot).length) return;

                    clearInterval(intId);
                    if( waitInter >= maxInter) {
                        console.log("**** WAITFOR ["+elXpath+"] WATCH EXPIRED!!! interval "+waitInter+" (max:"+maxInter+")");
                    } else {
                        console.log("**** WAITFOR ["+elXpath+"] WATCH TRIPPED AT interval "+waitInter+" (max:"+maxInter+")");
                        callback();
                    }
                }, waitTime);
            };

            // here we use waitFor to wait on the .lotusStreamTopLoading div.loaderMain.lotusHidden element
            // before we proceed to customize the page...
            waitFor( function(){
			// wait until the "loading..." node has been hidden
			// indicating that we have loaded content.
   			 work(domConstruct,request);
       	          },
		  ".activityStreamPage .lotusContent.lotusBoard");
      } catch(e) {
          alert("Exception occurred in helloWorld: " + e);
      }
   });
}

function work(domConstruct,request) {
		request.get("https://testauth2.eu-gb.mybluemix.net/OAuth2.0_AuthCode_part_3/", {
			headers: {
				"X-Requested-With": null,
				'Content-Type': 'text/plain'
			}
		}).then(
			function (response) {
			// Display the text file content
			var n = domConstruct.create("div", {
					innerHTML: "<p>" + response + "</p>"
				});
			domConstruct.place(n, dojo.query(".lotusContent")[0]);

		},
			function (error) {
			// Display the error returned
			var n = domConstruct.create("div", {
					innerHTML: "<p>" + error + "</p>"
				});
			domConstruct.place(n, dojo.query(".lotusContent")[0]);
		});
}

