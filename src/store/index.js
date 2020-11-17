import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global'

Vue.use(Vuex)

export default new Vuex.Store({
        state: {},
        mutations: {},
        actions: {},
        modules: {
            global
        }
    }) // eslint-disable-line