import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barcodes: []
  },
  mutations: {

  },
  actions: {
    saveBarcode({commit, state}, barcode: any) {
      console.log("test dispatch")
      // console.log(barcode);
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

    // retrieveBarcodes({commit, state}) {
    //   return new Promise((resolve, reject) => {
    //     axios.get("http://localhost:3000/api/barcodes")
    //     .then((response: any) => {
    //       console.log(response)
    //     })
    //     .catch((error: any) => {
    //       console.log(error)
    //     })
    //   })
    // }
  },
  modules: {
    
  },
});
