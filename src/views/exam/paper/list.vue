<template>
  <div class="app-container">
    <div class="row items-center q-mb-md q-gutter-sm">
      <q-input v-model="queryParam.id" label="시험지Id" dense outlined clearable />
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
      <q-btn unelevated color="primary" label="검색" @click="submitForm" />
      <q-btn unelevated color="primary" label="추가" :to="{ path: '/exam/paper/edit' }" />
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
      <template v-slot:body-cell-paperType="{ row }">
        <q-td>{{ paperTypeFormatter(row.paperType) }}</q-td>
      </template>
      <template v-slot:body-cell-actions="{ row }">
        <q-td class="text-center">
          <q-btn size="sm" flat @click="$router.push({ path: '/exam/paper/edit', query: { id: row.id } })">수정</q-btn>
          <q-btn size="sm" flat color="negative" class="q-ml-xs">삭제</q-btn>
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
  </div>
</template>

<script>
import { useEnumItemStore } from '@/stores/enumItem'
import { useExamStore } from '@/stores/exam'
import Pagination from '@/components/Pagination/index.vue'
import examPaperApi from '@/api/examPaper'

export default {
  components: { Pagination },
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
        pageIndex: 1,
        pageSize: 10
      },
      listLoading: true,
      tableData: [],
      total: 0,
      tablePagination: { rowsPerPage: 0 },
      columns: [
        { name: 'id', field: 'id', label: 'Id', align: 'left' },
        { name: 'subjectId', field: 'subjectId', label: '과목', align: 'left' },
        { name: 'name', field: 'name', label: '시험지명', align: 'left' },
        { name: 'paperType', field: 'paperType', label: '유형', align: 'left' },
        { name: 'score', field: 'score', label: '총점', align: 'left' },
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
    paperTypeEnum () {
      return this.enumItemStore.exam.examPaper.paperTypeEnum
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
      examPaperApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    paperTypeFormatter (val) {
      return this.enumItemStore.enumFormat(this.paperTypeEnum, val)
    }
  }
}
</script>
