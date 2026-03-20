import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: Cookies.get('userName') || '',
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null
  }),
  actions: {
    setUserName (userName) {
      this.userName = userName
      Cookies.set('userName', userName, { expires: 30 })
    },
    setUserInfo (userInfo) {
      this.userInfo = userInfo
      Cookies.set('userInfo', JSON.stringify(userInfo), { expires: 30 })
    },
    clearLogin () {
      this.userName = ''
      this.userInfo = null
      Cookies.remove('userName')
      Cookies.remove('userInfo')
    }
  }
})
