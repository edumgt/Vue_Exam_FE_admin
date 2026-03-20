<template>
  <div class="app-container">
    <q-card flat bordered>
      <q-card-section class="row items-center">
        <q-avatar size="80px" color="primary" text-color="white" class="q-mr-md">
          <span class="text-h4">{{ userStore.userName ? userStore.userName.charAt(0).toUpperCase() : 'A' }}</span>
        </q-avatar>
        <div>
          <div class="text-h5">{{ userStore.userName }}</div>
          <div class="text-caption text-grey">관리자</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'

export default {
  name: 'Profile',
  setup () {
    const userStore = useUserStore()
    return { userStore }
  }
}
</script>
