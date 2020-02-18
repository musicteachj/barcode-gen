<template>
  <v-bottom-navigation
    v-model="bottomNav"
    dark
    :color="color"
    shift
    fixed="true"
  >
    <v-btn>
      <span>Scan</span>
      <v-icon>mdi-barcode-scan</v-icon>
    </v-btn>

    <v-btn>
      <span>Create</span>
      <v-icon>mdi-barcode</v-icon>
    </v-btn>

    <v-btn>
      <span>Print</span>
      <v-icon>mdi-printer</v-icon>
    </v-btn>

  </v-bottom-navigation>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
 

@Component({})
export default class BottomNav extends Vue {
    bottomNav = 3;

    get color() {
      switch (this.bottomNav) {
        case 0: return 'blue-grey'
        case 1: return 'teal'
        case 2: return 'brown'
        case 3: return 'indigo'
        default: return 'indigo'
      }
    }
}
</script>
