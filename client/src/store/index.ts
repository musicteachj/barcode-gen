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
    saveBarcode(context: any, { barcode }: any) {
      return new Promise((resolve, reject) => {
        axios.post("http://localhost:3000/api/barcodes", {
          barcode
        })
        .then(
          (success: any) => {
            context.dispatch("retrieveBarcodes");
            resolve()
          },
          fail => {
            reject(new Error(fail.status))
          }
        );
      })
    },

    deleteBarcode(context: any, { barcode }: any) {
      return new Promise((resolve, reject) => {
        axios.delete(`http://localhost:3000/api/barcodes/${barcode.uuid}`, {
          params: barcode,
        })
        .then(
          (success: any) => {
            context.dispatch("retrieveBarcodes");
            resolve()
          },
          fail => {
            reject(new Error(fail.status))
          }
        );
      })
    },

    retrieveBarcodes({commit}: any) {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/api/barcodes")
        .then((response: any) => {
          commit('setBarcodes', {
            serverData: response.data
          })
          // Response
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
