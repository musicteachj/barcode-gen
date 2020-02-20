<template>

  <v-container>
    <h1 class="headline">[[Print]]</h1>
    <h2>Content is coming to this mobile app very soon!</h2>

    <v-card
      class="mx-auto"
      max-width="344"
      
    >
    <h1>test</h1>
    <VueBarcode value="123456789">
      Show this if the rendering fails.
    </VueBarcode>
          <!-- <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">OVERLINE</div>
          <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
          <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        ></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>Button</v-btn>
        <v-btn text>Button</v-btn>
      </v-card-actions> -->
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
  export default class Print extends Vue {
  }
</script>