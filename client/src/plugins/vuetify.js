import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#1A237E',
        secondary: '#E8EAF6',
        accent: '#8C9EFF',
        error: '#D50000'
      }
    }
  }
})

export default vuetify
