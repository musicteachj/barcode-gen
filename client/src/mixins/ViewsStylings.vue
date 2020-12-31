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