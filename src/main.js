import { createApp } from "vue"
import App from "./App.vue"
import "./styles/styles.css"
import { focusDirective, rainbowDirective, customOnDirective, clickOutsideDirective } from "./directives"

import router from "./router"
import { myStore } from "./store/store.js"

const app = createApp(App)
app.config.globalProperties.$filters = {
  currencyUSD(amount) {
    // look implementation inside car-preview.vue
    return "$" + amount
  },
}
app.directive("focus", focusDirective)
app.directive("rainbow", rainbowDirective)
app.directive("custom-on", customOnDirective)
app.directive("click-outside", clickOutsideDirective)

app.use(router)
app.use(myStore)
app.mount("#app")
