<template>
  <div class="app-container">
    <div class="row items-center q-mb-md">
      <q-input v-model="queryParam.userName" label="아이디" dense outlined class="q-mr-sm" />
      <q-btn unelevated color="primary" label="검색" @click="submitForm" />
      <q-btn unelevated color="primary" label="추가" class="q-ml-sm" :to="{path:'/user/admin/edit'}" />
    </div>
    <q-table
      :rows="tableData"
      :columns="columns"
      :loading="listLoading"
      row-key="id"
      flat
      bordered
      v-model:pagination="tablePagination"
      hide-bottom
    >
      <template v-slot:body-cell-sex="{row}">
        <q-td>{{ sexFormatter(row.sex) }}</q-td>
      </template>
      <template v-slot:body-cell-status="{row}">
        <q-td>
          <q-badge :color="statusTagFormatter(row.status)" :label="statusFormatter(row.status)" />
        </q-td>
      </template>
      <template v-slot:body-cell-actions="{row}">
        <q-td class="text-center">
          <q-btn size="sm" flat @click="$router.push({path:'/user/admin/edit', query:{id:row.id}})">수정</q-btn>
          <q-btn size="sm" flat color="negative" @click="deleteUser(row)" class="q-ml-xs">삭제</q-btn>
        </q-td>
      </template>
    </q-table>
    <pagination v-show="total>0" :total="total" v-model:page="queryParam.pageIndex" v-model:limit="queryParam.pageSize" @pagination="search"/>
  </div>
</template>

<script>
import { useEnumItemStore } from '@/stores/enumItem'
import Pagination from '@/components/Pagination'
import userApi from '@/api/user'

export default {
  components: { Pagination },
  setup () {
    const enumItemStore = useEnumItemStore()
    return { enumItemStore }
  },
  data () {
    return {
      queryParam: { userName: '', role: 3, pageIndex: 1, pageSize: 10 },
      listLoading: true,
      tableData: [],
      total: 0,
      tablePagination: { rowsPerPage: 0 },
      columns: [
        { name: 'id', field: 'id', label: 'Id', align: 'left' },
        { name: 'userName', field: 'userName', label: '아이디', align: 'left' },
        { name: 'realName', field: 'realName', label: '이름', align: 'left' },
        { name: 'sex', field: 'sex', label: '성별', align: 'left' },
        { name: 'phone', field: 'phone', label: '휴대폰번호', align: 'left' },
        { name: 'createTime', field: 'createTime', label: '생성일자', align: 'left' },
        { name: 'status', field: 'status', label: '상태', align: 'left' },
        { name: 'actions', label: '관리', align: 'center' }
      ]
    }
  },
  created () { this.search() },
  computed: {
    sexEnum () { return this.enumItemStore.user.sexEnum },
    statusEnum () { return this.enumItemStore.user.statusEnum },
    statusTag () { return this.enumItemStore.user.statusTag }
  },
  methods: {
    search () {
      this.listLoading = true
      userApi.getUserPageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      }).catch(() => { this.listLoading = false })
    },
    submitForm () { this.queryParam.pageIndex = 1; this.search() },
    deleteUser (row) {},
    sexFormatter (val) { return this.enumItemStore.enumFormat(this.sexEnum, val) },
    statusFormatter (val) { return this.enumItemStore.enumFormat(this.statusEnum, val) },
    statusTagFormatter (val) { return this.enumItemStore.enumFormat(this.statusTag, val) }
  }
}
</script>
