<template>

<v-bottom-navigation
      hide-on-scroll
      scroll-threshold="800"
      absolute
      color="primary"
      light
      grow
      background-color="primary"
  >
    <v-btn value="scan" :to="{ name: 'Scan'}">
      <span v-if="this.$route.name != 'Scan'" style="color: white" >Scan</span>
      <v-icon v-if="this.$route.name != 'Scan'" color="white">mdi-barcode-scan</v-icon>
      <v-icon v-else color="primary">mdi-barcode-scan</v-icon>
    </v-btn>

    <v-btn value="create" :to="{ path: '/'}">
      <span v-if="this.$route.name != 'Create'" style="color: white" >Create</span>
      <v-icon v-if="this.$route.name != 'Create'" color="white">mdi-barcode</v-icon>
      <v-icon v-else color="primary">mdi-barcode</v-icon>
    </v-btn>

    <v-btn value="print" :to="{ name: 'Print'}">
      <span v-if="this.$route.name != 'Print'" style="color: white" >Print</span>
      <v-icon v-if="this.$route.name != 'Print'" color="white">mdi-printer</v-icon>
      <v-icon v-else color="primary">mdi-printer</v-icon>
    </v-btn>
  </v-bottom-navigation>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class BottomNav extends Vue {}
</script>