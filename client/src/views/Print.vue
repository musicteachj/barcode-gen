<template>
  <v-container>
    <p :class="`text-center font-weight-light text-${pageTitle} mt-4`">Print Barcodes</p>
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
        width="300"
        height="280"
      >
        <p :class="`mt-2 text-center font-weight-regular text-${printCardText}`">{{bar.name}}</p>
        <p :class="`mt-n3 text-center font-weight-regular text-${printCardText}`">{{bar.type}}</p>
        <VueBarcode
          class="text-center containBar mt-n2" 
          :id="`${bar.uuid}`" 
          :value="bar.value" 
          :width="barcodeWidth(bar.type)"
          :format="bar.type"
          fontSize="20"
        >
          Show this if the rendering fails.
        </VueBarcode>

        <!-- HIDE PRINT BARCODE -->
        <!-- FIXES PRINT MOBILE ISSUE -->
        <VueBarcode 
          class="text-center containBar hidden" 
          :id="`${index}`" 
          :value="bar.value" 
          width="2"
          :format="bar.type"
          fontSize="20"
        >
          Show this if the rendering fails.
        </VueBarcode>
        

        <v-card-actions class="mt-n2">
          <v-btn
            class="deleteBarBtn"
            color="error"
            text
            @click="deleteBarcode(bar)"
          >
            Delete
          </v-btn>
          
          <v-spacer/>

          <v-btn
            class="printBarBtn"
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
    <h1 :class="`text-center font-weight-light text-${pageSubText} mt-10`">No Barcodes To Display</h1>
    <h1 :class="`text-center font-weight-light text-${pageSubText} mt-6`">Go Create One!</h1>
    </v-card>

    <SnackBar :snackbar="snackInit" :deleteText="delText"/>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import VueBarcode from 'vue-barcode';
import { Printd } from 'printd';
import { mapState } from 'vuex';
import { printBarcodeStyles } from "../util/printBarStyle";
import DeleteDialog from '@/components/DeleteBarcodeDialog.vue';
import SnackBar from '@/components/SnackBar.vue';
import ViewsStylings from "../mixins/ViewsStylings.vue";


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
export default class Print extends Mixins(ViewsStylings) {
  // Mapped Variables ----------------
  // ---------------------------------
  barcodes!: any;

  // Local Variables -----------------
  // ---------------------------------
  dialog: boolean = false;
  barData: object = {};
  snackInit: boolean = false;
  delText: boolean = false;
  window: any = {
    width: 0,
    height: 0
  }

  // Computed ------------------------
  // ---------------------------------
  get cardWidth() {
    return this.window.width >= 3000 ? "500" : "344";
  }

  get conditionDisplay() {
    return this.barcodes.length > 0 ? true : false;
  }

  // Lifecycle Events ----------------
  // ---------------------------------
  created() {
    this.$store.dispatch("retrieveBarcodes");
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  }

  // Methods -------------------------
  // ---------------------------------
  closeParentD() {
    this.dialog = false;
  }

  deleteSnack() {
    this.snackInit = true;
      setTimeout(() => {
        this.snackInit = false
      }, 7000);
  }

  printBarcode(index) {
    const d = new Printd();
    d.print(document.getElementById(`${index}`), [ printBarcodeStyles ]);
  }

  deleteBarcode(bar) {
    this.dialog = true;
    this.barData = bar;
    this.delText = true;
  }
  
  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }
}
</script>

<style scoped>
.hidden {
  display: none;
}

.cardClass {
  border-color: #303F9F !important;
  border-width: 4px !important;
}
</style>