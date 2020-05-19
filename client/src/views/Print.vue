<template>
  <v-container>
    <p class="text-center pageTitle">Print Barcodes</p>
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
        :min-width="cardWidth"
      >
        <p class="mt-2 text-center barName">{{bar.name}}</p>
        <p class="text-center barType">{{bar.type}}</p>
          <VueBarcode 
            class="text-center containBar" 
            :id="`${index}`" 
            :value="bar.value" 
            :width="barcodeWidth"
            :fontSize="barcodeFontSize">
          Show this if the rendering fails.
        </VueBarcode>
        

        <v-card-actions>
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
  window: any = {
    width: 0,
    height: 0
  }

  get cardWidth() {
    if (this.window.width >= 3000) {
      return "500"
    } else {
      return "344"
    }
  }

  get barcodeWidth() {
    if (this.window.width <= 440) {
      return "1"
    } else {
      return "2"
    }
  }

  get conditionDisplay() {
    if (this.barcodes.length > 0) {
      return true
    } else {
      return false
    }
  }

  get barcodeFontSize() {
    if (this.window.width >= 4096) {
      return "50"
    } else if (this.window.width >= 3840 && this.window.width <= 4095) {
      return "40"
    } else if (this.window.width >= 2560 && this.window.width <= 3839) {
      return "30"
    } else {
      return "20"
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
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  }
  
  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

}
</script>

<style scoped>
.cardClass {
  border-color: #303F9F !important;
  border-width: 4px !important;
}

@media screen and (max-width: 4096px) and (min-width: 3001px) {
  .barName, .barType {
    font-size: 40px;
  }
  .deleteBarBtn, .printBarBtn {
    font-size: 22px !important; 
  }
}

@media screen and (max-width: 3000px) and (min-width: 2561px) {
  .barName, .barType {
    font-size: 30px;
  }
  .deleteBarBtn, .printBarBtn {
    font-size: 18px !important; 
  }
}

@media screen and (max-width: 2560px) {
  .barName, .barType {
    font-size: 24px;
  }
}

@media screen and (max-width: 1920px) {
  .barName, .barType {
    font-size: 24px;
  }
}

@media screen and (max-width: 1440px) {
  .barName, .barType {
    font-size: 24px;
  }
}

@media screen and (max-width: 1024px) {
  .barName, .barType {
    font-size: 24px;
  }
}

@media screen and (max-width: 960px) {
  .barName, .barType {
    font-size: 24px;
  }
} 

@media screen and (max-width: 414px) {
  .barName, .barType {
    font-size: 20px;
  }

}
</style>