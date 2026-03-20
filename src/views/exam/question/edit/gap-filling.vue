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
              <q-input v-model.number="form.score" label="총점" type="number" outlined dense />
            </div>
            <div class="col-3">
              <div class="text-caption q-mb-xs">난이도</div>
              <q-rating v-model="form.difficult" :max="5" color="amber" />
            </div>
          </div>

          <q-input
            v-model="form.title"
            label="문항내용 (빈칸은 ___ 로 표시)"
            type="textarea"
            outlined
            autogrow
            :rules="[val => !!val || '필수입력']"
          />

          <div class="text-subtitle2">빈칸 정답</div>
          <div
            v-for="(item, idx) in form.items"
            :key="idx"
            class="row items-center q-gutter-sm q-mb-sm"
          >
            <span class="text-weight-bold">{{ idx + 1 }}번:</span>
            <q-input v-model="item.content" label="정답" outlined dense class="col" />
            <q-input
              v-model.number="item.score"
              label="점수"
              type="number"
              outlined dense
              style="max-width:80px"
            />
          </div>
          <q-btn flat color="primary" icon="add" label="빈칸추가" @click="addItem" />

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
import { useExamStore } from '@/stores/exam'
import questionApi from '@/api/question'
import { Notify } from 'quasar'

export default {
  setup () {
    const examStore = useExamStore()
    return { examStore }
  },
  data () {
    return {
      form: {
        id: null,
        subjectId: null,
        title: '',
        items: [{ content: '', score: 1 }],
        score: 2,
        difficult: 3,
        analyze: '',
        questionType: 4
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
    addItem () {
      this.form.items.push({ content: '', score: 1 })
    },
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
