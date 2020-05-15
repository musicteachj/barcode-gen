<template>
  <v-app v-if="valid === false">
    <v-card
      :class="`mx-auto`"
      flat
      tile
    >
      <v-row class="d-block">
        <transition name="app-head">
          <p v-if="show" class="text-center appHeadline">Barcode Gen</p>
        </transition>
        <transition name="app-head">
        <p v-if="show" class="text-center appSupportText">Scan, Create and Print Barcodes</p>
        </transition>
      </v-row>
      <v-row>
        <transition name="anim-bar">
          <VueBarcode
            v-if="showBar"
            class="text-center mx-auto homeBarExample" 
            value="example"
            :height="barcodeHeight"
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
            class="mx-auto homeBtn">
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
    window: any = {
      width: 0,
      height: 0
    }

    get barcodeHeight() {
      if (this.window.width >= 3840) {
        return "200"
      } else {
        return "100"
      }
    }

    // Lifecyle Events
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    }
    mounted() {
      console.log(window);
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

    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    }
    
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
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

<style>
.bottomN {
  position: sticky !important;
}

.appHeadline {
  font-weight: 300;
}

.appSupportText {
  font-weight: 400;
}

/* .appHeadline {
  margin-top: 50%;
  font-weight: 300;
  font-size: 76px !important;
}

.appSupportText {
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 20% !important;
}

.homeBarExample {
  margin-bottom: 20%;
} */

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



/* RESPONSIVE */
/* @media screen and (max-width: 4096px) {
  .v-input .v-label {
    font-size: 40px !important;
  }
  COMMENT THIS OUT!!!
  .v-input__slot, .v-text-field__slot {
    height: 200px !important;
  }
  .v-label {
    height: 50px !important;
    padding-top: 10px;
    color: red !important;
  }

  input {
    margin-top: 8% !important;
  }

  .v-input input {
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

  .appHeadline {
    font-weight: 300;
    font-size: 140px !important;
    margin-top: 50%;
  }

  .appSupportText {
    font-weight: 400;
    font-size: 40px;
    margin-bottom: 15% !important;
  }

  .homeBtn {
    width: 180px;
    height: 60px !important;
    font-size: 30px !important;
    margin-top: 20%;
  }
}

@media screen and (max-width: 2688px) { 
  .appHeadline {
    margin-top: 20%;
  }
}

@media screen and (max-width: 2560px) { 
  .appHeadline {
    font-weight: 300;
    font-size: 100px !important;
    margin-top: 30%;
  }

  .appSupportText {
    font-weight: 400;
    font-size: 26px;
    margin-bottom: 15% !important;
  }

  .homeBtn {
    width: 130px;
    height: 40px !important;
    font-size: 22px !important;
    margin-top: 20%;
  }
} */

/* @media screen and (min-width:2688px) and (max-width:4095px){
   .appHeadline {
    font-weight: 300;
    font-size: 140px !important;
  }

  .appSupportText {
    font-weight: 400;
    font-size: 40px;
    margin-bottom: 15% !important;
  }

  .homeBtn {
    width: 180px;
    height: 60px !important;
    font-size: 30px !important;
  }
} */

/* @media screen and (min-width:2561px) and (max-width:2688px){
   .appHeadline {
     margin-top: 20%;
    font-size: 140px !important;
  }

  .appSupportText {
    font-weight: 400;
    font-size: 40px;
    margin-bottom: 15% !important;
  }

  .homeBtn {
    width: 180px;
    height: 60px !important;
    font-size: 30px !important;
  }
} */

/* //////////////////////////////// */
/* DESKTOP */
/* //////////////////////////////// */
@media screen and (max-width: 1920px) and (min-height: 900px) and (max-height: 1200px) {
  .appHeadline {
    color: blue;
    margin-top: 30% !important;
    font-size: 100px !important;
    margin-bottom: 3% !important;
  }
  .appSupportText {
    font-size: 34px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 20%;
  }
}
@media screen and (max-width: 1440px) and (min-height: 768px) and (max-height: 900px) {
  .appHeadline {
    color: green;
    margin-top: 20% !important;
    font-size: 90px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 30px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 20%;
  }
}
/* @media screen and (max-width: 1366px) and (min-height: 768px) and (max-height: 768px) { 
  .appHeadline {
    color: red;
    margin-top: 20% !important;
    font-size: 90px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 30px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 20%;
  }
} */


/* //////////////////////////////// */
/* TABLET */
/* //////////////////////////////// */
@media screen and (max-width: 1366px) and (min-height: 1024px) and (max-height: 1366px) {
  .appHeadline {
    color: lightblue;
    margin-top: 40% !important;
    font-size: 90px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 30px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 30%;
  }
}
@media screen and (max-width: 1280px) and (min-height: 800px) and (max-height: 834px) {
  .appHeadline {
    color: grey;
    margin-top: 20% !important;
    font-size: 90px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 20px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 30%;
  }
}
@media screen and (max-width: 1024px) and (min-height: 1025px) and (max-height: 1366px) {
  .appHeadline {
    color: green;
    margin-top: 50% !important;
    font-size: 90px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 20px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 30%;
  }
}
@media screen and (max-width: 1024px) and (min-height: 768px) and (max-height: 1024px) {
  .appHeadline {
    color: yellow;
    margin-top: 20% !important;
    font-size: 70px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 20px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 30%;
  }
}
@media screen and (max-width: 960px) and (min-height: 600px) and (max-height: 1023px) {
  .appHeadline {
    color: brown;
    margin-top: 30% !important;
    font-size: 54px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 20px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 30%;
  }
}
@media screen and (max-width: 834px) and (min-height: 961px) and (max-height: 1280px) {
  .appHeadline {
    color: teal;
    margin-top: 50% !important;
    font-size: 60px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 20px;
    margin-bottom: 40% !important;
  }
  .homeBarExample {
    margin-bottom: 40%;
  }
}
@media screen and (max-width: 768px) and (min-height: 961px) and (max-height: 1024px) {
  .appHeadline {
    color: purple;
    margin-top: 50% !important;
    font-size: 60px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 20px;
    margin-bottom: 40% !important;
  }
  .homeBarExample {
    margin-bottom: 40%;
  }
}
@media screen and (max-width: 600px) and (min-height: 415px) and (max-height: 960px) {
  .appHeadline {
    color: red;
    margin-top: 40% !important;
    font-size: 50px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 16px;
    margin-bottom: 40% !important;
  }
  .homeBarExample {
    margin-bottom: 40%;
  }
}


/* //////////////////////////////// */
/* MOBILE */
/* //////////////////////////////// */
@media screen and (max-width: 896px) and (max-height: 414px) { 
  .appHeadline {
    color: orange;
    margin-top: 5%;
    font-size: 44px !important;
    margin-bottom: 5% !important;
  }
  .appSupportText {
    font-size: 16px;
    margin-bottom: 5% !important;
  }
  .homeBarExample {
    margin-bottom: 10%;
  }
}

@media screen and (max-width: 414px) and (min-height: 568px) {
  .appHeadline {
    color: blue;
    margin-top: 30%;
    font-size: 44px !important;
    margin-bottom: 10% !important;
  }
  .appSupportText {
    font-size: 16px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 50%;
  }
}
 
</style>