<template>
  <div class="app-container">
    <q-card flat bordered v-if="!formLoading">
      <q-card-section>
        <q-form @submit="submitForm" class="q-gutter-md">
          <!-- Basic info -->
          <div class="row q-col-gutter-md">
            <div class="col-6 col-md-3">
              <q-select
                v-model="form.level"
                :options="levelOptions"
                label="학년"
                outlined dense emit-value map-options
                :rules="[val => !!val || '필수입력']"
              />
            </div>
            <div class="col-6 col-md-3">
              <q-select
                v-model="form.subjectId"
                :options="filteredSubjectOptions"
                label="과목"
                outlined dense emit-value map-options
                :rules="[val => !!val || '필수입력']"
              />
            </div>
            <div class="col-6 col-md-3">
              <q-select
                v-model="form.paperType"
                :options="paperTypeOptions"
                label="시험종류"
                outlined dense emit-value map-options
                :rules="[val => !!val || '필수입력']"
              />
            </div>
            <div class="col-6 col-md-3">
              <q-input
                v-model.number="form.suggestTime"
                label="제한시간 (분)"
                type="number"
                outlined dense
              />
            </div>
          </div>

          <q-input
            v-model="form.name"
            label="시험지명"
            outlined dense
            :rules="[val => !!val || '필수입력']"
          />

          <!-- limitDateTime only shown when paperType===4 -->
          <div v-if="form.paperType === 4" class="row q-col-gutter-md">
            <div class="col-6">
              <q-input
                v-model="form.limitStartTime"
                label="시작일시"
                outlined dense
                type="datetime-local"
              />
            </div>
            <div class="col-6">
              <q-input
                v-model="form.limitEndTime"
                label="종료일시"
                outlined dense
                type="datetime-local"
              />
            </div>
          </div>

          <!-- Exam sections (titleItems) -->
          <div>
            <div class="text-subtitle1 q-mb-sm">문항 섹션</div>
            <q-list bordered separator>
              <q-expansion-item
                v-for="(titleItem, index) in form.titleItems"
                :key="index"
                :label="titleItem.name || ('섹션 ' + (index + 1))"
                default-opened
                header-class="bg-grey-2"
              >
                <q-card>
                  <q-card-section>
                    <div class="row items-center q-mb-sm q-gutter-sm">
                      <q-input
                        v-model="titleItem.name"
                        :label="'섹션 ' + (index + 1) + ' 제목'"
                        outlined dense
                        class="col"
                      />
                      <q-btn flat color="primary" icon="add" label="문항추가" @click="openAddQuestion(titleItem)" />
                      <q-btn flat color="negative" icon="delete" @click="form.titleItems.splice(index, 1)" />
                    </div>

                    <q-list bordered separator v-if="titleItem.questionItems && titleItem.questionItems.length">
                      <q-item
                        v-for="(qItem, qIndex) in titleItem.questionItems"
                        :key="qIndex"
                      >
                        <q-item-section>
                          <span class="text-caption text-grey q-mr-sm">{{ qIndex + 1 }}.</span>
                          <question-show :question="qItem" />
                        </q-item-section>
                        <q-item-section side>
                          <q-btn flat round dense color="negative" icon="close"
                            @click="titleItem.questionItems.splice(qIndex, 1)" />
                        </q-item-section>
                      </q-item>
                    </q-list>
                    <div v-else class="text-grey text-caption">문항이 없습니다.</div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>

            <q-btn flat color="primary" icon="add" label="섹션추가" class="q-mt-sm" @click="addTitle" />
          </div>

          <div class="q-mt-md">
            <q-btn unelevated color="primary" type="submit" label="저장" :loading="saving" />
            <q-btn flat label="취소" class="q-ml-sm" @click="$router.push({ path: '/exam/paper/list' })" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <div v-else class="flex flex-center q-pa-xl">
      <q-spinner size="40px" color="primary" />
    </div>

    <!-- Question selection dialog -->
    <q-dialog v-model="questionPage.showDialog" persistent>
      <q-card style="min-width:700px;max-width:90vw">
        <q-card-section class="row items-center">
          <div class="text-h6">문항 선택</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="row items-center q-gutter-sm q-mb-md">
            <q-input
              v-model="questionPage.queryParam.id"
              label="ID"
              dense outlined clearable
              style="max-width:120px"
            />
            <q-select
              v-model="questionPage.queryParam.questionType"
              :options="questionTypeOptions"
              label="유형"
              dense outlined emit-value map-options clearable
              style="min-width:140px"
            />
            <q-btn unelevated color="primary" label="검색" @click="queryDialogForm" />
          </div>

          <q-table
            :rows="questionPage.tableData"
            :columns="questionDialogColumns"
            :loading="questionPage.listLoading"
            row-key="id"
            flat bordered
            hide-bottom
            v-model:pagination="questionDialogPagination"
            selection="multiple"
            v-model:selected="questionPage.multipleSelection"
          />

          <pagination
            v-show="questionPage.total > 0"
            :total="questionPage.total"
            v-model:page="questionPage.queryParam.pageIndex"
            v-model:limit="questionPage.queryParam.pageSize"
            @pagination="searchQuestions"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="취소" v-close-popup />
          <q-btn unelevated color="primary" label="확인" @click="confirmQuestionSelect" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useEnumItemStore } from '@/stores/enumItem'
