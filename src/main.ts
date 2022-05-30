import { createApp } from 'vue'
import registerAPP from './gobal'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './assets/css/index.less'
import hyRequest from '@/service'
hyRequest.get({ url: '123' })

const app = createApp(App)
registerAPP(app)
app.use(store).use(router).mount('#app')
