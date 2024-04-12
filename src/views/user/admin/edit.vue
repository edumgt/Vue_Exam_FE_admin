<template>
  <div class="app-container">

    <el-form :model="form" ref="form" label-width="150px" v-loading="formLoading">
      <el-form-item label="아이디：" required>
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="비번：" required>
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="이름：" required>
        <el-input v-model="form.realName"></el-input>
      </el-form-item>
      <el-form-item label="나이：">
        <el-input v-model="form.age"></el-input>
      </el-form-item>
      <el-form-item label="성별：">
        <el-select v-model="form.sex" placeholder="성별" clearable>
          <el-option v-for="item in sexEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="생년월일：">
        <el-date-picker v-model="form.birthDay" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="휴대폰：">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="상태：" required>
        <el-select v-model="form.status" placeholder="상태" clearable>
          <el-option v-for="item in statusEnum" :key="item.key" :value="item.key" :label="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">저장</el-button>
        <el-button @click="resetForm">취소</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import userApi from '@/api/user'

export default {
  data () {
    return {
      form: {
        id: null,
        userName: '',
        password: '',
        realName: '',
        role: 3,
        status: 1,
        age: '',
        sex: '',
        birthDay: null,
        phone: null
      },
      formLoading: false
    }
  },
  created () {
    let id = this.$route.query.id
    let _this = this
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true
      userApi.selectUser(id).then(re => {
        _this.form = re.response
        _this.formLoading = false
      })
    }
  },
  methods: {
    submitForm () {
      let _this = this
      this.formLoading = true
      userApi.createUser(this.form).then(data => {
        if (data.code === 1) {
          _this.form.id = data.response.id
          _this.$message.success(data.message)
        } else {
          _this.$message.error(data.message)
        }
        _this.formLoading = false
      }).catch(e => {
        _this.formLoading = false
      })
    },
    resetForm () {
      this.$refs['form'].resetFields()
    }
  },
  computed: {
    ...mapGetters('enumItem', [
      'enumFormat'
    ]),
    ...mapState('enumItem', {
      sexEnum: state => state.user.sexEnum,
      roleEnum: state => state.user.roleEnum,
      statusEnum: state => state.user.statusEnum
    })
  }
}
</script>
