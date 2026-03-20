<template>
  <div class="app-container">
    <q-card flat bordered>
      <q-card-section>
        <q-form @submit="saveUser" class="q-gutter-md">
          <q-input v-model="form.userName" label="아이디" :rules="[val => !!val || '필수입력']" outlined dense />
          <q-input v-model="form.password" label="비번" type="password" outlined dense :hint="isEdit ? '변경 시에만 입력하세요' : ''" />
          <q-input v-model="form.realName" label="이름" outlined dense />
          <q-input v-model.number="form.age" label="나이" type="number" outlined dense />
          <q-select v-model="form.sex" :options="sexOptions" label="성별" outlined dense emit-value map-options />
          <q-input v-model="form.birthDate" label="생년월일" type="date" outlined dense />
          <q-input v-model="form.phone" label="휴대폰번호" outlined dense />
          <q-select v-model="form.status" :options="statusOptions" label="상태" outlined dense emit-value map-options />
          <div>
            <q-btn unelevated color="primary" type="submit" label="저장" />
            <q-btn flat @click="goBack" label="취소" class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useEnumItemStore } from '@/stores/enumItem'
import userApi from '@/api/user'
import { Notify } from 'quasar'

export default {
  setup () {
    const enumItemStore = useEnumItemStore()
    return { enumItemStore }
  },
  data () {
    return {
      form: { userName: '', password: '', realName: '', age: null, sex: null, birthDate: '', phone: '', status: 1, role: 2 },
      isEdit: false
    }
  },
  computed: {
    sexOptions () { return this.enumItemStore.user.sexEnum.map(e => ({ label: e.value, value: e.key })) },
    statusOptions () { return this.enumItemStore.user.statusEnum.map(e => ({ label: e.value, value: e.key })) }
  },
  created () {
    if (this.$route.query.id) {
      this.isEdit = true
      userApi.selectUser(this.$route.query.id).then(re => { this.form = re.response })
    }
  },
  methods: {
    saveUser () {
      userApi.createUser(this.form).then(() => {
        Notify.create({ type: 'positive', message: '저장되었습니다.' })
        this.goBack()
      })
    },
    goBack () { this.$router.push({ path: '/user/teacher/list' }) }
  }
}
</script>
