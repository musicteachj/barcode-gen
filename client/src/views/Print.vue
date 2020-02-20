<template>
  <v-container>
    <p class="display-4 text-center">Created Barcodes</p>

    <v-card
      outlined
      class="mx-auto cardClass"
      max-width="344"
      
    >
    <h1 class="text-center">Category/Name</h1>
    <h1 class="text-center">Type</h1>
    <VueBarcode  class="text-center" id="bar" value="123456789">
      Show this if the rendering fails.
    </VueBarcode>

    <v-card-actions>
      <v-btn
        color="error"
        text
      >
        Delete
      </v-btn>
      
      <v-spacer/>

      <v-btn
        color="primary"
        text
        @click="printBarcode"
      >
        Print
      </v-btn>
    </v-card-actions>
        
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import VueBarcode from 'vue-barcode';
  import { Printd } from 'printd'

  const cssText = `
  h1 {
    color: black;
    font-family: sans-serif;
  }
`


  @Component({
    components: {
      VueBarcode
    }
  })
  export default class Print extends Vue {

    printBarcode() {
      const d = new Printd()
      d.print( document.getElementById('bar'), [ cssText ] )
    }

  }
</script>

<style scoped>
.cardClass {
  border-color: #303F9F !important;
  border-width: 4px !important;
}
</style>