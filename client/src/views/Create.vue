<template>
  <v-container>
    <p :class="`text-center font-weight-light text-${pageTitle} mt-4`">Create Barcodes</p>
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
                <v-row>
                  <v-col>
                    <v-text-field
                      prepend-icon="mdi-tag"
                      v-model="name"
                      label="Barcode Name"
                      :rules="nameRules"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      prepend-icon="mdi-barcode"
                      v-model="type"
                      :return-object="true"
                      item-value
                      :items="barcodeTemplates"
                      label="Barcode Type"
                      :rules="typeRules"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-if="type.numOnly"
                      prepend-icon="mdi-card-text"
                      v-model.number="numValue"
                      label="Num Only"
                      :rules="valueRules"
                      required
                      hint="Numbers Only"
                      v-mask="typeMask"
                      ref="numOnlyField"
                    />
                    <v-text-field
                      v-else
                      prepend-icon="mdi-card-text"
                      v-model="stringValue"
                      label="Barcode Value"
                      :rules="valueRules"
                      required
                      hint="Any Character"
                      v-mask="typeMask"
                      ref="anyField"
                    />
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col class="text-center" cols="12" sm="12">
                    <div style="height: 80px">
                      <p v-if="type.type" :class="`font-weight-regular text-${printCardText}`">{{hintText}}</p>
                    </div>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col class="text-center" cols="12" sm="12">
                    <div style="height: 155px">
                      <VueBarcode 
                        v-if="displayBarcode" 
                        class="text-center" 
                        :value="this.stringValue || this.numValue"
                        :format="this.type.type"
                        :width="barcodeWidth(this.type.type)"
                        fontSize="20"
                        :displayValue="true"
                        ref="vueBar"
                      >
                      </VueBarcode>
                    <p v-else :class="`font-weight-regular text-${printCardText}`">Select barcode type and enter value</p>
                    </div>
                  </v-col>
                </v-row>
                <v-row align="center">
                  <v-col class="text-center" cols="12" sm="12">
                    <div>
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
              </v-form>
            </v-col>
            <v-col cols="1" sm="2" md="3" lg="4" xl="4"></v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  <SnackBar :snackbar="snackInit"/>
  </v-container>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
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
export default class Create extends Mixins(ViewsStylings) {
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
  stringValue: string | null = null;
  numValue: number | null = null;
  minNum: number = 0;
  maxNum: number = 0;
  minVal: number | null = null;
  maxVal: number | null = null;
  barcodeTemplates: Array<Object> = [
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

  // Computed ------------------------
  // ---------------------------------
  /**
   * Displays barcode if meets stringValue && numValue specs
   * @returns {boolean}
   */
  get displayBarcode() {
    return (this.stringValue != null && this.stringValue != '') || 
            this.numValue != null ? 
            true : 
            false;
  }

  /**
   * Resets disabled btn if name || type.type is empty string
   * @returns {boolean}
   */
  get resetDisabled() {
    return this.name != '' || this.type.type != '' ? false : true;
  }

  /**
   * Returns character for vue-the-mask based on type Obj numOnly property
   * Repeats character for type value max length
   * @returns {string}
   */
  get typeMask() {
    if (this.type.numOnly) return "#".repeat(this.type.value.max);
    if (!this.type.numOnly) return "X".repeat(this.type.value.max);
  }

  /**
   * Sets barcode value text-field hint for barcode types
   * @returns {string}
   */
  get hintText() {
    if (this.type.type === "CODE128") return `Must be between  ${this.type.value.min} and ${this.type.value.max} characters long`;
    if (this.type.type === "EAN13") return `Enter ${this.type.value.max} numbers.`;
    if (this.type.type === "EAN8") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "EAN5") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "EAN2") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "UPC") return `Enter ${this.type.value.max} numbers`
    if (this.type.type === "CODE39") return `Must be between  ${this.type.value.min} and ${this.type.value.max} characters long`;
    if (this.type.type === "ITF14") return `Enter ${this.type.value.max} numbers`;
    if (this.type.type === "MSI") return `Must be between  ${this.type.value.min} and ${this.type.value.max} digits in length`;
    if (this.type.type === "pharmacode") return `Must be between  ${this.type.value.min} and ${this.type.value.max} digits in length`;
  }

  // Leaving this here for possible future use
  // Routes to barcode types wiki page for more info
  // get typeInfoUrl() {
  //   const baseUrl = "https://en.wikipedia.org/wiki/";

  //   if (this.type.type === "CODE128") return baseUrl + "Code_128"
  //   if (this.type.type === "EAN13") return baseUrl + "International_Article_Number"
  //   if (this.type.type === "EAN8") return baseUrl + "EAN-8"
  //   if (this.type.type === "EAN5") return baseUrl + "EAN-5"
  //   if (this.type.type === "EAN2") return baseUrl + "EAN-2"
  //   if (this.type.type === "UPC") return baseUrl + "Universal_Product_Code"
  //   if (this.type.type === "CODE39") return baseUrl + "Code_39"
  //   if (this.type.type === "ITF14") return baseUrl + "ITF-14"
  //   if (this.type.type === "MSI") return baseUrl + "MSI_Barcode"
  //   if (this.type.type === "pharmacode") return baseUrl + "Pharmacode"
  //   return ""
  // }

  /**
   * Returns true if barcodes Array length >= 20
   * @returns {boolean}
   */
  get excededBarcodeLimit() {
    return this.barcodes.length >= 20 ? true : false;
  }

  /**
   * Returns Array of rules for name text-field
   * @returns {Array}
   */
  get nameRules() {
    const rules: any = [
      (v: any) => !!v || 'Name is required',
      (v: any) => (v && (v.length >= 1 && v.length <= 13)) || `Barcode name must be between 1 and 13 characters`,
    ];
    return rules;
  }

  /**
   * Returns Array of rules for barcode type v-select field
   * @returns {Array}
   */
  get typeRules() {
    const rules: any = [
      (v: any) => !!v || 'Type is required',
      (v: any) => (v && v.value.min !== 0) || `Type must be selected`,
    ];
    return rules;
  };

  /**
   * Returns Array of rules for value text-field
   * @returns {Array}
   */
  get valueRules() {
    let rules: Array<any> = [(v: any) => !!v || 'Value is required'];

    if (this.minNum === this.maxNum) {
      //@ts-ignore
      rules.push((v: any) => (v && v.length === this.minNum && this.$refs["vueBar"].valid === true) || `Match value to barcode once it appears`);
    } else {
      rules.push((v: any) => (v && (v.length >= this.minNum && v.length <= this.maxNum)) || `Barcode value must be between ${this.minNum} and ${this.maxNum} characters`)
    }

    if (this.minVal !== null) {
      //@ts-ignore
      rules.push((v: any) => (v && (v >= this.minVal && v <= this.maxVal)) || `Barcode value must be between ${this.minVal} and ${this.maxVal}`)
    }

    return rules;
  };

  // Watchers ------------------------
  // ---------------------------------
  /**
   * Watch var type Obj
   * Sets fields for anytime type Obj changes
   * Accounts for vue-the-mask bug (not emptying fields)
   */
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
  };

  /**
   * Watch var name string
   * Reset the form if name is empty string
   */
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
  }
  
  // Methods -------------------------
  // ---------------------------------
  /**
   * Resets form fields
   */
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

  /**
   * Builds and returns barcode save Object
   */
  buildBarcode() {
    let bar = {
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

  /**
   * Saves barcode
   * Dispatches store "saveBarcode" action
   * Reset Store and set snackbar confirmation
   */
  async saveBarcode() {
    await this.$store.dispatch("saveBarcode", {
      barcode: this.buildBarcode()
    }).then((success: any) => {
      this.resetForm();
      this.snackInit = true;
      setTimeout(() => {
        this.snackInit = false
      }, 7000);
    })
  }
}
</script>

<style scoped>

</style>