<template>
  <div class="app-container">
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-xs-12 col-sm-6 col-lg-3" v-for="card in statCards" :key="card.key">
        <q-card class="stat-card">
          <q-card-section class="row items-center">
            <q-icon :name="card.icon" size="48px" :class="card.iconClass" />
            <div class="q-ml-md">
              <div class="stat-label">{{ card.label }}</div>
              <div class="stat-value">{{ card.value }}</div>
            </div>
          </q-card-section>
          <q-inner-loading :showing="loading" />
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import dashboardApi from '@/api/dashboard'

export default {
  name: 'Dashboard',
  data () {
    return {
      loading: false,
      examPaperCount: 0,
      questionCount: 0,
      doExamPaperCount: 0,
      doQuestionCount: 0
    }
  },
  computed: {
    statCards () {
      return [
        { key: 'paper', icon: 'assignment', iconClass: 'text-teal', label: '시험지합계', value: this.examPaperCount },
        { key: 'question', icon: 'quiz', iconClass: 'text-blue', label: '문항합계', value: this.questionCount },
        { key: 'doExam', icon: 'done_all', iconClass: 'text-green', label: '답안합계', value: this.doExamPaperCount },
        { key: 'doQuestion', icon: 'rate_review', iconClass: 'text-red', label: '제출답안합계', value: this.doQuestionCount }
      ]
    }
  },
  mounted () {
    this.loading = true
    dashboardApi.index().then(re => {
      const response = re.response
      this.examPaperCount = response.examPaperCount
      this.questionCount = response.questionCount
      this.doExamPaperCount = response.doExamPaperCount
      this.doQuestionCount = response.doQuestionCount
      this.loading = false
    }).catch(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
.stat-card {
  cursor: pointer;
  &:hover { box-shadow: 0 4px 20px rgba(0,0,0,.12); }
}
.stat-label { font-size: 14px; color: #909399; margin-bottom: 8px; }
.stat-value { font-size: 28px; font-weight: bold; color: #303133; }
</style>
