<template>
  <div class="app-container">
    <el-form :model="queryParam" ref="queryForm" :inline="true">
      <el-form-item label="문항ID：">
        <el-input v-model="queryParam.id" clearable></el-input>
      </el-form-item>
      <el-form-item label="등급(학년)：">
        <el-select v-model="queryParam.level" placeholder="등급(학년)">
          <el-option v-for="item in levelEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="과목：">
        <el-select v-model="queryParam.subjectId"  clearable>
          <el-option v-for="item in subjects.filter(data => data.level==queryParam.level)" :key="item.id" :value="item.id" :label="item.name+' ( '+item.levelName+' )'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">검색</el-button>
        <router-link :to="{path:'/exam/paper/edit'}" class="link-left">
          <el-button type="primary">추가</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <el-table v-loading="listLoading" :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column prop="id" label="Id" width="90px"/>
      <el-table-column prop="subjectId" label="과목" :formatter="subjectFormatter" width="120px" />
      <el-table-column prop="name" label="이름"  />
      <el-table-column prop="createTime" label="생성일자" width="160px"/>
      <el-table-column  label="관리" align="center"  width="160px">
        <template slot-scope="{row}">
          <el-button size="mini" @click="$router.push({path:'/exam/paper/edit',query:{id:row.id}})" >수정</el-button>
          <el-button size="mini" type="danger" class="link-left">삭제</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
                @pagination="search"/>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import examPaperApi from '@/api/examPaper'

export default {
  components: { Pagination },
  data () {
    return {
      queryParam: {
        id: null,
        level: 1,
        subjectId: null,
        pageIndex: 1,
        pageSize: 10
      },
      subjectFilter: null,
      listLoading: true,
      tableData: [],
      total: 0
    }
  },
  created () {
    this.initSubject()
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
      })
    },
    subjectFormatter  (row, column, cellValue, index) {
      return this.subjectEnumFormat(cellValue)
    },
    ...mapActions('exam', { initSubject: 'initSubject' })
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      levelEnum: state => state.user.levelEnum
    }),
    ...mapGetters('exam', ['subjectEnumFormat']),
    ...mapState('exam', { subjects: state => state.subjects })
  }
}
</script>
