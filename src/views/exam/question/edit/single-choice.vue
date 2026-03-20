<template>
  <div class="app-container">
    <q-card flat bordered>
      <q-card-section>
        <q-form @submit="saveQuestion" class="q-gutter-md">
          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-select
                v-model="form.subjectId"
                :options="subjectOptions"
                label="과목"
                outlined dense emit-value map-options
                :rules="[val => !!val || '필수입력']"
              />
            </div>
            <div class="col-3">
              <q-input v-model.number="form.score" label="점수" type="number" outlined dense />
            </div>
            <div class="col-3">
              <div class="text-caption q-mb-xs">난이도</div>
              <q-rating v-model="form.difficult" :max="5" color="amber" />
            </div>
          </div>

          <q-input
            v-model="form.title"
            label="문항내용"
            type="textarea"
            outlined
            autogrow
            :rules="[val => !!val || '필수입력']"
          />

          <div class="text-subtitle2">선택지 (정답 선택)</div>
          <div
            v-for="(item, idx) in form.items"
            :key="idx"
            class="row items-center q-gutter-sm"
          >
            <q-radio
              v-model="form.correct"
              :val="String.fromCharCode(65 + idx)"
              :label="String.fromCharCode(65 + idx)"
              color="primary"
            />
            <q-input
              v-model="item.content"
              :label="'선택지 ' + String.fromCharCode(65 + idx)"
              outlined dense
              class="col"
            />
          </div>

          <q-input v-model="form.analyze" label="해설" type="textarea" outlined autogrow />

          <div>
            <q-btn unelevated color="primary" type="submit" label="저장" />
            <q-btn flat label="취소" class="q-ml-sm" @click="goBack" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useEnumItemStore } from '@/stores/enumItem'
import { useExamStore } from '@/stores/exam'
import questionApi from '@/api/question'
import { Notify } from 'quasar'

export default {
  setup () {
    const enumItemStore = useEnumItemStore()
    const examStore = useExamStore()
    return { enumItemStore, examStore }
  },
  data () {
    return {
      form: {
        id: null,
        subjectId: null,
        title: '',
        items: [
          { prefix: 'A', content: '' },
          { prefix: 'B', content: '' },
          { prefix: 'C', content: '' },
          { prefix: 'D', content: '' }
        ],
        correct: 'A',
        score: 2,
        difficult: 3,
        analyze: '',
        questionType: 1
      }
    }
  },
  computed: {
    subjectOptions () {
      return this.examStore.subjects.map(s => ({ label: s.name + ' (' + s.levelName + ')', value: s.id }))
    }
  },
  created () {
    this.examStore.initSubject()
    if (this.$route.query.id) {
      questionApi.select(this.$route.query.id).then(re => {
        this.form = re.response
      })
    }
  },
  methods: {
    saveQuestion () {
      questionApi.edit(this.form).then(() => {
        Notify.create({ type: 'positive', message: '저장되었습니다.' })
        this.goBack()
      })
    },
    goBack () {
      this.$router.push({ path: '/exam/question/list' })
    }
  }
}
</script>
