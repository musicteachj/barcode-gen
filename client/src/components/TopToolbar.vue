<template>
  <v-card
    flat
    tile
  >
    <v-toolbar
      dense
      color="primary"
      height="48"
    >  
      <v-btn icon>
        <v-icon size="24" color="#fff">{{routeIcons}}</v-icon>
      </v-btn>
      <v-toolbar-title class="whiteText ml-n3">{{$route.name}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title class="whiteText">Barcode Gen</v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopToolbar extends Vue {
  // Local Variables -----------------
  // ---------------------------------
  window: any = {
    width: 0,
    height: 0
  }

  // Computed ------------------------
  // ---------------------------------
  get routeIcons() {
    if (this.$route.name === "Scan") return "mdi-barcode-scan"
    if (this.$route.name === "Create") return "mdi-barcode"
    if (this.$route.name === "Print") return "mdi-printer"
  }
}
</script>

<style scoped>
.whiteText {
  color: #fff !important;
}
</style>