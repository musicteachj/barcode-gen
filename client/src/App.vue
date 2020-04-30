
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
      font-size: 60px !important;
  }
}
</style>