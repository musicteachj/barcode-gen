<template>
  <v-container>
  <p class="text-center pageTitle">{{this.window.width}} {{this.window.height}}</p>
  <v-card
    class="mx-auto"
    max-width="800"
    flat
  >
    <v-container fluid>
      <v-row>
        <v-col cols="1">
        </v-col>
        <v-col cols="10">
          <!-- NON 4K SCREENS -->
          <v-form
            v-if="this.window.width <= 2999"
            ref="form"
            v-model="valid"
          >
            <v-row class="nameRow">
              <v-text-field
                prepend-icon="mdi-tag"
                class="nameInput"
                v-model="name"
                label="Barcode Name"
                :rules="nameRules"
                required
                :disabled="excededBarcodeLimit"
              ></v-text-field>
            </v-row>
            <v-row v-if="name != ''" class="typeRow">
              <v-select
                prepend-icon="mdi-barcode"
                class="typeInput"
                v-model="type"
                :return-object="true"
                item-value
                :items="items2"
                label="Barcode Type"
                :rules="typeRules"
                required
              ></v-select>
            </v-row>
            <v-row v-if="type.value.min != 0" class="valueRow">
              <v-text-field
                v-if="type.numOnly"
                prepend-icon="mdi-card-text"
                class="valueInput"
                v-model.number="numValue"
                label="Num Only"
                :rules="valueRules"
                required
                :type="charType"
                hint="Will autopopulate to nearest valid barcode"
                v-mask="typeMask"
              ></v-text-field>
              <v-text-field
                v-else
                prepend-icon="mdi-card-text"
                class="valueInput"
                v-model="value"
                label="Barcode Value"
                :rules="valueRules"
                required
                :type="charType"
                hint="Will autopopulate to nearest valid barcode"
              ></v-text-field>
            </v-row>
            <v-row align="center">
              <v-col class="text-center" cols="12" sm="12">
                <div class="my-2">
                  <v-btn v-if="name.length > 0" @click="resetForm" color="error" :disabled="excededBarcodeLimit" class="appBtn">Reset</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>

          <!-- 4K SCREENS -->
          <v-form
            v-else
            ref="form"
            v-model="valid"
          >
            <v-row class="nameRow">
              <v-col cols="2">
                <v-icon :size="dynamicBNavIcon" class="nameIcon">mdi-tag</v-icon>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  class="nameInput"
                  v-model="name"
                  label="Barcode Name"
                  :rules="nameRules"
                  required
                  :disabled="excededBarcodeLimit"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="name != ''" class="typeRow">
              <v-col cols="2">
                <v-icon :size="dynamicBNavIcon" class="typeIcon">mdi-barcode</v-icon>
              </v-col>
              <v-col cols="10">
                <v-select
                  class="typeInput"
                  v-model="type"
                  :return-object="true"
                  item-value
                  :items="items2"
                  label="Barcode Type"
                  :rules="typeRules"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="type.value.min != 0" class="valueRow">
              <v-col cols="2">
                <v-icon :size="dynamicBNavIcon" class="valueIcon">mdi-card-text</v-icon>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  class="valueInput"
                  v-model="value"
                  label="Barcode Value"
                  :rules="valueRules"
                  required
                  :type="charType"
                  hint="Will autopopulate to nearest valid barcode"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col class="text-center" cols="12" sm="12">
                <div class="my-2">
                  <v-btn v-if="name.length > 0" @click="resetForm" color="error" :disabled="excededBarcodeLimit" class="appBtn">Reset</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-form>

          <VueBarcode 
            v-if="this.value != '' || this.numValue != 0" 
            class="text-center" 
            :value="this.value || this.numValue"
            :format="this.type.type"
            :height="barcodeHeight"
            :width="barcodeWidth"
            :fontSize="barcodeFontSize"
            >
            <p class="noScannerMsg">{{hintText}}</p>
            <p class="noScannerMsg">Need info on this type? Click <a target="_blank" :href="typeInfoUrl">here</a></p>
          </VueBarcode>

          <div v-if="this.barcodes.length >= 20">
            <p class="noScannerMsg text-center">Exceeded Barcode Limit Of 20</p>
            <p class="noScannerMsg text-center mt-6">Head To Print Page And Delete Some!</p>
          </div>

          <v-row align="center" v-if="this.name != '' && this.type.value != ''">
            <v-col class="text-center" cols="12" sm="12">
              <div class="my-2">
                <v-btn 
                  :disabled="!valid"
                  @click="saveBarcode" 
                  color="primary"
                  class="appBtn"
                >
                  Save
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="1">
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <SnackBar :snackbar="snackInit"/>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import VueBarcode from 'vue-barcode';
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'vuex';
import SnackBar from '@/components/SnackBar.vue';
import { mask } from 'vue-the-mask';

