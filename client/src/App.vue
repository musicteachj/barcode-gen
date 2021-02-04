<template>
  <v-app v-if="valid === false">
    <v-card
      class="d-flex mx-auto"
      flat
      :height="containerHeight"
    >
      <v-card
        :class="`pa-2 mt-${subContainerMargin} align-self-center`"
        flat
      >
        <v-row>
          <v-col>
            <v-card
              :width="titlesContentWidth"
              :height="titlesContentHeight"
              class="pa-2 mx-auto"
              flat
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
            >
              <transition name="anim-bar">
                <VueBarcode
                  v-if="showBar"
                  class="text-center mx-auto" 
                  value="example"
                  fontSize="20"
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
  </v-app>

  <v-app v-else>
    <TopToolbar class="topTool"></TopToolbar>
    <v-main>
      <router-view></router-view>
    </v-main>
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
    $vuetify: any;

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