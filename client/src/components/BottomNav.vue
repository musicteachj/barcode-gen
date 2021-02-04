<template>
  <v-bottom-navigation
    scroll-threshold="800"
    absolute
    color="primary"
    light
    grow
    background-color="primary"
    height="56"
  >
    <v-btn value="scan" :to="{ name: 'Scan'}">
      <span v-if="this.$route.name != 'Scan'" style="color: #fff">Scan</span>
      <v-icon v-if="this.$route.name != 'Scan'" size="24" color="#fff">mdi-barcode-scan</v-icon>
      <v-icon v-else size="24" color="primary">mdi-barcode-scan</v-icon>
    </v-btn>

    <v-btn value="create" :to="{ path: '/'}">
      <span v-if="this.$route.name != 'Create'" style="color: #fff">Create</span>
      <v-icon v-if="this.$route.name != 'Create'" size="24" color="#fff">mdi-barcode</v-icon>
      <v-icon v-else size="24" color="primary">mdi-barcode</v-icon>
    </v-btn>

    <v-btn value="print" :to="{ name: 'Print'}">
      <span v-if="this.$route.name != 'Print'" style="color: #fff">Print</span>
      <v-icon v-if="this.$route.name != 'Print'" size="24" color="#fff">mdi-printer</v-icon>
      <v-icon v-else size="24" color="primary">mdi-printer</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BottomNav extends Vue {}
</script>

<style scoped>

</style>