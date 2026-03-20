<template>
  <div class="app-container">
    <div class="row items-center q-mb-md q-gutter-sm">
      <q-input v-model="queryParam.id" label="문항Id" dense outlined clearable />
      <q-select
        v-model="queryParam.userLevel"
        :options="levelOptions"
        label="학년"
        dense outlined emit-value map-options clearable
        style="min-width:120px"
      />
      <q-select
        v-model="queryParam.subjectId"
        :options="subjectOptions"
        label="과목"
        dense outlined emit-value map-options clearable
        style="min-width:160px"
      />
      <q-select
        v-model="queryParam.questionType"
        :options="questionTypeOptions"
        label="문항유형"
        dense outlined emit-value map-options clearable
        style="min-width:140px"
      />
      <q-btn unelevated color="primary" label="검색" @click="submitForm" />
      <q-btn-dropdown unelevated color="primary" label="추가">
        <q-list>
          <q-item
            v-for="item in editUrlEnum"
            :key="item.key"
            clickable v-close-popup
            @click="$router.push({ path: item.value })"
          >
            <q-item-section>{{ item.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <q-table
      :rows="tableData"
      :columns="columns"
      :loading="listLoading"
      row-key="id"
      flat bordered
      hide-bottom
      v-model:pagination="tablePagination"
    >
      <template v-slot:body-cell-subjectId="{ row }">
        <q-td>{{ examStore.subjectEnumFormat(row.subjectId) }}</q-td>
      </template>
      <template v-slot:body-cell-questionType="{ row }">
        <q-td>{{ questionTypeFormatter(row.questionType) }}</q-td>
      </template>
      <template v-slot:body-cell-actions="{ row }">
        <q-td class="text-center">
          <q-btn size="sm" flat round icon="visibility" @click="showPreview(row)" />
          <q-btn size="sm" flat class="q-ml-xs" @click="goEdit(row)">수정</q-btn>
          <q-btn size="sm" flat color="negative" class="q-ml-xs" @click="deleteQuestion(row)">삭제</q-btn>
        </q-td>
      </template>
    </q-table>

    <pagination
      v-show="total > 0"
      :total="total"
      v-model:page="queryParam.pageIndex"
      v-model:limit="queryParam.pageSize"
      @pagination="search"
    />

    <!-- Preview dialog -->
    <q-dialog v-model="previewDialog">
      <q-card style="min-width:400px;max-width:80vw">
        <q-card-section>
          <div class="text-h6">문항 미리보기</div>
        </q-card-section>
        <q-card-section v-if="previewQuestion">
          <show :question="previewQuestion" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="닫기" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useEnumItemStore } from '@/stores/enumItem'
import { useExamStore } from '@/stores/exam'
import Pagination from '@/components/Pagination/index.vue'
import Show from './components/Show.vue'
import questionApi from '@/api/question'

export default {
  components: { Pagination, Show },
  setup () {
    const enumItemStore = useEnumItemStore()
    const examStore = useExamStore()
    return { enumItemStore, examStore }
  },
  data () {
    return {
      queryParam: {
        id: '',
        userLevel: null,
        subjectId: null,
        questionType: null,
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: true,
      tableData: [],
      total: 0,
      tablePagination: { rowsPerPage: 0 },
      previewDialog: false,
      previewQuestion: null,
      columns: [
        { name: 'id', field: 'id', label: 'Id', align: 'left' },
        { name: 'subjectId', field: 'subjectId', label: '과목', align: 'left' },
        { name: 'questionType', field: 'questionType', label: '문항유형', align: 'left' },
        { name: 'shortTitle', field: 'shortTitle', label: '문항내용', align: 'left' },
        { name: 'score', field: 'score', label: '점수', align: 'left' },
        { name: 'difficult', field: 'difficult', label: '난이도', align: 'left' },
        { name: 'createTime', field: 'createTime', label: '생성일자', align: 'left' },
        { name: 'actions', label: '관리', align: 'center' }
      ]
    }
  },
  computed: {
    levelOptions () {
      return this.enumItemStore.user.levelEnum.map(e => ({ label: e.value, value: e.key }))
    },
    subjectOptions () {
      return this.examStore.subjects.map(s => ({ label: s.name + ' (' + s.levelName + ')', value: s.id }))
    },
    questionTypeEnum () {
      return this.enumItemStore.exam.question.typeEnum
    },
    questionTypeOptions () {
      return this.questionTypeEnum.map(e => ({ label: e.value, value: e.key }))
    },
    editUrlEnum () {
      return this.enumItemStore.exam.question.editUrlEnum
    }
  },
  created () {
    this.examStore.initSubject()
    this.search()
  },
  methods: {
    submitForm () {
      this.queryParam.pageIndex = 1
      this.search()
    },
    search () {
      this.listLoading = true
      questionApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    questionTypeFormatter (val) {
      return this.enumItemStore.enumFormat(this.questionTypeEnum, val)
    },
    showPreview (row) {
      questionApi.select(row.id).then(re => {
        this.previewQuestion = re.response
        this.previewDialog = true
      })
    },
    goEdit (row) {
      const urlItem = this.editUrlEnum.find(e => e.key === row.questionType)
      if (urlItem) this.$router.push({ path: urlItem.value, query: { id: row.id } })
    },
    deleteQuestion (row) {
      // TODO: implement delete with confirmation
    }
  }
}
</script>
