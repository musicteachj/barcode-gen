<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class ViewsStylings extends Vue {

  // LOCAL VARIABLES ------------------
   window: any = {
    width: 0,
    height: 0
  };

  // COMPUTED -------------------------
  get pageTitle() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 'h4';
      case 'sm': return 'h3';
      case 'md': return 'h3';
      case 'lg': return 'h2';
      case 'xl': return 'h2';
      default: return 'h3';
    }
  }

  get printCardText() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 'h6';
      case 'sm': return 'h5';
      case 'md': return 'h5';
      case 'lg': return 'h5';
      case 'xl': return 'h5';
      default: return 'h5';
    }
  }

  get barcodeWidth() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return '1';
      case 'sm': return '2';
      case 'md': return '2';
      case 'lg': return '2';
      case 'xl': return '2';
      default: return '2';
    }
  }

  get pageSubText() {
    switch (this.$vuetify.breakpoint.name) {
      case 'xs': return 'h5';
      case 'sm': return 'h4';
      case 'md': return 'h4';
      case 'lg': return 'h4';
      case 'xl': return 'h4';
      default: return 'h4';
    }
  }

  // get barcodeFontSize() {
  //   // OLD STYLING FOR LARGER MONITORS
  //   // if (this.window.width >= 4096) return "50"
  //   // if (this.window.width >= 3840 && this.window.width <= 4095) return "40"
  //   // if (this.window.width >= 2560 && this.window.width <= 3839) return "30"
  //   // return "20"
  //   // switch (this.$vuetify.breakpoint.name) {
  //   //   case 'xs': return '1';
  //   //   case 'sm': return '2';
  //   //   case 'md': return '2';
  //   //   case 'lg': return '2';
  //   //   case 'xl': return '2';
  //   //   default: return '2';
  //   // }
  //   return "20"
  // }

  // LIFECYCLE EVENTS -----------------
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  }

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  }

  // METHODS --------------------------
  handleResize() {
    this.window.width = window.innerWidth;
    this.window.height = window.innerHeight;
  }
}
</script>

<style>


</style>