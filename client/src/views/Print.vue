<template>
  <v-container>
    <p class="display-4 text-center pageTitle">Print Barcodes</p>
    <v-card
      v-if="conditionDisplay"
      :class="`d-flex justify-center flex-wrap`"
      flat
      tile
    >
      <v-card
        v-for="(bar, index) in this.barcodes"
        :key="index"
        outlined
        class="ma-2 cardClass"
        min-width="344"
      >
        <p class="mt-2 text-center headline">{{bar.name}}</p>
        <p class="text-center headline">{{bar.type}}</p>
        <VueBarcode class="text-center" :id="`${index}`" :value="bar.value">
          Show this if the rendering fails.
        </VueBarcode>

        <v-card-actions>
          <v-btn
            color="error"
            text
            @click="deleteBarcode(bar)"
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
      <DeleteDialog 
        @closeDialog="closeParentD" 
        :data="barData" 
        :dialogVisible="dialog"
        @deleteBar="deleteSnack"
      />
    </v-card>
    <v-card
      v-else
      flat
      tile
    >
    <h1 class="text-center display-1 mt-10">No Barcodes To Display</h1>
    <h1 class="text-center display-1 mt-6">Go Create One!</h1>
    </v-card>

    <SnackBar :snackbar="snackInit" :deleteText="delText"/>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueBarcode from 'vue-barcode';
import { Printd } from 'printd';
import { mapState } from 'vuex';
import { printBarcodeStyles } from "../util/printBarStyle";
import DeleteDialog from '@/components/DeleteBarcodeDialog.vue';
import SnackBar from '@/components/SnackBar.vue';


@Component({
  components: {
    VueBarcode,
    DeleteDialog,
    SnackBar
  },
  computed: {
    ...mapState(["barcodes"])
  }
})
export default class Print extends Vue {

  // Mapped variables -----
  barcodes!: any;

  // Local varibles -----
  dialog: boolean = false;
  barData: object = {};
  snackInit: boolean = false;
  delText: boolean = false;


  get conditionDisplay() {
    if (this.barcodes.length > 0) {
      return true
    } else {
      return false
    }
  }

  closeParentD() {
    this.dialog = false;
  }

  deleteSnack() {
    this.snackInit = true;
      setTimeout(() => {
        this.snackInit = false
      }, 2000);
  }

  printBarcode(index) {
    console.log(index);
    const d = new Printd()
    d.print( document.getElementById(`${index}`), [ printBarcodeStyles ] )
  }

  deleteBarcode(bar) {
    console.log("Delete Clicked");
    console.log(bar);
    this.dialog = true;
    this.barData = bar;
    this.delText = true;
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

@media screen and (min-width: 4096px) { 
  .pageTitle {
    margin-top: 10%;
    font-size: 140px !important;
    margin-bottom: 5%;
  }
}
</style>