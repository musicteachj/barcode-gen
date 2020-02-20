<template>

  <v-container>
    <h1 class="headline">[[Print]]</h1>
    <h2>Content is coming to this mobile app very soon!</h2>

    <v-card
      outlined
      @click="printBarcode"
      class="mx-auto cardClass"
      max-width="344"
      
    >
    <h1>test</h1>
    <VueBarcode  id="bar" value="123456789">
      Show this if the rendering fails.
    </VueBarcode>
        
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