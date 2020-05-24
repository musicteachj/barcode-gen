
<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="success"
      top
    >
    <span v-if="deleteText" class="snackText">{{delText}}</span>
    <span v-else class="snackText">{{createText}}</span>
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
  createText: string = 'Barcode Created';
  delText: string = "Barcode Deleted";
  timeout: number = 2000;

}
</script>

<style scoped>
.snackText {
  font-size: 16px !important;
  margin-left: 80px;
}
</style>