@Component({
  components: {
    VueBarcode,
    SnackBar
  },
  computed: {
    ...mapState(["barcodes"])
  },
  directives: { 
    mask 
  }
})
export default class Create extends Vue {
  // Mapped Variables ----------------
  // ---------------------------------
  barcodes!: any;

  // Local Variables -----------------
  // ---------------------------------
  valid: boolean = false;
  name: string = "";
  type: any = {
    text: "", 
    type: "", 
    numOnly: null, 
    value: {
      min: 0, 
      max: 0
    },
    intContraints: {
      minValue: null,
      maxValue: null
    }
  };
  value: string = '';
  numValue: number = 0;
  minNum: number = 0;
  maxNum: number = 0;
  minVal: number = null;
  maxVal: number = null;
  items2: Array<object> = [
    {text: "CODE128", type: "CODE128", numOnly: false, value: {min:3, max:13}, intContraints: {minValue: null, maxValue: null}},
    {text: "EAN-13",  type: "EAN13", numOnly: true, value: {min:13, max:13}, intContraints: {minValue: null, maxValue: null}},
    {text: "EAN-8",  type: "EAN8", numOnly: true, value: {min:8, max:8}, intContraints: {minValue: null, maxValue: null}},
    {text: "EAN-5",  type: "EAN5", numOnly: true, value: {min:5, max:5}, intContraints: {minValue: null, maxValue: null}},
    {text: "EAN-2",  type: "EAN2", numOnly: true, value: {min:2, max:2}, intContraints: {minValue: null, maxValue: null}},
    {text: "UPC (A)",  type: "UPC", numOnly: true, value: {min:12, max:12}, intContraints: {minValue: null, maxValue: null}},
    {text: "CODE39",  type: "CODE39", numOnly: false, value: {min:1, max:13}, intContraints: {minValue: null, maxValue: null}},
    {text: "ITF-14",  type: "ITF14", numOnly: true, value: {min:14, max:14}, intContraints: {minValue: null, maxValue: null}},
    {text: "MSI",  type: "MSI", numOnly: true, value: {min:1, max:12}, intContraints: {minValue: null, maxValue: null}},
    {text: "Pharmacode",  type: "pharmacode", numOnly: true, value: {min:1, max:6}, intContraints: {minValue: 3, maxValue: 131070}}
  ];
  snackInit: boolean = false;
  window: any = {
    width: 0,
    height: 0
  }

  // Computed ------------------------
  // ---------------------------------
  get typeMask() {
    if (this.type.numOnly) return "#".repeat(this.type.value.max);
    if (!this.type.numOnly) return "S".repeat(this.type.value.max);
    return "";
  }

