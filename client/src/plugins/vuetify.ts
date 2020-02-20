import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

const opts: any  = {
  options: {
    customProperties: true
  },
  icons: {
    iconfont: "mdi"
  },
  theme: {
    light: true,
    themes: {
      light: {
        primary: "#303F9F"
      }
    }
  }
}

export default new Vuetify(opts);
