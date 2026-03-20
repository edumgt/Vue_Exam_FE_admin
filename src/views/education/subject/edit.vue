<template>
  <div class="app-container">
    <q-card flat bordered>
      <q-card-section>
        <q-form @submit="saveSubject" class="q-gutter-md">
          <q-input
            v-model="form.name"
            label="과목명"
            outlined
            dense
            :rules="[val => !!val || '필수입력']"
          />
          <q-select
            v-model="form.userLevel"
            :options="levelOptions"
            label="학년"
            outlined
            dense
            emit-value
            map-options
            :rules="[val => !!val || '필수입력']"
          />
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
import subjectApi from '@/api/subject'
import { Notify } from 'quasar'

export default {
  setup () {
    const enumItemStore = useEnumItemStore()
    return { enumItemStore }
  },
  data () {
    return {
      form: { id: null, name: '', userLevel: null }
    }
  },
  computed: {
    levelOptions () {
      return this.enumItemStore.user.levelEnum.map(e => ({ label: e.value, value: e.key }))
    }
  },
  created () {
    if (this.$route.query.id) {
      subjectApi.select(this.$route.query.id).then(re => { this.form = re.response })
    }
  },
  methods: {
    saveSubject () {
      subjectApi.edit(this.form).then(() => {
        Notify.create({ type: 'positive', message: '저장되었습니다.' })
        this.goBack()
      })
    },
    goBack () {
      this.$router.push({ path: '/education/subject/list' })
    }
  }
}
</script>
