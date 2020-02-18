<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

@Component({
  components: {
    HelloWorld
  }
})
export default class About extends Vue {}
</script>