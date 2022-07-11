import { createApp } from 'vue'
import App from './App.vue'
import './styles/styles.css'

import router from './router'
import { myStore } from './store/store.js'

const app = createApp(App)
app.config.globalProperties.$filters = {
    currencyUSD(amount) {
      // look implementation inside car-preview.vue
      return '$' + amount
    },
  }
app.use(router)
app.use(myStore)
app.mount('#app')
