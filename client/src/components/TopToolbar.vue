<template>
<v-card
    color="grey lighten-4"
    flat
    
    tile
  >
    <v-toolbar dense>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-btn icon>
        <v-icon>{{routeIcons}}</v-icon>
      </v-btn>

      <v-toolbar-title>{{$route.name}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
      <v-toolbar-title>Barcode Gen</v-toolbar-title>
    </v-toolbar>
  </v-card>
  <!-- <div>

    <v-navigation-drawer
      app
      fixed
      v-model="showMenu"

    >
      <v-list dense>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="doNothing">
          <v-list-item-action>
            <v-icon>help</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      fixed
      dark
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="toggleMenu"></v-app-bar-nav-icon>

      <v-toolbar-title>Vue News</v-toolbar-title>

    </v-app-bar>

  </div> -->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class TopToolbar extends Vue {

  showMenu: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  doNothing(): void {
  }

  get routeIcons() {
    if (this.$route.name === "Scan") {
      return "mdi-barcode-scan"
    }
    if (this.$route.name === "Create") {
      return "mdi-barcode"
    } 
    if (this.$route.name === "Print") {
      return "mdi-printer"
    } 
  }

}
</script>