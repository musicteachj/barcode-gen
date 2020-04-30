
<template>
  <v-app v-if="valid === false">
    <v-btn @click="valid = true">
      test
    </v-btn>
  </v-app>

  <v-app v-else>
    <TopToolbar></TopToolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <BottomNav class="bottomN"></BottomNav>
  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TopToolbar from './components/TopToolbar.vue';
  import BottomNav from './components/BottomNav.vue';
  @Component({
    components: {
      TopToolbar,
      BottomNav
    }
  })
  export default class App extends Vue {

    valid: boolean = false

  }
</script>

<style>
.bottomN {
  position: sticky;
}

/* Form styles throughout app */
@media screen and (max-width: 4096px) { 
  .v-input .v-label {
    font-size: 40px !important;
  }
  /* .v-input__slot, .v-text-field__slot {
    height: 200px !important;
  } */
  .v-label {
    height: 50px !important;
    padding-top: 10px;
    color: red !important;
  }

  input {
    margin-top: 8% !important;
  }

  .v-input input {
    /* margin-top: -1% !important; */
    font-size: 40px;
  }

  .v-messages__message {
    font-size: 20px;
  }

  .v-list-item__title {
    font-size: 30px !important;
  }

  .v-select__selection {
    height: 50px !important;
    padding-top: 30px !important;
    font-size: 30px !important;
  }
}
</style>