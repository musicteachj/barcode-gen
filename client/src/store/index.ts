import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

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

  getters: {},

  actions: {
    /**
     * Saves a barcode
     * Updates barcodes by dispatching "retrieveBarcodes"
     * @param context Store module context
     * @param {Object} barcode Barcode save object
     */
    saveBarcode(context: any, { barcode }: any) {
      return new Promise((resolve, reject) => {
        axios.post("api/barcodes", {
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

    /**
     * Deletes a barcode
     * Updates barcodes by dispatching "retrieveBarcodes"
     * @param context Store module context
     * @param {Object} barcode Barcode delete object
     */
    deleteBarcode(context: any, { barcode }: any) {
      return new Promise((resolve, reject) => {
        axios.delete(`api/barcodes/${barcode.uuid}`, {
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

    /**
     * Retrieves barcodes
     * Commits barcode using "setBarcodes"
     * @param commit Store module commit
     */
    retrieveBarcodes({commit}: any) {
      return new Promise((resolve, reject) => {
        axios.get("api/barcodes")
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
  
  modules: {},
});
