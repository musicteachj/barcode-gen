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
          class="text-center mt-n2" 
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
          class="text-center hidden" 
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

  // Computed ------------------------
  // ---------------------------------
  /**
   * Returns true if barcodes Array length is greater than 0
   * @returns {boolean}
   */
  get conditionDisplay() {
    return this.barcodes.length > 0 ? true : false;
  }

  // Lifecycle Events ----------------
  // ---------------------------------
  created() {
    this.$store.dispatch("retrieveBarcodes");
  }

  // Methods -------------------------
  // ---------------------------------
  /**
   * Set dialog var to flase, closes dialog
   */
  closeParentD() {
    this.dialog = false;
  }

  /**
   * Initiates delete confirmation snackbar
   */
  deleteSnack() {
    this.snackInit = true;
    setTimeout(() => {
      this.snackInit = false
    }, 7000);
  }

  /**
   * Initiates printD component/element
   * Opens print preview dialog in browser
   */
  printBarcode(index: any) {
    const d = new Printd();
    d.print(document.getElementById(`${index}`)!, [ printBarcodeStyles ]);
  }

  /**
   * Opens delete barcode dialog
   */
  deleteBarcode(bar: any) {
    this.dialog = true;
    this.barData = bar;
    this.delText = true;
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