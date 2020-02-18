<template>
  <div class="about">
    <h1>This is will be the dashboard</h1>
    <BottomNav />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import BottomNav from '@/components/BottomNav.vue'

@Component({
  components: {
    BottomNav
  }
})
export default class Dash extends Vue {}
</script>