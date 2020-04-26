<template>
  <v-container>
  <p class="display-4 text-center">Create Barcodes</p>
  
  <v-card
    class="mx-auto"
    max-width="800"
    flat
  >
    <v-container fluid>
      <v-row>
        <v-col cols="2">
        </v-col>

        <v-col cols="8">
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-text-field
              v-model="name"
              label="Name"
              :rules="nameRules"
              required
              prepend-icon="mdi-tag"
              :disabled="excededBarcodeLimit"
            ></v-text-field>

            <v-select
              v-if="name != ''"
              v-model="type"
              :return-object="true"
              item-value
              :items="items2"
              label="Type"
              :rules="typeRules"
              required
              prepend-icon="mdi-barcode"
            ></v-select>

            <v-text-field
              v-if="type.value.min != 0"
              v-model="value"
              label="Value"
              :rules="valueRules"
              required
              :type="charType"
              prepend-icon="mdi-card-text"
            ></v-text-field>

            <v-row align="center">
            <v-col class="text-center" cols="12" sm="12">
              <div class="my-2">
                <v-btn v-if="name.length > 0" @click="resetForm" color="error" :disabled="excededBarcodeLimit">Reset</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>

        <VueBarcode 
          v-if="this.value != ''" 
          class="text-center" 
          :value="this.value"
          :format="this.type.type"
          >
          Please enter a valid value for this barcode type.
        </VueBarcode>

        <div v-if="this.barcodes.length >= 20">
          <p class="display-2 text-center">Exceeded Barcode Limit Of 20</p>
          <p class="display-1 text-center mt-6">Head To Print Page And Delete Some!</p>
        </div>

        <v-row align="center" v-if="this.name != '' && this.type.value != ''">
            <v-col class="text-center" cols="12" sm="12">
              <div class="my-2">
                <v-btn 
                  :disabled="!valid"
                  @click="saveBarcode" 
                  color="primary"
                >
                  Save
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="2">
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

@Component({
  components: {
    VueBarcode,
    SnackBar
  },
  computed: {
    ...mapState(["barcodes"])
  }
})
export default class Create extends Vue {
  // Mapped variables -----
  barcodes!: any;

  // Local variables -----
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
  value: string = "";
  minNum: number = 0;
  maxNum: number = 0;
  minVal: number = null;
  maxVal: number = null;
  items2: Array<object> = [
    {text: "CODE128", type: "CODE128", numOnly: false, value: {min:3, max:30}, intContraints: {minValue: null, maxValue: null}},
    {text: "EAN-13",  type: "EAN13", numOnly: true, value: {min:13, max:13}, intContraints: {minValue: null, maxValue: null}},
    {text: "EAN-8",  type: "EAN8", numOnly: true, value: {min:7, max:7}, intContraints: {minValue: null, maxValue: null}},
    {text: "EAN-5",  type: "EAN5", numOnly: true, value: {min:5, max:5}, intContraints: {minValue: null, maxValue: null}},
    {text: "EAN-2",  type: "EAN2", numOnly: true, value: {min:2, max:2}, intContraints: {minValue: null, maxValue: null}},
    {text: "UPC (A)",  type: "UPC", numOnly: true, value: {min:12, max:12}, intContraints: {minValue: null, maxValue: null}},
    {text: "CODE39",  type: "CODE39", numOnly: false, value: {min:1, max:39}, intContraints: {minValue: null, maxValue: null}},
    {text: "ITF-14",  type: "ITF14", numOnly: true, value: {min:14, max:14}, intContraints: {minValue: null, maxValue: null}},
    {text: "MSI",  type: "MSI", numOnly: true, value: {min:1, max:12}, intContraints: {minValue: null, maxValue: null}},
    {text: "Pharmacode",  type: "pharmacode", numOnly: true, value: {min:1, max:6}, intContraints: {minValue: 3, maxValue: 131070}}
  ];
  snackInit: boolean = false;

  // Computed -----
  get charType() {
    if (this.type.numOnly === true) {
      return 'number'
    } else {
      return 'any'
    }
  }

   get excededBarcodeLimit() {
    if (this.barcodes.length >= 20) {
      return true
    } else {
      return false
    }
  }

  get nameRules() {
    let rules = [v => !!v || 'Name is required',
                 v => (v && (v.length >= 1 && v.length <= 25)) || `Barcode name must be between 1 and 25 characters`,
                ];
    return rules;
  }

  get typeRules() {
    let rules = [v => !!v || 'Type is required',
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

  // Watchers -----
  @Watch("type")
  typeChange() {
    this.value = '';
    this.minNum = this.type.value.min;
    this.maxNum = this.type.value.max;

    this.minVal = this.type.intContraints.minValue;
    this.maxVal = this.type.intContraints.maxValue;
  };
  
 // Methods -----
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
  }

  buildBarcode() {
    const bar = {
      id: uuidv4(),
      name: this.name,
      type: this.type.type,
      value: this.value
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
      }, 200000);
    })
  }

  // Lifecycle events -----
  created() {
    this.$store.dispatch("retrieveBarcodes");
  }
}
</script>

<style scoped>

</style>