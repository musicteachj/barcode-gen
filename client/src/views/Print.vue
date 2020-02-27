<template>
  <v-container>
    <p class="display-4 text-center">Print Barcodes</p>
    <v-card
      :class="`d-flex justify-center flex-wrap`"
      flat
      tile
    >
      <v-card
        v-for="(bar, index) in this.barcodes"
        :key="index"
        outlined
        class="ma-2 cardClass"
        width="344"
      >
        <p class="mt-2 text-center headline">{{bar.name}}</p>
        <p class="text-center headline">{{bar.type}}</p>
        <VueBarcode  class="text-center" :id="`${index}`" :value="bar.value">
          Show this if the rendering fails.
        </VueBarcode>

        <v-card-actions>
          <v-btn
            color="error"
            text
            @click="deleteBarcode(index)"
          >
            Delete
          </v-btn>
          
          <v-spacer/>

          <v-btn
            color="primary"
            text
            @click="printBarcode(index)"
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
import { Printd } from 'printd';
import { mapState } from 'vuex';
import { printBarcodeStyles } from "../util/printBarStyle";
import DeleteDialog from '@/components/DeleteBarcodeDialog.vue';

@Component({
  components: {
    VueBarcode,
    DeleteDialog
  },
  computed: {
    ...mapState(["barcodes"])
  }
})
export default class Print extends Vue {

  // Mapped variables -----
  barcodes!: any;

  propsToPass: any = {}

  printBarcode(index) {
    console.log(index);
    const d = new Printd()
    d.print( document.getElementById(`${index}`), [ printBarcodeStyles ] )
  }

  deleteBarcode(index) {
    console.log("Delete Clicked");
    console.log(index);
    this.propsToPass = {
      dialog: true,
      data: index
    }
  }

  created() {
    this.$store.dispatch("retrieveBarcodes");
  }

}
</script>

<style scoped>
.cardClass {
  border-color: #303F9F !important;
  border-width: 4px !important;
}
</style>