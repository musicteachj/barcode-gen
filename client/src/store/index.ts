import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barcodes: []
  },
  mutations: {
    setBarcodes(state, payload) {
      state.barcodes = payload.serverData;
    }
  },
  actions: {
    saveBarcode({commit, state}, barcode: any) {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/api/barcodes", {
          barcode
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      })
    },

    retrieveBarcodes({commit}: any) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/api/barcodes")
        .then((response: any) => {
          commit('setBarcodes', {
            serverData: response.data
          })
          console.log(response)
        })
        .catch((error: any) => {
          console.log(error)
        })
      })
    }
  },
  modules: {
    
  },
});
