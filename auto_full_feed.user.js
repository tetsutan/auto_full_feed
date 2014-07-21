// ==UserScript==
// @name        Auto Full Feed
// @include     http://reader.livedoor.com/reader/*
// @include     http://fastladder.com/reader/*
// @description auto loading full feed required LDR Full Feed
// @version     0.0.5
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_xmlhttpRequest
// ==/UserScript==

(function(w){

  function exportGMFunc(fn, name){
    var fnName = name || fn.name;
    exportFunction(fn, unsafeWindow, {defineAs: fnName });
    return unsafeWindow[fnName];
  }

  var auto_full_feed_items = [
    //  /b.hatena.ne.jp/
    /av.watch.impress.co.jp/,
    /pc.watch.impress.co.jp/,
    /www.gizmodo.jp/,
    /japan.cnet.com/,
    /ameblo.jp/,
    /netatama.net/,
  ];

  var match_link = function(link){
    for(var i in auto_full_feed_items){
      if(link.search(auto_full_feed_items[i]) != -1){
        return true;
      }
    }
    return false;
  };

  setTimeout(function(){


    if(!w.LDR){
      setTimeout(arguments.callee,100);
      return;
    }

    var id = undefined;

    var after_printfeed = function(feed){

      if(id){
        clearInterval(id);
        id = undefined;
      }

      var link = feed.channel.link

      if(!match_link(link)) return;

      id = setTimeout(function(){

          if(!w.writing_complete()){
            id = setTimeout(arguments.callee,100);
          }
          else{
            w.Keybind.sendKey("u");
          }


      },100);

    };

    w.register_hook("AFTER_PRINTFEED", exportGMFunc(after_printfeed, "auto_ldr_full_feed"));

  },100)

})(unsafeWindow);