import { useExamStore } from '@/stores/exam'
import { Notify } from 'quasar'
import Pagination from '@/components/Pagination'
import QuestionShow from '../question/components/Show.vue'
import examPaperApi from '@/api/examPaper'
import questionApi from '@/api/question'

export default {
  components: { Pagination, QuestionShow },
  setup () {
    const enumItemStore = useEnumItemStore()
    const examStore = useExamStore()
    return { enumItemStore, examStore }
  },
  data () {
    return {
      form: {
        id: null,
        level: 1,
        subjectId: null,
        paperType: 1,
        limitStartTime: null,
        limitEndTime: null,
        name: '',
        suggestTime: null,
        titleItems: []
      },
      formLoading: false,
      saving: false,
      currentTitleItem: null,
      questionPage: {
        multipleSelection: [],
        showDialog: false,
        queryParam: {
          id: null,
          questionType: null,
          subjectId: null,
          pageIndex: 1,
          pageSize: 5
        },
        listLoading: false,
        tableData: [],
        total: 0
      },
      questionDialogPagination: { rowsPerPage: 0 },
      questionDialogColumns: [
        { name: 'id', field: 'id', label: 'Id', align: 'left' },
        { name: 'questionType', field: row => this.questionTypeFormatter(row.questionType), label: '유형', align: 'left' },
        { name: 'shortTitle', field: 'shortTitle', label: '문제', align: 'left' }
      ]
    }
  },
  computed: {
    levelOptions () {
      return this.enumItemStore.user.levelEnum.map(e => ({ label: e.value, value: e.key }))
    },
    filteredSubjectOptions () {
      return this.examStore.subjects
        .filter(s => s.level === this.form.level)
        .map(s => ({ label: s.name + ' (' + s.levelName + ')', value: s.id }))
    },
    paperTypeOptions () {
      return this.enumItemStore.exam.examPaper.paperTypeEnum.map(e => ({ label: e.value, value: e.key }))
    },
    questionTypeEnum () {
      return this.enumItemStore.exam.question.typeEnum
    },
    questionTypeOptions () {
      return this.questionTypeEnum.map(e => ({ label: e.value, value: e.key }))
    }
  },
  created () {
    this.examStore.initSubject()
    const id = this.$route.query.id
    if (id && parseInt(id) !== 0) {
      this.formLoading = true
      examPaperApi.select(id).then(re => {
        this.form = re.response
        this.formLoading = false
      }).catch(() => { this.formLoading = false })
    }
  },
  methods: {
    submitForm () {
      this.saving = true
      examPaperApi.edit(this.form).then(re => {
        if (re.code === 1) {
          this.form = re.response
          Notify.create({ type: 'positive', message: re.message || '저장되었습니다.' })
        } else {
          Notify.create({ type: 'negative', message: re.message || '오류가 발생했습니다.' })
        }
        this.saving = false
      }).catch(() => { this.saving = false })
    },
    addTitle () {
      this.form.titleItems.push({ name: '', questionItems: [] })
    },
    openAddQuestion (titleItem) {
      this.currentTitleItem = titleItem
      this.questionPage.multipleSelection = []
      this.questionPage.showDialog = true
      this.searchQuestions()
    },
    queryDialogForm () {
      this.questionPage.queryParam.pageIndex = 1
      this.searchQuestions()
    },
    searchQuestions () {
      this.questionPage.queryParam.subjectId = this.form.subjectId
      this.questionPage.listLoading = true
      questionApi.pageList(this.questionPage.queryParam).then(data => {
        const re = data.response
        this.questionPage.tableData = re.list
        this.questionPage.total = re.total
        this.questionPage.queryParam.pageIndex = re.pageNum
        this.questionPage.listLoading = false
      }).catch(() => { this.questionPage.listLoading = false })
    },
    confirmQuestionSelect () {
      this.questionPage.multipleSelection.forEach(q => {
        questionApi.select(q.id).then(re => {
          this.currentTitleItem.questionItems.push(re.response)
        })
      })
      this.questionPage.showDialog = false
    },
    questionTypeFormatter (val) {
      return this.enumItemStore.enumFormat(this.questionTypeEnum, val)
    }
  }
}
</script>
