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
    const maxItems = 20000;
    app.$children[0].ws_data.push(data);
    if (app.$children[0].ws_data.length > maxItems) {
        // если много сообщений браузер начинает подвисать и затем погибает...
        app.$children[0].ws_data.pop()
    }
}

Vue.config.productionTip = false;
window.app = new Vue({
    render: h => h(App),

}).$mount('#app');
browser.runtime.onConnect.addListener(connected);






