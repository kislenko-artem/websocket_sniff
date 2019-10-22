try {
    var th = document.getElementsByTagName("head")[0];
    createJS(function (s) {
        if (!s) {
            return
        }
        th.insertBefore(s, th.firstChild);
    });


} catch (err) {

    try {
        var th = document.getElementsByTagName("head")[0];
        createJS(function (s) {
            if (!s) {
                return
            }
            th.insertBefore(s, th.firstChild);
        });


        var th = document.getElementsByTagName("body")[0];
        createJS(function (s) {
            if (!s) {
                return
            }
            th.insertBefore(s, th.firstChild);
        });

    } catch (err) {
        createJS(function (s) {
            if (!s) {
                return
            }
            th.insertBefore(s, document.firstElementChild);
        });
    }

}


function createJS(callback) {

    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.text = `
 WebSocket.prototype = null; // extending WebSocket will throw an error if this is not set
 const ORIGINAL_WEBSOCKET = WebSocket;
 var WebSocket = window.WebSocket = class extends WebSocket {
  constructor(...args) {
   super(...args);

   this.addEventListener('message', event => {
    let ws_sniff_debug_from = new CustomEvent( "ws_sniff_debug_from", {
     detail: {
      data: event,
      obj: this
     }
    });
    document.body.dispatchEvent(ws_sniff_debug_from);
   });

   this.addEventListener('open', event => {
    let ws_sniff_debug_open = new CustomEvent( "ws_sniff_debug_open", {
     detail: {
      data: event,
      obj: this
     }
    });
    // document.body.dispatchEvent(ws_sniff_debug_open);
   });

   
  }
  send(...args) {
   let ws_sniff_debug_to = new CustomEvent( "ws_sniff_debug_to", {
    detail: {
     data: args[0],
     obj: this
    }
   });
   document.body.dispatchEvent(ws_sniff_debug_to);
   super.send(...args);
  }
 }`;

    // TODO: url need send
    var sending = browser.runtime.sendMessage({
        type: "check_websocket_tab",
        url: location.href
    });
    sending.then(
        function(msg) {
            if (msg.response === "off" || msg.response === null) {
                callback(undefined);
            } else {
                callback(s);
            }
        },
        function(errMsg) {
            console.log("errMsg", msg);
        }
    );

}


document.body.addEventListener("ws_sniff_debug_to", function (e) {
    browser.runtime.sendMessage({
        type: "to_websocket",
        message: e.detail.data,
        url: e.detail.obj.url
    });


});

document.body.addEventListener("ws_sniff_debug_from", function (e) {
    browser.runtime.sendMessage({
        type: "from_websocket",
        message: e.detail.data,
        url: e.detail.obj.url

    });


});

document.body.addEventListener("ws_sniff_debug_open", function (e) {
    browser.runtime.sendMessage({
        type: "open_websocket",
        message: e.detail.data,
        url: e.detail.obj.url
    });

});


