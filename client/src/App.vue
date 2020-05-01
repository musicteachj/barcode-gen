<template>
  <v-app v-if="valid === false">
    <v-card
      :class="`mx-auto justify-center flex-wrap`"
      flat
      tile
    >
      <v-row class="d-block">
        <transition name="app-head">
          <p v-if="show" class="display-4 text-center appHeadline">Barcode Gen</p>
        </transition>
        <transition name="app-head">
        <p v-if="show" class="headline text-center appSupportText">Scan, Create and Print Barcodes</p>
        </transition>
      </v-row>
      <v-row>
        <transition name="anim-bar">
          <VueBarcode
            v-if="showBar"
            class="text-center mx-auto homeBarExample" 
            value="example"
            >
            Please enter a valid value for this barcode type.
          </VueBarcode>
        </transition>
      </v-row>
      <v-row>
        <transition name="app-head">
          <v-btn
            v-if="showBtn"
            @click="routeToCreate"
            :block="false"
            max-width="200"
            color="primary"
            class="mx-auto">
            Lets Go
          </v-btn>
        </transition>
      </v-row>
    </v-card>
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
  import VueBarcode from 'vue-barcode';

  @Component({
    components: {
      TopToolbar,
      BottomNav,
      VueBarcode
    }
  })
  export default class App extends Vue {

    // Boolean for display of app
    valid: boolean = false;

    // Set animations initially to false
    show: boolean = false;
    showBar: boolean = false;
    showBtn: boolean = false;

    // Lifecyle Events
    mounted() {
      // set to true to run transition/animation classes
      this.show = true;

      // display barcode img after heading fully loaded
      setTimeout(() => {
        this.showBar = true;
      }, 1000);

      // display button afterbarcode fully loaded
      setTimeout(() => {
        this.showBtn = true;
      }, 1500)
    }

    routeToCreate() {
      // Engage leave animations
      this.show = !this.show;
      this.showBar = !this.showBar;
      this.showBtn = !this.showBtn;

      // Wait for animations to finish, then display app
      setTimeout(() => {
        this.valid = true;
      }, 500);
    }

  }
</script>

<style scoped>
.bottomN {
  position: sticky;
}

.appHeadline {
  margin-top: 50%;
}

.appSupportText {
  margin-bottom: 20%;
}

.homeBarExample {
  margin-bottom: 20%;
}

/* Animations */
.app-head-enter-active {
  transition: all 1s ease;
}
.app-head-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.app-head-enter, .app-head-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.anim-bar-enter-active, .anim-bar-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.anim-bar-enter {
  transform: translateX(-500px) rotateZ(360deg);
  opacity: 0;
}

.anim-bar-leave-to {
   transform: translateX(500px) rotateZ(-360deg);
   opacity: 0;
}
 
</style>