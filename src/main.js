import { createApp } from 'vue'
import { Quasar, Loading, Notify, Dialog } from 'quasar'
import { createPinia } from 'pinia'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import 'nprogress/nprogress.css'
import '@/styles/index.scss'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(Quasar, {
  plugins: { Loading, Notify, Dialog },
  config: {
    loading: {}
  }
})

app.use(createPinia())
app.use(router)

router.beforeEach((to, from, next) => {
  if (to.meta.title !== undefined) {
    document.title = to.meta.title
  } else {
    document.title = '\u200E'
  }
  next()
})

app.mount('#app')
