/**
 * @fileoverview Magic dependency loading. Taken from JsJaC library.
 * @author Stefan Strigler steve@zeank.in-berlin.de (JsJaC)
 * @author Jesús Leganés Combarro "Piranna" piranna@gmail.com (webp2p)
 */

var webp2p =
{
  require: function(libraryName)
  {
    // inserting via DOM fails in Safari 2.0, so brute force approach
    document.write('<script type="text/javascript" src="'+libraryName+'"></script>');
  },

  load: function()
  {
    var includes =
    ['bitmap',
     'db',
     'peersManager',

     'hasher/index',

     'lib/jssip-0.2.1',

     'polyfills/FileWriter',
     'polyfills/IndexedDB-javascript',

     'signaling/index',
     'signaling/PubNub',
     'signaling/simpleSignaling',
     'signaling/SIP',
     'signaling/XMPP',

     'transport/index',
     'transport/host',
     'transport/peer'
     ];

    var scripts = document.getElementsByTagName("script");
    var path = './', i;
    for(i=0; i<scripts.length; i++)
    {
      var src = scripts.item(i).src
      var regex = /webp2p\/index\.js$/
      if(src && src.match(regex))
      {
        path = src.replace(regex,'webp2p/');
        break;
      }
    }

    for(i=0; i<includes.length; i++)
      this.require(path+includes[i]+'.js');
  },

  bind: function(fn, obj, optArg)
  {
    return function(arg)
    {
      return fn.apply(obj, [arg, optArg]);
    };
  }
};

webp2p.load();