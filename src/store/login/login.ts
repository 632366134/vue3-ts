import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../type'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  mutations: {},
  getters: {},
  actions: {
    accountLoginAction({ commit }, payload: any) {
      console.log(payload)
    },
    PhoneLoginAction({ commit }, payload: any) {
      console.log(payload)
    }
  }
}
export default loginModule
