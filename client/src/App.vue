
<template>
  <v-app v-if="valid === false">
    <v-card
      :class="`mx-auto justify-center flex-wrap`"
      flat
      tile
    >
    <v-row class="d-block">
    <p class="display-4 text-center appHeadline">Barcode Gen</p>
    <p class="headline text-center appSupportText">Scan, Create and Print Barcodes</p>
    </v-row>
    <v-row>
      <VueBarcode 
        class="text-center mx-auto homeBarExample" 
        value="example"
        >
        Please enter a valid value for this barcode type.
      </VueBarcode>
    </v-row>
    <v-row>
    <v-btn 
      @click="valid = true"
      :block="false"
      max-width="200"
      color="primary"
      class="mx-auto">
      Lets Go
    </v-btn>
    </v-row>
    </v-card>
  </v-app>

  <v-app v-else>
    <TopToolbar></TopToolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <BottomNav class="bottomN"></BottomNav>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TopToolbar from './components/TopToolbar.vue';
  import BottomNav from './components/BottomNav.vue';
  import VueBarcode from 'vue-barcode';

  @Component({
    components: {
      TopToolbar,
      BottomNav,
      VueBarcode
    }
  })
  export default class App extends Vue {

    valid: boolean = false

  }
</script>

<style scoped>
.bottomN {
  position: sticky;
}

.appHeadline {
  margin-top: 50%;
}

.appSupportText {
  margin-bottom: 20%;
}

.homeBarExample {
  margin-bottom: 20%;
}

</style>