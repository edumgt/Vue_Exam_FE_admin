<template>
  <div class="app-container">
    <div class="row items-center q-mb-md q-gutter-sm">
      <q-select
        v-model="queryParam.userLevel"
        :options="levelOptions"
        label="학년"
        dense
        outlined
        emit-value
        map-options
        clearable
        style="min-width:140px"
      />
      <q-btn unelevated color="primary" label="검색" @click="submitForm" />
      <q-btn unelevated color="primary" label="추가" :to="{ path: '/education/subject/edit' }" />
    </div>

    <q-table
      :rows="tableData"
      :columns="columns"
      :loading="listLoading"
      row-key="id"
      flat
      bordered
      hide-bottom
      v-model:pagination="tablePagination"
    >
      <template v-slot:body-cell-actions="{ row }">
        <q-td class="text-center">
          <q-btn
            size="sm"
            flat
            @click="$router.push({ path: '/education/subject/edit', query: { id: row.id } })"
          >수정</q-btn>
          <q-btn size="sm" flat color="negative" @click="deleteSubject(row)" class="q-ml-xs">삭제</q-btn>
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
import Pagination from '@/components/Pagination/index.vue'
import subjectApi from '@/api/subject'

export default {
  components: { Pagination },
  setup () {
    const enumItemStore = useEnumItemStore()
    return { enumItemStore }
  },
  data () {
    return {
      queryParam: { userLevel: null, pageIndex: 1, pageSize: 10 },
      listLoading: true,
      tableData: [],
      total: 0,
      tablePagination: { rowsPerPage: 0 },
      columns: [
        { name: 'id', field: 'id', label: 'Id', align: 'left' },
        { name: 'name', field: 'name', label: '과목명', align: 'left' },
        { name: 'levelName', field: 'levelName', label: '학년', align: 'left' },
        { name: 'actions', label: '관리', align: 'center' }
      ]
    }
  },
  computed: {
    levelOptions () {
      return this.enumItemStore.user.levelEnum.map(e => ({ label: e.value, value: e.key }))
    }
  },
  created () {
    this.search()
  },
  methods: {
    search () {
      this.listLoading = true
      subjectApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    submitForm () {
      this.queryParam.pageIndex = 1
      this.search()
    },
    deleteSubject (row) {}
  }
}
</script>
