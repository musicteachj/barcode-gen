<template>
  <v-app v-if="valid === false">
    <v-card
      class="d-flex mx-auto"
      flat
      style="background-color:white"
      :height="containerHeight"
    >
      <v-card
        :class="`pa-2 mt-${subContainerMargin} align-self-center`"
        flat
        style="background-color:white"
      >
        <v-row>
          <v-col>
            <v-card
              :width="titlesContentWidth"
              :height="titlesContentHeight"
              class="pa-2 mx-auto"
              flat
              style="background-color:white"
            >
              <transition name="app-head">
                <p v-if="show" :class="`text-center font-weight-regular text-${title}`">Barcode Gen</p>
              </transition>
              <transition name="app-head">
                <p v-if="show" :class="`text-center font-weight-regular text-${subtitle}`">Scan, Create and Print Barcodes</p>
              </transition>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
             <v-card
              width="300"
              :height="barcodeContentHeight"
              class="pa-2 mx-auto"
              flat
              style="background-color:white"
            >
              <transition name="anim-bar">
                <VueBarcode
                  v-if="showBar"
                  class="text-center mx-auto homeBarExample" 
                  value="example"
                  :height="barcodeHeight"
                  :fontSize="barcodeFontSize"
                  >
                  Please enter a valid value for this barcode type.
                </VueBarcode>
              </transition>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col>
             <v-card
              width="300"
              height="100"
              class="pa-2 mx-auto"
              flat
              style="background-color:white"
            >
              <transition name="app-head">
                <v-btn
                  v-if="showBtn"
                  @click="routeToCreate"
                  :block="false"
                  color="primary"
                  class="mx-auto"
                  :large="this.$vuetify.breakpoint.name === 'lg'"
                  :x-large="this.$vuetify.breakpoint.name === 'xl'">
                  Lets Go
                </v-btn>
              </transition>
             </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-card>
    

    <!-- <v-card
      :class="`mx-auto`"
      flat
      tile
      style="background-color:purple"
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
            :fontSize="barcodeFontSize"
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
            color="primary"
            class="mx-auto appBtn">
            Lets Go
          </v-btn>
        </transition>
      </v-row>
    </v-card> -->
  </v-app>

  <v-app v-else>
    <TopToolbar class="topTool"></TopToolbar>
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

    // Local Variables -----------------
    // ---------------------------------
    valid: boolean = false;
    show: boolean = false;
    showBar: boolean = false;
    showBtn: boolean = false;
    window: any = {
      width: 0,
      height: 0
    }

    // Computed ------------------------
    // ---------------------------------
    get subContainerMargin() {
      return this.$vuetify.breakpoint.sm ? 'n16' : '0';
    }
    
    get barcodeContentHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '200';
        case 'sm': return '160';
        case 'md': return '200';
        case 'lg': return '200';
        case 'xl': return '200';
        default: return '200';
      }
    }

    get titlesContentWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '320';
        case 'sm': return '600';
        case 'md': return '600';
        case 'lg': return '900';
        case 'xl': return '900';
        default: return '600';
      }
    }

    get titlesContentHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '150';
        case 'sm': return '130';
        case 'md': return '200';
        case 'lg': return '250';
        case 'xl': return '250';
        default: return '200';
      }
    }

    get containerHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return this.window.height;
        case 'sm': return this.window.height < 900 ? '500' : this.window.height;
        case 'md': return this.window.height;
        case 'lg': return this.window.height;
        case 'xl': return this.window.height;
        default: return this.window.height;
      }
    }

    get subtitle() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'h5';
        case 'sm': return 'h4';
        case 'md': return 'h4';
        case 'lg': return 'h3';
        case 'xl': return 'h3';
        default: return 'h4';
      }
    }

    get title() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'h4';
        case 'sm': return 'h3';
        case 'md': return 'h2';
        case 'lg': return 'h1';
        case 'xl': return 'h1';
        default: return 'h1';
      }
    }

    get barcodeFontSize() {
      if (this.window.width >= 4096) return "50"
      if (this.window.width >= 3840 && this.window.width <= 4095) return "40"
      if (this.window.width >= 2560 && this.window.width <= 3839) return "30"
      return "20"
    }

    get barcodeHeight() {
      return this.window.width >= 3840 ? "200" : "100";
    }

    // Lifecycle Events ----------------
    // ---------------------------------
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    }

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

    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    }

    // Methods -------------------------
    // ---------------------------------
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

