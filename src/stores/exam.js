import { defineStore } from 'pinia'
import subjectApi from '@/api/subject'

export const useExamStore = defineStore('exam', {
  state: () => ({
    subjects: []
  }),
  getters: {
    subjectEnumFormat: (state) => (key) => {
      for (const item of state.subjects) {
        if (item.id === key) {
          return item.name + ' ( ' + item.levelName + ' )'
        }
      }
      return null
    }
  },
  actions: {
    async initSubject () {
      const re = await subjectApi.list()
      this.subjects = re.response
    }
  }
})
