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
        case 'xl': return 'h1';
        default: return 'h3';
      }
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