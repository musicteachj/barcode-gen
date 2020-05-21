<template>
  <div class="text-center">
    <v-dialog
      v-model="dialogVisible"
      :width="dialogWidth"
      
    >
      <v-card>
        <v-card-title
          class="dialogTitle"
          primary-title
        >
          Delete Barcode
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="cardText mt-4">
          Are you sure you want to delete barcode <span style="font-weight: bold">"{{data.name}}"</span>?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="text-center">
          <v-spacer></v-spacer>
          <v-btn
            class="mr-6 cancelBtn"
            color="primary"
            text
            @click="closeDialog"
          >
            Cancel
          </v-btn>
          <v-btn
            class="ml-6 deleteBtn"
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

  @Prop({ default: false })
  dialogVisible: boolean;

  @Prop({ default: null })
  data: number;

  window: any = {
    width: 0,
    height: 0
  }

  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }

  get dialogWidth() {
    if (this.window.width >= 4096) {
      return "900"
    } else if (this.window.width >= 3840 && this.window.width <= 4095) {
      return "800"
    } else if (this.window.width >= 2560 && this.window.width <= 3839) {
      return "700"
    } else {
      return "500"
    }
  }

  closeDialog() {
    this.$emit("closeDialog", false);
  }

  async deleteBar() {
    await this.$store.dispatch("deleteBarcode", {
      barcode: this.data
    }).then(success => {
      this.closeDialog();;
      this.$emit("deleteBar", true);
    })
  }

}
</script>

<style scoped>
.cardText {
  color: black !important;
  font-size: 18px !important;
  font-weight: 500;
}

.dialogTitle {
  background-color: #303F9F;
  color: white;
  font-weight: 500;
  font-size: 26px !important;
}

@media screen and (max-width: 4096px) and (min-height: 2160px) and (max-height: 2304px) {
  .dialogTitle {
    background-color: #303F9F;
    color: white;
    font-weight: 500;
    font-size: 44px !important;
    height: 100px;
  }
  .cardText {
    font-weight: 500;
    font-size: 38px;
    line-height: 140%;
  }
  .cancelBtn, .deleteBtn {
    font-size: 22px !important;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 3840px) and (min-height: 2000px) and (max-height: 2160px) {
  .dialogTitle {
    background-color: #303F9F;
    color: white;
    font-weight: 500;
    font-size: 44px !important;
    height: 100px;
  }
  .cardText {
    font-weight: 500;
    font-size: 38px !important;
    line-height: 140%;
  }
  .cancelBtn, .deleteBtn {
    font-size: 22px !important;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 3000px) and (min-height: 1600px) and (max-height: 2000px) {
  .dialogTitle {
    background-color: #303F9F;
    color: white;
    font-weight: 500;
    font-size: 38px !important;
    height: 80px;
  }
  .cardText {
    font-weight: 500;
    font-size: 30px !important;
    line-height: 140%;
  }
  .cancelBtn, .deleteBtn {
    font-size: 18px !important; 
  }
}
</style>