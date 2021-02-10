<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogVisible"
      width="500"
      :persistent="true"
    >
      <v-card>
        <v-card-title
          class="dialogTitle"
          primary-title
        >
          <p class="mb-0 mt-n1 font-weight-regular">Delete Barcode</p>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="cardText mt-4">
          <v-row>
            <v-col>
              <v-text-field v-model="data.name" label="Barcode Name" disabled/>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col>
              <v-text-field v-model="data.type" label=" Barcode Type" disabled/>
            </v-col>
          </v-row>
          <v-row class="mt-n8">
            <v-col>
              <v-text-field v-model="data.value" label="Barcode Value" disabled/>
            </v-col>
          </v-row>
          <v-row class="mt-n6 mb-n7">
            <v-col>
              <p>Are you sure you wish to delete this barcode?</p>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="text-center">
          <v-spacer></v-spacer>
          <v-btn
            class="mr-6"
            color="primary"
            text
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            class="ml-6"
            color="error"
            text
            @click="deleteBar"
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
  // Props ---------------------------
  // ---------------------------------
  @Prop({ default: false, required: true })
  dialogVisible!: boolean;

  @Prop({ default: null, required: true })
  data!: number | null;

  // Methods -------------------------
  // ---------------------------------
  /**
   * Emits and closes dialog
   */
  closeDialog() {
    this.$emit("closeDialog", false);
  }

  /**
   * Delete barcode
   * Dispatches store "deleteBarcode" action
   * Reset Store and set snackbar confirmation
   */
  async deleteBar() {
    await this.$store.dispatch("deleteBarcode", {
      barcode: this.data
    }).then((success: any) => {
      this.closeDialog();;
      this.$emit("deleteBar", true);
    })
  }
}
</script>

<style scoped>
.cardText {
  color: #000 !important;
  font-size: 18px !important;
}

.dialogTitle {
  background-color: #303F9F;
  color: #fff;
}
</style>