.topTool {
  position: sticky !important;
  top: 0;
  z-index: 2;
}

.appHeadline {
  font-weight: 300;
}

.appSupportText {
  font-weight: 400;
}

.pageTitle {
  font-weight: 300;
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



/* RESPONSIVE */
/* //////////////////////////////// */
/* DESKTOP */
/* //////////////////////////////// */
@media screen and (max-width: 4096px) and (min-height: 2160px) and (max-height: 2304px) {
  .appHeadline {
    margin-top: 40% !important;
    font-size: 240px !important;
    margin-bottom: 3% !important;
  }
  .appSupportText {
    font-size: 60px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 20%;
  }
  .appBtn {
    font-size: 40px !important;
    width: 240px !important;
    height: 70px !important;
  }
  .pageTitle {
    font-size: 140px;
  }
  .noScannerMsg {
    font-size: 50px;
  }


  input {
    font-size: 40px !important;
  }
  .v-input__slot, .v-text-field__slot, input, .v-select__slot, .v-select__selections {
    height: 60px !important;
  }
  .v-input input {
    max-height: 60px !important;
  }
  .v-input .v-label {
    max-height: 60px !important;
    height: 60px !important;
  }
  label {
    font-size: 30px !important;
  }
  .v-messages__message {
    font-size: 20px !important;
  }
  .v-list-item__title, .v-select__selection--comma {
    font-size: 40px !important;
    height: 60px !important;
    align-items: baseline !important;
  }
  .v-select__selection--comma {
    padding-top: 15px !important;
  }
}

@media screen and (max-width: 3840px) and (min-height: 2000px) and (max-height: 2160px) {
  .appHeadline {
    margin-top: 45% !important;
    font-size: 190px !important;
    margin-bottom: 3% !important;
  }

  .appSupportText {
    font-size: 45px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 20%;
  }
  .pageTitle {
    font-size: 120px;
  }
  .noScannerMsg {
    font-size: 40px;
  }

  input {
    font-size: 40px !important;
  }
  .v-input__slot, .v-text-field__slot, input, .v-select__slot, .v-select__selections {
    height: 60px !important;
  }
  .v-input input {
    max-height: 60px !important;
  }
  .v-input .v-label {
    max-height: 60px !important;
    height: 60px !important;
  }
  label {
    font-size: 30px !important;
  }
  .v-messages__message {
    font-size: 20px !important;
  }
  .v-list-item__title, .v-select__selection--comma {
    font-size: 40px !important;
    height: 60px !important;
    align-items: baseline !important;
  }
  .v-select__selection--comma {
    padding-top: 15px !important;
  }
}

@media screen and (max-width: 3000px) and (min-height: 1600px) and (max-height: 2000px) {
  .appHeadline {
    margin-top: 45% !important;
    font-size: 160px !important;
    margin-bottom: 3% !important;
  }

  .appSupportText {
    font-size: 38px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 20%;
  }
  .appBtn {
    font-size: 30px !important;
    width: 180px !important;
    height: 60px !important;
  }
  .pageTitle {
    font-size: 76px;
  }
  .noScannerMsg {
    font-size: 36px;
  }

  input {
    font-size: 30px !important;
  }
  .v-input__slot, .v-text-field__slot, input, .v-select__slot, .v-select__selections {
    height: 50px !important;
  }
  .v-input input {
    max-height: 50px !important;
  }
  .v-input .v-label {
    max-height: 50px !important;
    height: 50px !important;
  }
  label {
    font-size: 24px !important;
  }
  .v-messages__message {
    font-size: 17px !important;
    margin-top: 1px !important;
  }
  .v-list-item__title, .v-select__selection--comma {
    font-size: 30px !important;
    height: 50px !important;
    align-items: baseline !important;
  }
  .v-select__selection--comma {
    padding-top: 15px !important;
  }

}

@media screen and (max-width: 2999px) and (min-width: 2561px) {
  .pageTitle {
    font-size: 66px;
  }
  .noScannerMsg {
    font-size: 32px;
  }
}

@media screen and (max-width: 2560px) and (min-height: 1270px) and (max-height: 1700px) {
  .appHeadline {
    margin-top: 35% !important;
    font-size: 140px !important;
    margin-bottom: 3% !important;
  }
  .appSupportText {
    font-size: 38px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 20%;
  }
  .appBtn {
    font-size: 26px !important;
    width: 150px !important;
    height: 50px !important;
  }
  .pageTitle {
    font-size: 66px;
  }
  .noScannerMsg {
    font-size: 32px;
  }
}
@media screen and (max-width: 1920px) and (min-height: 900px) and (max-height: 1200px) {
  .appHeadline {
    margin-top: 20% !important;
    font-size: 120px !important;
    margin-bottom: 3% !important;
  }
  .appSupportText {
    font-size: 34px;
    margin-bottom: 10% !important;
  }
  .homeBarExample {
    margin-bottom: 20%;
  }
  .appBtn {
    font-size: 20px !important;
    width: 130px !important;
    height: 40px !important;
  }
  .pageTitle {
    font-size: 60px;
  }
  .noScannerMsg {
    font-size: 30px;
  }
}
@media screen and (max-width: 1440px) and (min-height: 768px) and (max-height: 900px) {
  .appHeadline {
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
  .pageTitle {
    font-size: 60px;
  }
  .noScannerMsg {
    font-size: 30px;
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
  .pageTitle {
    font-size: 60px;
  }
  .noScannerMsg {
    font-size: 30px;
  }
}
@media screen and (max-width: 1280px) and (min-height: 800px) and (max-height: 834px) {
  .appHeadline {
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
  .noScannerMsg {
    font-size: 26px;
  }
}
@media screen and (max-width: 1024px) and (min-height: 1025px) and (max-height: 1366px) {
  .appHeadline {
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
  .appBtn {
    font-size: 20px !important;
    width: 120px !important;
    height: 40px !important;
  }
  .noScannerMsg {
    font-size: 26px;
  }
}
@media screen and (max-width: 1024px) and (min-height: 768px) and (max-height: 1024px) {
  .appHeadline {
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
  .pageTitle {
    font-size: 50px;
  }
  .noScannerMsg {
    font-size: 26px;
  }

}
@media screen and (max-width: 960px) and (min-height: 600px) and (max-height: 1023px) {
  .appHeadline {
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
  .noScannerMsg {
    font-size: 26px;
  }
}
@media screen and (max-width: 834px) and (min-height: 961px) and (max-height: 1280px) {
  .appHeadline {
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
  .noScannerMsg {
    font-size: 26px;
  }
}
@media screen and (max-width: 768px) and (min-height: 961px) and (max-height: 1024px) {
  .appHeadline {
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
  .pageTitle {
    font-size: 50px;
  }
  .noScannerMsg {
    font-size: 26px;
  }
}
@media screen and (max-width: 600px) and (min-height: 415px) and (max-height: 960px) {
  .appHeadline {
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
  .pageTitle {
    font-size: 50px;
  }
  .noScannerMsg {
    font-size: 26px;
  }
}

@media screen and (max-width: 414px) and (min-height: 550px) {
  .appHeadline {
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
  .pageTitle {
    font-size: 40px;
  }
  .noScannerMsg {
    font-size: 26px;
  }
  
}
 
</style>