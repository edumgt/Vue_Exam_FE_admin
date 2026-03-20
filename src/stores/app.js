import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
    },
    device: 'desktop'
  }),
  actions: {
    toggleSidebar () {
      this.sidebar.opened = !this.sidebar.opened
      Cookies.set('sidebarStatus', this.sidebar.opened ? 1 : 0)
    },
    closeSidebar () {
      this.sidebar.opened = false
      Cookies.set('sidebarStatus', 0)
    }
  }
})
