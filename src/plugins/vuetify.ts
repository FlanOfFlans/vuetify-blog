/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify, type ThemeDefinition } from 'vuetify'

const darkTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#1c1c33",
    surface: "#212121",
    primary: "#25254f",
    secondary: "#a83163",
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme
    },
  },
})
