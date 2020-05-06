<template>
<v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar 
      dense
      color="primary"
      class="toolB"
      :height="dynamicToolbarHeight"
    >  
      <v-btn icon class="toolBtn">
        <v-icon :size="dynamicToolbarIcon" class="toolBIcon" color="white">{{routeIcons}}</v-icon>
      </v-btn>

      <v-toolbar-title color="white" class="whiteText toolBRouteText">{{$route.name}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title color="white" class="whiteText toolBBarText">Barcode Gen</v-toolbar-title>
    </v-toolbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopToolbar extends Vue {

  window: any = {
    width: 0,
    height: 0
  }
  created() {
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

  get dynamicToolbarHeight() {
    if (this.window.width >= 4096) {
      return "100"
    }
  }

  get dynamicToolbarIcon() {
    if (this.window.width >= 4096) {
      return "80"
    }
  }

}
</script>

<style scoped>
.whiteText {
  color: white !important;
}

@media screen and (min-width: 4096px) { 
  .toolBIcon {
    margin-left: 200px !important;
  }

  .toolBBarText, .toolBRouteText {
    font-size: 70px;
  }
  .toolBRouteText {
    /* font-size: 80px; */
    margin-left: 200px;
  }
  .toolBBarText {
    /* font-size: 80px; */
    margin-right: 100px;
  }
}
</style>