
<template>

<v-bottom-navigation
    scroll-target="#scroll-area-2"
      hide-on-scroll
      scroll-threshold="500"
      absolute
      color="#2E2E2E"
      grow
      dark
  >
    <v-btn value="scan" :to="{ name: 'Scan'}">
      <span>Scan</span>
      <v-icon>mdi-barcode-scan</v-icon>
    </v-btn>

    <v-btn value="create" :to="{ path: '/'}">
      <span>Create</span>
      <v-icon>mdi-barcode</v-icon>
    </v-btn>

    <v-btn value="print" :to="{ name: 'Print'}">
      <span>Print</span>
      <v-icon>mdi-printer</v-icon>
    </v-btn>
  </v-bottom-navigation>

  <!-- <v-bottom-navigation
    app
    fixed
    grow
    v-model="activeItem"
    color="primary"
  >
    <v-btn value="scan" :to="{ name: 'scan'}">
      <span>Scan</span>
      <v-icon>mdi-barcode-scan</v-icon>
    </v-btn>

    <v-btn value="create" :to="{ path: '/'}">
      <span>Create</span>
      <v-icon>mdi-barcode</v-icon>
    </v-btn>

    <v-btn value="print" :to="{ name: 'print'}">
      <span>Print</span>
      <v-icon>mdi-printer</v-icon>
    </v-btn>
  </v-bottom-navigation> -->

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  @Component
  export default class BottomNav extends Vue {
    activeItem: string = 'create';
  }
</script>