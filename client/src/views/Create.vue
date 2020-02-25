<template>
  <v-container>
    <p class="display-4 text-center">Create Barcodes</p>
  
  <v-card
    class="mx-auto"
    max-width="800"
    flat
  >
    <!-- <v-system-bar
      color="indigo darken-2"
      dark
    >
      <v-spacer></v-spacer>

      <v-icon>mdi-window-minimize</v-icon>

      <v-icon>mdi-window-maximize</v-icon>

      <v-icon>mdi-close</v-icon>
    </v-system-bar>

    <v-toolbar
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Discover</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar> -->

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
            ></v-select>

            <v-text-field
              v-if="type.value.min != 0"
              v-model="value"
              label="Value"
              :rules="valueRules"
              required
            ></v-text-field>

             <v-row align="center">
              <v-col class="text-center" cols="12" sm="12">
                <div class="my-2">
                  <v-btn @click="resetForm" color="error">Reset</v-btn>
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
          Show this if the rendering fails.
        </VueBarcode>

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

  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import VueBarcode from 'vue-barcode';



@Component({
  components: {
    VueBarcode
  }
})
export default class Create extends Vue {

  valid: boolean = false;

  name: string = "";
  type: any = {text: "", type: "", value: {
    min: 0, max: 0
  }};
  value: string = "";

  minNum: number = 0;
  maxNum: number = 0;

  num: number = 0;

  items2: Array<object> = [
    {text: "CODE128", type: "CODE128", value: {
      min:3, max:44
    }},
    {text: "EAN",  type: "EAN", value: {
      min:5, max:14
    }},
    {text: "EAN-13",  type: "EAN13", value: {
      min:8, max:24
    }},
    {text: "EAN-8",  type: "EAN8", value: {
      min:8, max:24
    }},
    {text: "EAN-5",  type: "EAN5", value: {
      min:8, max:24
    }},
    {text: "EAN-2",  type: "EAN2",value: {
      min:8, max:24
    }},{text: "UPC (A)",  type: "UPC", value: {
      min:8, max:24
    }},
    {text: "CODE39",  type: "CODE39", value: {
      min:8, max:24
    }},
    {text: "ITF-14",  type: "ITF14", value: {
      min:8, max:24
    }},
    {text: "MSI",  type: "MSI", value: {
      min:8, max:24
    }},
    {text: "Pharmacode",  type: "pharmacode", value: {
      min:8, max:24
    }}
  ];

  items: Array<string> = ["Just Make One!", "CODE128", "EAN", "EAN-13", "EAN-8", "EAN-5", "EAN-2", "UPC (A)", "CODE39", "ITF-14", "MSI", "Pharmacode"];

  get nameRules() {
    let rules = [v => !!v || 'Name is required',
                 v => (v && v.length >= 1) || `Barcode name must be more than 1 characters`,
                ];
    return rules;
  }

  get typeRules() {
    let rules = [v => !!v || 'Type is required',
                 v => (v && v.value !== '') || `Type must be selected`,
                ];
    return rules;
  };

  get valueRules() {
    let rules = [v => !!v || 'Value is required',
                 v => (v && (v.length >= this.minNum && v.length <= this.maxNum)) || `Barcode value must be between ${this.minNum} and ${this.maxNum} characters`,
                ];
    return rules;
  };

  @Watch("type")
  typeChange() {
    this.value = '';
    // this.num = this.type.value;
    this.minNum = this.type.value.min
    this.maxNum = this.type.value.max;
  };
  

  resetForm() {
    this.name = '';
    this.type = {text: "", type: "", value: {
      min: 0, max: 0
    }};
    this.value = '';
  }

  saveBarcode() {
    
  }

  // @Watch("value")
  // watchform() {
  //   if (this.value != '') {
  //     this.formComplete = true;
  //   }
  //   if (this.value == '') {
  //     this.formComplete = false;
  //   }
  // }

}
</script>

<style scoped>

</style>