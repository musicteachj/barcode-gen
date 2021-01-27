<template>
  <v-container>
    <!-- <p :class="`text-center font-weight-light text-${pageTitle} mt-4`">{{this.window.width}} {{this.window.height}}</p> -->
    <p :class="`text-center font-weight-light text-${pageTitle} mt-4`">New Create Barcodes</p>

    <v-row>
      <v-col>
        <div v-if="excededBarcodeLimit">
          <p :class="`font-weight-light text-${pageSubText} text-center mt-6`">Exceeded Barcode Limit Of 20</p>
          <p :class="`font-weight-light text-${pageSubText} text-center mt-6`">Head To Print Page And Delete Some!</p>
        </div>
        <div v-else>
          <v-row>
            <v-col cols="1" sm="2" md="3" lg="4" xl="4"></v-col>
            <v-col cols="10" sm="8" md="6" lg="4" xl="4">
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-row class="nameRow mt-1">
                  <v-text-field
                    prepend-icon="mdi-tag"
                    class="nameInput"
                    v-model="name"
                    label="Barcode Name"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-row>
                <v-row class="typeRow mt-3">
                  <v-select
                    prepend-icon="mdi-barcode"
                    class="typeInput"
                    v-model="type"
                    :return-object="true"
                    item-value
                    :items="barcodeTemplates"
                    label="Barcode Type"
                    :rules="typeRules"
                    required
                  ></v-select>
                </v-row>
                <v-row class="valueRow mt-3">
                  <v-text-field
                    v-if="type.numOnly"
                    prepend-icon="mdi-card-text"
                    class="valueInput"
                    v-model.number="numValue"
                    label="Num Only"
                    :rules="valueRules"
                    required
                    hint="Numbers Only"
                    v-mask="typeMask"
                    ref="numOnlyField"
                  ></v-text-field>
                  <v-text-field
                    v-else
                    prepend-icon="mdi-card-text"
                    class="valueInput"
                    v-model="stringValue"
                    label="Barcode Value"
                    :rules="valueRules"
                    required
                    hint="Any Character"
                    v-mask="typeMask"
                    ref="anyField"
                  ></v-text-field>
                </v-row>
                <v-row class="mt-2 mb-2" align="center">
                  <v-col class="text-center" cols="12" sm="12">
                    <div class="my-2 hintDiv">
                      <p v-if="type.type" class="mt-6 noScannerMsg">{{hintText}}</p>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
              <div class="barcodeContainer">
                <VueBarcode 
                  v-if="displayBarcode" 
                  class="text-center" 
                  :value="this.stringValue || this.numValue"
                  :format="this.type.type"
                  :width="barcodeWidth"
                  fontSize="20"
                  :displayValue="true"
                  ref="vueBar"
                >
                </VueBarcode>
              <p class="text-center" v-else>Select barcode type and enter value</p>
              </div>
              
              <v-row align="center">
                <v-col class="text-center" cols="12" sm="12">
                  <div class="my-2">
                    <v-btn  
                      @click="resetForm" 
                      color="error" 
                      :disabled="resetDisabled" 
                      class="mr-3"
                      :large="this.$vuetify.breakpoint.name === 'lg'"
                      :x-large="this.$vuetify.breakpoint.name === 'xl'"
                    >
                      Reset
                    </v-btn>
                    <v-btn 
                      :disabled="!valid"
                      @click="saveBarcode" 
                      color="primary"
                      class="ml-3"
                      :large="this.$vuetify.breakpoint.name === 'lg'"
                      :x-large="this.$vuetify.breakpoint.name === 'xl'"
                    >
                      Save
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" sm="2" md="3" lg="4" xl="4"></v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>



  <!-- <v-card
    class="mx-auto"
    max-width="800"
    flat
  >
    <v-container fluid>
      <v-row>
        <v-col cols="1">
        </v-col>
        <v-col cols="10">
          <v-form
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
            <v-row v-if="type.value.min != 0 && this.name != ''" class="valueRow">
              <v-text-field
                v-if="type.numOnly"
                prepend-icon="mdi-card-text"
                class="valueInput"
                v-model.number="numValue"
                label="Num Only"
                :rules="valueRules"
                required
                hint="Numbers Only"
                v-mask="typeMask"
                ref="numOnlyField"
              ></v-text-field>
              <v-text-field
                v-else
                prepend-icon="mdi-card-text"
                class="valueInput"
                v-model="stringValue"
                label="Barcode Value"
                :rules="valueRules"
                required
                hint="Any Character"
                v-mask="typeMask"
                ref="anyField"
              ></v-text-field>
            </v-row>
            <v-row align="center">
              <v-col class="text-center" cols="12" sm="12">
                <div class="my-2">
                  <p v-if="type.type" class="mt-6 noScannerMsg">{{hintText}}</p>
                </div>
              </v-col>
            </v-row>
          </v-form>


          <VueBarcode 
            v-if="this.stringValue != null || this.numValue != null" 
            class="text-center" 
            :value="this.stringValue || this.numValue"
            :format="this.type.type"
            :height="barcodeHeight"
            :width="barcodeWidth"
            :fontSize="barcodeFontSize"
            :displayValue="true"
            ref="vueBar"
            >
          </VueBarcode>

          <div v-if="this.barcodes.length >= 20">
            <p class="noScannerMsg text-center">Exceeded Barcode Limit Of 20</p>
            <p class="noScannerMsg text-center mt-6">Head To Print Page And Delete Some!</p>
          </div>

          <v-row align="center" v-if="this.name != '' && this.type.type != ''">
            <v-col class="text-center" cols="12" sm="12">
              <div class="my-2">
                <v-btn v-if="name.length > 0" @click="resetForm" color="error" :disabled="excededBarcodeLimit" class="appBtn mr-3">Reset</v-btn>
                <v-btn 
                  :disabled="!valid"
                  @click="saveBarcode" 
                  color="primary"
                  class="appBtn ml-3"
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
  </v-card> -->

  <SnackBar :snackbar="snackInit"/>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator';
