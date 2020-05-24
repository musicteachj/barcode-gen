<template>
  <v-bottom-navigation
    scroll-threshold="800"
    absolute
    color="primary"
    light
    grow
    background-color="primary"
    :height="dynamicBNavHeight"
  >
    <v-btn value="scan" :to="{ name: 'Scan'}">
      <span v-if="this.$route.name != 'Scan'" style="color: white" class="linkText">Scan</span>
      <v-icon v-if="this.$route.name != 'Scan'" :size="dynamicBNavIcon" color="white">mdi-barcode-scan</v-icon>
      <v-icon v-else :size="dynamicBNavIcon" color="primary">mdi-barcode-scan</v-icon>
    </v-btn>

    <v-btn value="create" :to="{ path: '/'}">
      <span v-if="this.$route.name != 'Create'" style="color: white" class="linkText">Create</span>
      <v-icon v-if="this.$route.name != 'Create'" :size="dynamicBNavIcon" color="white">mdi-barcode</v-icon>
      <v-icon v-else :size="dynamicBNavIcon" color="primary">mdi-barcode</v-icon>
    </v-btn>

    <v-btn value="print" :to="{ name: 'Print'}">
      <span v-if="this.$route.name != 'Print'" style="color: white" class="linkText">Print</span>
      <v-icon v-if="this.$route.name != 'Print'" :size="dynamicBNavIcon" color="white">mdi-printer</v-icon>
      <v-icon v-else :size="dynamicBNavIcon" color="primary">mdi-printer</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BottomNav extends Vue {
  // Local Variables -----------------
  // ---------------------------------
  window: any = {
    width: 0,
    height: 0
  }

  // Computed ------------------------
  // ---------------------------------
  get dynamicBNavHeight() {
    if (this.window.width >= 3840) return "100"
    if (this.window.width >= 3000 && this.window.width <= 3839) return "75"
    return "56"
  }

  get dynamicBNavIcon() {
    if (this.window.width >= 3840) return "50"
    if (this.window.width >= 3000 && this.window.width <= 3839) return "40"
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

@media screen and (max-width: 4096px) and (min-width: 3001px) and (min-height: 2000px) and (max-height: 2304px) {
  .linkText {
    font-size: 30px;
  }
  .v-bottom-navigation a {
    margin-left: 3%;
    margin-right: 3%;
  }
}

@media screen and (max-width: 3000px) and (min-width: 2881px) and (min-height: 1600px) and (max-height: 2000px) {
  .linkText {
    font-size: 20px;
  }
  .v-bottom-navigation a {
    margin-left: 3%;
    margin-right: 3%;
  }
}

</style>