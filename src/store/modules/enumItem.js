// initial state
const state = {
  user: {
    sexEnum: [{ 'key': 1, 'value': '男' }, { 'key': 2, 'value': '女' }],
    statusEnum: [{ 'key': 1, 'value': '사용중' }, { 'key': 2, 'value': '중지중' }],
    levelEnum: [{ 'key': 1, 'value': '一등급(학년)' }, { 'key': 2, 'value': '二등급(학년)' }, { 'key': 3, 'value': '三등급(학년)' }, { 'key': 4, 'value': '四등급(학년)' }, { 'key': 5, 'value': '五등급(학년)' }, { 'key': 6, 'value': '六등급(학년)' },
      { 'key': 7, 'value': '初一' }, { 'key': 8, 'value': '初二' }, { 'key': 9, 'value': '初三' },
      { 'key': 10, 'value': '高一' }, { 'key': 11, 'value': '高二' }, { 'key': 12, 'value': '高三' }],
    roleEnum: [{ 'key': 1, 'value': '학생' }, { 'key': 2, 'value': '강사' }, { 'key': 3, 'value': '관리자' }],
    statusTag: [{ 'key': 1, 'value': 'success' }, { 'key': 2, 'value': 'danger' }],
    statusBtn: [{ 'key': 1, 'value': '중지중' }, { 'key': 2, 'value': '사용중' }]
  },
  exam: {
    examPaper: {
      paperTypeEnum: [{ 'key': 1, 'value': '固定시험지' }, { 'key': 4, 'value': '时段시험지' }]
    },
    question: {
      typeEnum: [{ 'key': 1, 'value': '单选문항' }, { 'key': 2, 'value': '다중선택 객관식' }, { 'key': 3, 'value': '참 또는 거짓' }, { 'key': 4, 'value': '빈칸채우기' }, { 'key': 5, 'value': '단답형' }],
      editUrlEnum: [{ 'key': 1, 'value': '/exam/question/edit/singleChoice', 'name': '单选문항' },
        { 'key': 2, 'value': '/exam/question/edit/multipleChoice', 'name': '다중선택 객관식' },
        { 'key': 3, 'value': '/exam/question/edit/trueFalse', 'name': '참 또는 거짓' },
        { 'key': 4, 'value': '/exam/question/edit/gapFilling', 'name': '빈칸채우기' },
        { 'key': 5, 'value': '/exam/question/edit/shortAnswer', 'name': '단답형' }]
    }
  }
}

// getters
const getters = {
  enumFormat: (state) => (arrary, key) => {
    return format(arrary, key)
  }
}

// actions
const actions = {}

// mutations
const mutations = {}

const format = function (array, key) {
  for (let item of array) {
    if (item.key === key) {
      return item.value
    }
  }
  return null
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
