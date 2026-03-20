import { defineStore } from 'pinia'

export const useEnumItemStore = defineStore('enumItem', {
  state: () => ({
    user: {
      sexEnum: [{ key: 1, value: '남' }, { key: 2, value: '여' }],
      statusEnum: [{ key: 1, value: '사용중' }, { key: 2, value: '중지중' }],
      levelEnum: [
        { key: 1, value: '초등 1학년' }, { key: 2, value: '초등 2학년' }, { key: 3, value: '초등 3학년' },
        { key: 4, value: '초등 4학년' }, { key: 5, value: '초등 5학년' }, { key: 6, value: '초등 6학년' },
        { key: 7, value: '중등 1학년' }, { key: 8, value: '중등 2학년' }, { key: 9, value: '중등 3학년' },
        { key: 10, value: '고등 1학년' }, { key: 11, value: '고등 2학년' }, { key: 12, value: '고등 3학년' }
      ],
      roleEnum: [{ key: 1, value: '학생' }, { key: 2, value: '강사' }, { key: 3, value: '관리자' }],
      statusTag: [{ key: 1, value: 'positive' }, { key: 2, value: 'negative' }],
      statusBtn: [{ key: 1, value: '중지중' }, { key: 2, value: '사용중' }]
    },
    exam: {
      examPaper: {
        paperTypeEnum: [{ key: 1, value: '중간고사' }, { key: 4, value: '기말고사' }]
      },
      question: {
        typeEnum: [
          { key: 1, value: '단일 선택문항' }, { key: 2, value: '다중선택 객관식' },
          { key: 3, value: '참 또는 거짓' }, { key: 4, value: '빈칸채우기' }, { key: 5, value: '단답형' }
        ],
        editUrlEnum: [
          { key: 1, value: '/exam/question/edit/singleChoice', name: '단일 선택문항' },
          { key: 2, value: '/exam/question/edit/multipleChoice', name: '다중선택 객관식' },
          { key: 3, value: '/exam/question/edit/trueFalse', name: '참 또는 거짓' },
          { key: 4, value: '/exam/question/edit/gapFilling', name: '빈칸채우기' },
          { key: 5, value: '/exam/question/edit/shortAnswer', name: '단답형' }
        ]
      }
    }
  }),
  getters: {
    enumFormat: (state) => (array, key) => {
      for (const item of array) {
        if (item.key === key) return item.value
      }
      return null
    }
  }
})
