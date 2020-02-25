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
            ></v-text-field>

            <v-select
              v-if="name != ''"
              v-model="type"
              return-object="true"
              item-value
              :items="items2"
              label="Type"
            ></v-select>

            <v-text-field
              v-if="type.value != ''"
              v-model="value"
              label="Value"
              :rules="typeRules"
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

         <VueBarcode v-if="this.value != ''" class="text-center" :value="this.value">
          Show this if the rendering fails.
        </VueBarcode>

         <v-row align="center">
              <v-col class="text-center" cols="12" sm="12">
                <div class="my-2">
                  <v-btn 
                    :disabled="!valid"
                    @click="validate" 
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
  type: any = {text: "", value: ""};
  value: string = "";

  num: number = 4;

  items2: Array<object> = [
    {text: "one",
     value: 5},
    {text: "two",
     value: 7},
    {text: "three",
     value: 9}
  ];

  items: Array<string> = ["Just Make One!", "CODE128", "EAN", "EAN-13", "EAN-8", "EAN-5", "EAN-2", "UPC (A)", "CODE39", "ITF-14", "MSI", "Pharmacode"];

  get typeRules() {
    let rules = [v => !!v || 'Value is required',
                 v => (v && v.length === this.num) || `Barcode value must be ${this.num} characters`,
                ];
    return rules;
  };

  @Watch("type")
  typeChange() {
    if (this.type != {text: "", value: ""}) {
      this.num = this.type.value;
    }
  };
  

  resetForm() {
    this.name = '';
    this.type = {text: "", value: ""};
    this.value = '';
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