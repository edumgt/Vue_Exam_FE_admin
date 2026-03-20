<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="admin-header bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="toggleSidebar" />
        <q-toolbar-title>시험모듈 관리자</q-toolbar-title>
        <q-space />
        <q-btn-dropdown flat round>
          <template v-slot:label>
            <q-avatar size="36px" color="white" text-color="primary">
              <span>{{ userStore.userName ? userStore.userName.charAt(0).toUpperCase() : 'A' }}</span>
            </q-avatar>
          </template>
          <q-list>
            <q-item clickable v-close-popup :to="{ path: '/profile/index' }">
              <q-item-section>개인정보</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="logout">
              <q-item-section>로그아웃</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="appStore.sidebar.opened"
      show-if-above
      :width="220"
      :breakpoint="700"
      bordered
      class="admin-sidebar"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <template v-for="route in menuRoutes" :key="route.path">
            <q-expansion-item
              v-if="route.children && route.children.filter(c => !c.hidden).length > 1"
              :icon="route.meta && route.meta.icon ? route.meta.icon : 'folder'"
              :label="route.meta ? route.meta.title : route.name"
              :default-opened="isRouteActive(route)"
            >
              <q-item
                v-for="child in route.children.filter(c => !c.hidden)"
                :key="child.path"
                clickable
                v-ripple
                :to="'/' + route.path.replace(/^\//, '') + '/' + child.path"
                active-class="menu-active"
                class="q-pl-xl"
              >
                <q-item-section>{{ child.meta ? child.meta.title : child.name }}</q-item-section>
              </q-item>
            </q-expansion-item>
            <q-item
              v-else-if="route.children && route.children.length > 0 && !route.children[0].hidden"
              clickable
              v-ripple
              :to="route.redirect || ('/' + route.path.replace(/^\//, '') + '/' + route.children[0].path)"
              active-class="menu-active"
            >
              <q-item-section avatar>
                <q-icon :name="route.meta && route.meta.icon ? route.meta.icon : 'circle'" />
              </q-item-section>
              <q-item-section>{{ route.meta ? route.meta.title : route.name }}</q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'
import { routes } from '@/router'
import loginApi from '@/api/login'

export default {
  name: 'AdminLayout',
  setup () {
    const userStore = useUserStore()
    const appStore = useAppStore()
    return { userStore, appStore }
  },
  computed: {
    menuRoutes () {
      return routes.filter(r => r.path !== '/login' && !r.hidden && r.path !== '/:pathMatch(.*)*' && r.children && r.children.length > 0)
    }
  },
  methods: {
    toggleSidebar () {
      this.appStore.toggleSidebar()
    },
    isRouteActive (route) {
      return this.$route.path.startsWith('/' + route.path.replace(/^\//, ''))
    },
    logout () {
      loginApi.logout().then(result => {
        if (result && result.code === 1) {
          this.userStore.clearLogin()
          this.$router.push({ path: '/login' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-sidebar {
  background: #304156;
  .q-item { color: #bfcbd9; }
  .q-item:hover { background: rgba(255,255,255,0.1); }
  .menu-active { color: #fff; background: rgba(255,255,255,0.15); }
  .q-expansion-item { color: #bfcbd9; }
}
</style>
