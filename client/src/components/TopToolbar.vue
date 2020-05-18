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
    if (this.window.width >= 3840) {
      return "100"
    }

    if (this.window.width >= 3000 && this.window.width <= 3839) {
      return "75"
    }
  }

  get dynamicToolbarIcon() {
    if (this.window.width >= 3840) {
      return "80"
    }

    if (this.window.width >= 3000 && this.window.width <= 3839) {
      return "60"
    }
  }

}
</script>

<style scoped>
.whiteText {
  color: white !important;
}

@media screen and (max-width: 4096px) and (min-width: 3001px) and (min-height: 2000px) and (max-height: 2304px) {
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
}

/* @media screen and (min-width: 4096px) { 
  .toolBIcon {
    margin-left: 200px !important;
  }

  .toolBBarText, .toolBRouteText {
    font-size: 70px;
  }
  .toolBRouteText {
    margin-left: 200px;
  }
  .toolBBarText {
    margin-right: 100px;
  }
} */
</style>