import { createStore } from 'vuex'
import login from './login/login'
import { IRootState } from './type'
const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 0
    }
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
})
export default store
