import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/stores'
import 'default-passive-events'
import Vconsole from 'vconsole'

import 'normalize.css'
import 'nprogress/nprogress.css'
import '@/assets/styles/main.less'

const app = createApp(App)

app.use(store)
app.use(router)

if (import.meta.env.VITE_BUILD_ENV !== 'PRO') {
  new Vconsole()
}

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
