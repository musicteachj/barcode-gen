
<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="#2E7D32"
      top
    >
    <span v-if="deleteText" class="snackText">{{delText}}</span>
    <span v-else class="snackText">{{createText}}</span>
    <template v-slot:action="{ attrs }">
        <v-btn
          color="#fff"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SnackBar extends Vue {
  // Props ---------------------------
  // ---------------------------------
  @Prop({ default: false})
  snackbar!: boolean;

  @Prop({ default: false})
  deleteText!: boolean;

  // Local Variables -----------------
  // ---------------------------------
  createText: string = 'Barcode Added To Print Page';
  delText: string = "Barcode Deleted";
  timeout: number = 7000;

}
</script>

<style scoped>
.snackText {
  font-size: 16px !important;
}
</style>