import Vue from 'vue'
import App from './App.vue'


function connected(p, i) {
    p.onMessage.addListener(function (m) {
        new_data({
            type: m.type,
            data: m.message,
            length: m.message.length,
            time: new Date()
        });

    });
}

function new_data(data) {
    const maxItems = 1000;
    app.$children[0].ws_data.push(data);
    if (app.$children[0].ws_data.length > maxItems) {
        // if there are a lot of messages browser is dieing
        app.$children[0].ws_data.shift()
    }
    app.$children[0].$children[0].new_data_notify();
}

Vue.config.productionTip = false;
window.app = new Vue({
    render: h => h(App),

}).$mount('#app');
browser.runtime.onConnect.addListener(connected);