import VueBarcode from 'vue-barcode';
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'vuex';
import SnackBar from '../components/SnackBar.vue';
import { mask } from 'vue-the-mask';
import ViewsStylings from "../mixins/ViewsStylings.vue";

const cdigit = require('cdigit');

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
export default class NewCreate extends Mixins(ViewsStylings) {
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
    },
    checkDigit: null
  };
  stringValue: string = null;
  numValue: number = null;
  minNum: number = 0;
  maxNum: number = 0;
  minVal: number = null;
  maxVal: number = null;
  barcodeTemplates: Array<object> = [
    {
      text: "CODE128", 
      type: "CODE128", 
      numOnly: false, 
      value: {
        min:1, 
        max:13
      }, 
      intContraints: {
        minValue: null, 
        maxValue: null
      },
      checkDigit: false
    },
    {
      text: "EAN-13", 
      type: "EAN13", 
      numOnly: true, 
      value: {
        min:12, 
        max:12
      }, 
      intContraints: {
        minValue: null, 
        maxValue: null
      },
      checkDigit: true
    },
    {
      text: "EAN-8", 
      type: "EAN8", 
      numOnly: true, 
      value: {
        min:7, 
        max:7
      }, 
      intContraints: {
        minValue: null, 
        maxValue: null
      },
      checkDigit: true
    },
    {
      text: "EAN-5", 
      type: "EAN5", 
      numOnly: true, 
      value: {
        min:5, 
        max:5
      }, 
      intContraints: {
        minValue: null, 
        maxValue: null
      },
      checkDigit: false
    },
    {
      text: "EAN-2", 
      type: "EAN2", 
      numOnly: true, 
      value: {
        min:2, 
        max:2
      }, 
      intContraints: {
        minValue: null, 
        maxValue: null
      },
      checkDigit: false
    },
    {
      text: "UPC (A)", 
      type: "UPC", 
      numOnly: true, 
      value: {
        min:11, 
        max:11
      }, 
      intContraints: {
        minValue: null, 
        maxValue: null
      },
      checkDigit: true
    },
    {
      text: "CODE39", 
      type: "CODE39", 
      numOnly: false, 
      value: {
        min:1, 
        max:13
      }, 
      intContraints: {
        minValue: null, 
        maxValue: null
      },
      checkDigit: false
    },
    {
      text: "ITF-14", 
      type: "ITF14", 
      numOnly: true, 
      value: {
        min:13, 
        max:13
      }, 
      intContraints: {
        minValue: null, 
        maxValue: null
      },
      checkDigit: true
    },
    {
      text: "MSI", 
      type: "MSI", 
      numOnly: true, 
      value: {
        min:1, 
        max:12
      }, 
      intContraints: {
        minValue: null, 
        maxValue: null
      },
      checkDigit: false
    },
    {
      text: "Pharmacode", 
      type: "pharmacode", 
      numOnly: true, 
      value: {
        min:1, 
        max:6
      }, 
      intContraints: {
        minValue: 3,
        maxValue: 131070
      },
      checkDigit: false
    }
  ];
  snackInit: boolean = false;
  window: any = {
    width: 0,
    height: 0
  }
  // match: any = 0;

  // Computed ------------------------
  // ---------------------------------
  // get checkDig() {
  //   if (this.type.checkDigit) {
  //     return cdigit.gtin.generate(this.numValue);
  //   } else {
  //     return "no check"
  //   }
  //   //  if (this.type.type === "EAN8") {
  //   //   return cdigit.gtin.generate(this.numValue);
  //   // }
  // }

  get displayBarcode() {
    // if (
    //   (this.stringValue != null && this.stringValue != '') ||
    //   this.numValue != null
    // ) {
    //   return true
    // } else {
    //   return false
    // }

    return (this.stringValue != null && this.stringValue != '') || 
            this.numValue != null ? 
            true : 
            false;
    // return this.stringValue != null || 
    //        this.numValue != null ||
    //        this.stringValue != '';
  }
  get resetDisabled() {
    return this.name != '' || this.type.type != '' ? false : true;
  }

  get typeMask() {
    if (this.type.numOnly) return "#".repeat(this.type.value.max);
    if (!this.type.numOnly) return "X".repeat(this.type.value.max);
    return "";
  }

  get hintText() {
    if (this.type.type === "CODE128") return `Must be between  ${this.type.value.min} and ${this.type.value.max} characters long`;
    if (this.type.type === "EAN13") return `Enter ${this.type.value.max} numbers. Barcode will display nearest valid value for type.`;
    if (this.type.type === "EAN8") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "EAN5") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "EAN2") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "UPC") return `Enter ${this.type.value.max} numbers`
    if (this.type.type === "CODE39") return `Must be between  ${this.type.value.min} and ${this.type.value.max} characters long`;
    if (this.type.type === "ITF14") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "MSI") return `Must be between  ${this.type.value.min} and ${this.type.value.max} digits in length`;
    if (this.type.type === "pharmacode") return `Must be between  ${this.type.value.min} and ${this.type.value.max} digits in length`;
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

  // get barcodeFontSize() {
  //   if (this.window.width >= 4096) return "50"
  //   if (this.window.width >= 3840 && this.window.width <= 4095) return "40"
  //   if (this.window.width >= 2560 && this.window.width <= 3839) return "30"
  //   return "20"
  // }

  // get barcodeWidth() {
  //   return this.window.width <= 440 ? "1" : "2";
  // }

  // get barcodeHeight() {
  //   return this.window.width >= 4096 ? "200" : "100";
  // }

  // get dynamicBNavIcon() {
  //   return this.window.width >= 3000 ? "60" : "20";
  // }

  // get charType() {
  //   return this.type.numOnly ? "number" : "any";
  // }

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

  // testRules() {
  //   if (this.type.numOnly) return [v => !!v || 'Numbers Only. Value is required'];
  //   if (!this.type.numOnly) return [v => !!v || 'Any Character. Value is required'];
  // }

  // get ttt() {
  //   // let match = null;
  //   // if (this.$refs["vueBar"]) {
  //   //   return "ref";
  //   //   // if (this.$refs["vueBar"].$el.innerText) {
  //   //   //   match = this.$refs["vueBar"].$el.innerText
  //   //   //   console.log(match);
  //   //   //   return match;
  //   //   // } else {
  //   //   //   console.log("nothing");
  //   //   //   return ""
  //   //   // }
  //   // } else {
  //   //   return "not loaded yet";
  //   // }
  //   // // return match;
  //   if (this.$refs["vueBar"]) {
  //     // @ts-ignore
  //     return this.$refs["vueBar"].$el.innerText;
  //   }
  //   return "";
  // }

  get valueRules() {
    let rules: Array<any> = [v => !!v || 'Value is required'];
    // let rules :Array<any> = this.testRules();

    // rules.push(v => (v && this.$refs["vueBar"].valid === true) || `test match`);

    // let match = null;
    // if (this.$refs["vueBar"].$el.innerText) {
    //   match = this.$refs["vueBar"].$el.innerText
    // }

    if (this.minNum === this.maxNum) {
      rules.push(v => (v && v.length === this.minNum && this.$refs["vueBar"].valid === true) || `Match value to barcode once it appears`);
      // rules.push(v => (v && (v === this.ttt())))
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
    this.stringValue = null;
    this.numValue = null;
    this.minNum = this.type.value.min;
    this.maxNum = this.type.value.max;

    this.minVal = this.type.intContraints.minValue;
    this.maxVal = this.type.intContraints.maxValue;
    
    // vue-the-mask bug
    // fails to empty field
    //empty string and num value on type change
    if (this.$refs["numOnlyField"]) {
      // @ts-ignore
      this.$refs["numOnlyField"].clearableCallback();
    }

    if (this.$refs["anyField"]) {
      // @ts-ignore
      this.$refs["anyField"].clearableCallback();
    }
    // console.log(this.$refs["vueBar"]);
    // this.ttt();
  };

  @Watch("name")
  resetOnEmptyName() {
    if (this.name == "") {
      this.resetForm();
    }
  }

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
      },
      checkDigit: null
    };
    this.stringValue = null;
    this.numValue = null;
  }

  buildBarcode() {
    const bar = {
      id: uuidv4(),
      name: this.name,
      type: this.type.type,
      value: this.stringValue || this.numValue
    };
    if (this.type.checkDigit) {
      bar.value = cdigit.gtin.generate(bar.value);
    }
    return bar;
  }

  async saveBarcode() {
    console.log(this.buildBarcode());
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
.barcodeContainer {
  height: 155px;
  /* border: 1px solid black; */
}

.hintDiv {
  height: 70px;
  /* border: 1px solid black; */
}

</style>