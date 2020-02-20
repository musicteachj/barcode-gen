<template>
<v-card
    color="grey lighten-4"
    flat
    
    tile
  >
    <v-toolbar 
      dense
      color="primary">
      
      <v-btn icon>
        <v-icon color="white">{{routeIcons}}</v-icon>
      </v-btn>

      <v-toolbar-title color="white" class="whiteText">{{$route.name}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title color="white" class="whiteText">Barcode Gen</v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopToolbar extends Vue {

  get routeIcons() {
    if (this.$route.name === "Scan") {
      return "mdi-barcode-scan"
    }
    if (this.$route.name === "Create") {
      return "mdi-barcode"
    } 
    if (this.$route.name === "Print") {
      return "mdi-printer"
    } 
  }

}
</script>

<style scoped>
.whiteText {
  color: white !important;
}
</style>