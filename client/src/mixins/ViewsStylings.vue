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
  testVar: string = "test mixin var";

  // Computed ------------------------
  // ---------------------------------
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

  // Methods -------------------------
  // ---------------------------------
  barcodeWidth(type: string) {
    return type === 'CODE128' || type === 'CODE39' ? "1" : "2";
  }

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