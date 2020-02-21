<template>
  <v-container>
    <p class="display-4 text-center">Print Barcodes</p>
    <v-card
      :class="`d-flex justify-center flex-wrap`"
      flat
      tile
    >
      <v-card
        v-for="i in 18"
        :key="i"
        outlined
        class="ma-2 cardClass"
        width="344"
      >
        <p class="mt-2 text-center headline">Name</p>
        <p class="text-center headline">Type</p>
        <VueBarcode  class="text-center" :id="`${i}`" :value="i">
          Show this if the rendering fails.
        </VueBarcode>

        <v-card-actions>
          <v-btn
            color="error"
            text
            @click="deleteBarcode(i)"
          >
            Delete
          </v-btn>
          
          <v-spacer/>

          <v-btn
            color="primary"
            text
            @click="printBarcode(i)"
          >
            Print
          </v-btn>
        </v-card-actions>
      </v-card>
      <DeleteDialog v-bind="propsToPass"/>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueBarcode from 'vue-barcode';
import { Printd } from 'printd'

import DeleteDialog from '@/components/DeleteBarcodeDialog.vue';

const cssText = `
h1 {
  color: black;
  font-family: sans-serif;
}
`


@Component({
  components: {
    VueBarcode,
    DeleteDialog
  }
})
export default class Print extends Vue {

  propsToPass: any = {}

  printBarcode(i) {
    console.log(i);
    const d = new Printd()
    d.print( document.getElementById(`${i}`), [ cssText ] )
  }

  deleteBarcode(i) {
    console.log("Delete Clicked");
    console.log(i);
    this.propsToPass = {
      dialog: true,
      data: i
    }
  }

}
</script>

<style scoped>
.cardClass {
  border-color: #303F9F !important;
  border-width: 4px !important;
}
</style>