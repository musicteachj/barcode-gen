<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline top"
          primary-title
        >
          Delete Barcode
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="title cardText mt-4">
         Are you sure you want to delete barcode "{{data}}"?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="text-center">
          <v-spacer></v-spacer>
          <v-btn
            class="mr-6"
            color="primary"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            class="ml-6"
            color="error"
            text
            @click="dialog = false"
          >
            Delete
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class DeleteBarcodeDialog extends Vue {

  

  @Prop()
  dialog: boolean;

  @Prop()
  data: number;

  

}
</script>

<style scoped>
.cardText {
  color: black !important;
}

.top {
  background-color: #303F9F;
  color: white;
}
</style>