  get hintText() {
    if (this.type.type === "CODE128") return `Must be between  ${this.type.value.min} and ${this.type.value.max} long and any character`;
    if (this.type.type === "EAN13") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "EAN8") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "EAN5") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "EAN2") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "UPC") return `Enter ${this.type.value.max} numbers`
    if (this.type.type === "CODE39") return `Must be between  ${this.type.value.min} and ${this.type.value.max} long and any character`;
    if (this.type.type === "ITF14") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "MSI") return 
    if (this.type.type === "pharmacode") return `Must be between  ${this.type.value.min} and ${this.type.value.max} long and numbers only`
    return ""
  }

  get typeInfoUrl() {
    const baseUrl = "https://en.wikipedia.org/wiki/";

    if (this.type.type === "CODE128") return baseUrl + "Code_128"
    if (this.type.type === "EAN13") return baseUrl + "International_Article_Number"
    if (this.type.type === "EAN8") return baseUrl + "EAN-8"
    if (this.type.type === "EAN5") return baseUrl + "EAN-5"
    if (this.type.type === "EAN2") return baseUrl + "EAN-2"
    if (this.type.type === "UPC") return baseUrl + "Universal_Product_Code"
    if (this.type.type === "CODE39") return baseUrl + "Code_39"
    if (this.type.type === "ITF14") return baseUrl + "ITF-14"
    if (this.type.type === "MSI") return baseUrl + "MSI_Barcode"
    if (this.type.type === "pharmacode") return baseUrl + "Pharmacode"
    return ""
  }

  get barcodeFontSize() {
    if (this.window.width >= 4096) return "50"
    if (this.window.width >= 3840 && this.window.width <= 4095) return "40"
    if (this.window.width >= 2560 && this.window.width <= 3839) return "30"
    return "20"
  }

  get barcodeWidth() {
    return this.window.width <= 440 ? "1" : "2";
  }

  get barcodeHeight() {
    return this.window.width >= 4096 ? "200" : "100";
  }

  get dynamicBNavIcon() {
    return this.window.width >= 3000 ? "60" : "20";
  }

  get charType() {
    return this.type.numOnly ? "number" : "any";
  }

   get excededBarcodeLimit() {
    return this.barcodes.length >= 20 ? true : false;
  }

  get nameRules() {
    let rules: any = [
      v => !!v || 'Name is required',
      v => (v && (v.length >= 1 && v.length <= 13)) || `Barcode name must be between 1 and 13 characters`,
    ];
    return rules;
  }

  get typeRules() {
    let rules: any = [
      v => !!v || 'Type is required',
      v => (v && v.value.min !== 0) || `Type must be selected`,
    ];
    return rules;
  };

  get valueRules() {
    let rules: Array<any> = [v => !!v || 'Value is required'];

    
    if (this.minNum === this.maxNum) {
      rules.push(v => (v && v.length === this.minNum) || `Barcode value must be ${this.minNum} characters`)
    } else {
      rules.push(v => (v && (v.length >= this.minNum && v.length <= this.maxNum)) || `Barcode value must be between ${this.minNum} and ${this.maxNum} characters`)
    }

    if (this.minVal !== null) {
      rules.push(v => (v && (v >= this.minVal && v <= this.maxVal)) || `Barcode value must be between ${this.minVal} and ${this.maxVal}`)
    }

    return rules;
  };

  // Watchers ------------------------
  // ---------------------------------
  @Watch("type")
  typeChange() {
    this.value = '';
    this.minNum = this.type.value.min;
    this.maxNum = this.type.value.max;

    this.minVal = this.type.intContraints.minValue;
    this.maxVal = this.type.intContraints.maxValue;
  };

  // Lifecycle Events ----------------
  // ---------------------------------
  created() {
    this.$store.dispatch("retrieveBarcodes");
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }
  
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  }
  
  // Methods -------------------------
  // ---------------------------------
  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }

  resetForm() {
    this.name = '';
    this.type = {
      text: "", 
      type: "", 
      numOnly: null, 
      value: {
        min: 0, 
        max: 0
      },
      intContraints: {
        minValue: null,
        maxValue: null
      }
    };
    this.value = '';
    this.numValue = 0;
  }

  buildBarcode() {
    const bar = {
      id: uuidv4(),
      name: this.name,
      type: this.type.type,
      value: this.value || this.numValue
    };
    return bar;
  }

  async saveBarcode() {
    await this.$store.dispatch("saveBarcode", {
      barcode: this.buildBarcode()
    }).then(success => {
      this.resetForm();
      this.snackInit = true;
      setTimeout(() => {
        this.snackInit = false
      }, 2000);
    })
  }
}
</script>

<style scoped>

</style>