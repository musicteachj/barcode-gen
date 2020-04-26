
<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="success"
      top
    >
    <span class="snackText">{{text}}</span>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SnackBar extends Vue {

  @Prop({ default: false})
  snackbar!: boolean;

  // Local variables -----
  text: string = 'Barcode Created'
  timeout: number = 200000;

}
</script>

<style scoped>
.snackText {
  font-size: 16px !important;
  margin-left: 80px;
}
</style>