import Vue from 'vue'
import App from './App.vue'


function connected(p, i) {
    p.onMessage.addListener(function (m) {
        newData({
            type: m.type,
            data: m.message,
            length: m.message.length,
            time: new Date()
        });

    });
}

function newData(data) {
    app.maxItems = 1000;
    app.$children[0].wsFrames.push(data);
    if (app.$children[0].wsFrames.length > app.maxItems) {
        // if there are a lot of messages browser is dieing
        // maybe would be better count letters not items
        app.$children[0].wsFrames.shift()
    }
    app.$children[0].$children[0].newDataNotify();
}

Vue.config.productionTip = false;
window.app = new Vue({
    render: h => h(App),
}).$mount('#app');


// for testing in dev mode
// setInterval(function () {
//     newData({data: "just text data", type: "to_websocket", time: (new Date()) });
// }, 1000);
// setInterval(function () {
//     newData({data: '{"data": "data"}', type: "from_websocket", time: (new Date()) });
// }, 1100);

browser.runtime.onConnect.addListener(connected);






