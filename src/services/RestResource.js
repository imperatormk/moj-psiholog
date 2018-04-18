import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

export default class RestResource {
    sendGet(url) {
        return Vue.http.get(url);  
    }

    sendPost(url, object) {
        return Vue.http.post(url, object);
    }

    sendPut(url, object) {
        return Vue.http.put(url, object);
    }

    sendDelete(url, object) {
        return Vue.http.delete(url, {
            body: object
        });
    }
}