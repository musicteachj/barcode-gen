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
            
          >
            <v-text-field
              v-model="name"
              label="Name"
            ></v-text-field>

            <v-select
              v-model="type"
              :items="items"
              label="Type"
            ></v-select>

            <v-text-field
              v-model="value"
              label="Value"
            ></v-text-field>

         </v-form>

         <VueBarcode v-if="this.value != ''" class="text-center" :value="this.value">
          Show this if the rendering fails.
        </VueBarcode>
        </v-col>

        <v-col cols="2">
        </v-col>
        
      </v-row>
    </v-container>
  </v-card>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueBarcode from 'vue-barcode';



@Component({
  components: {
    VueBarcode
  }
})
export default class Create extends Vue {

  name: string = "";
  type: string = "";
  value: string = "";

  items: Array<string> = ["test1", "test2", "test3"]

}
</script>

<style scoped>

</style>