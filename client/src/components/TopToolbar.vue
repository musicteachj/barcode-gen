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
        <v-icon :size="dynamicToolbarIcon" class="toolBIcon" color="#fff">{{routeIcons}}</v-icon>
      </v-btn>
      <v-toolbar-title color="#fff" class="whiteText toolBRouteText">{{$route.name}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title color="#fff" class="whiteText toolBBarText">Barcode Gen</v-toolbar-title>
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

  get dynamicToolbarHeight() {
    if (this.window.width >= 3840) return "100"
    if (this.window.width >= 3000 && this.window.width <= 3839) return "75"
    return "48"
  }

  get dynamicToolbarIcon() {
    if (this.window.width >= 3840) return "80"
    if (this.window.width >= 3000 && this.window.width <= 3839) return "60"
    return "24"
  }

  // Lifecycle Events ----------------
  // ---------------------------------
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  }

  // Methods -------------------------
  // ---------------------------------
  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }
}
</script>

<style scoped>
.whiteText {
  color: #fff !important;
}

/* @media screen and (max-width: 4096px) and (min-width: 3001px) and (min-height: 2000px) and (max-height: 2304px) {
  .toolBIcon {
    margin-left: 80px !important;
  }
  .toolBBarText, .toolBRouteText {
    font-size: 45px;
  }
  .toolBRouteText {
    margin-left: 60px;
  }
  .toolBBarText {
    margin-right: 30px;
  }
}

@media screen and (max-width: 3000px) and (min-width: 2881px) and (min-height: 1600px) and (max-height: 2000px) {
  .toolBIcon {
    margin-left: 80px !important;
  }
  .toolBBarText, .toolBRouteText {
    font-size: 45px;
  }
  .toolBRouteText {
    margin-left: 60px;
  }
  .toolBBarText {
    margin-right: 30px;
  }
} */
</style>