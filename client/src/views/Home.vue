<template>
  <div class="home">
    <!-- <v-card transition="myTransition" origin="center center">
      <v-img 
        v-slot:activator="{ on }"
        alt="Vue logo" 
        src="../assets/logo.png"
        height="200"
        width="200"
        v-on="on"
      />
    </v-card> -->

    <v-menu :transition="myTransition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" class="ma-2" v-on="on">
          Slide Y Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" link>
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <v-btn :to="'/dashboard'">To Dash</v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

const myTransition = createSimpleTransition('myTransition')

// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

@Component({
  components: {
    // HelloWorld
    myTransition
  }
})
export default class Home extends Vue {


}
</script>

<style scoped>

.myTransition {
  transition: all 15s ease;
}

</style>
