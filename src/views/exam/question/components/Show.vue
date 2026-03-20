<template>
  <div v-if="question">
    <!-- Single choice (1) and Multiple choice (2): show title + vertical option list -->
    <div v-if="question.questionType === 1 || question.questionType === 2">
      <div class="q-title q-mb-sm" v-html="question.title" />
      <div
        v-for="(item, idx) in question.items"
        :key="idx"
        class="q-item-content q-mb-xs"
      >
        <span class="question-prefix text-weight-bold q-mr-xs">{{ item.prefix || String.fromCharCode(65 + idx) }}.</span>
        <span v-html="item.content" />
      </div>
    </div>

    <!-- True/False (3): show title inline with options in parentheses -->
    <div v-else-if="question.questionType === 3">
      <span class="q-title" v-html="question.title" style="margin-right:8px" />
      <span>（</span>
      <span
        v-for="(item, idx) in question.items"
        :key="idx"
        class="q-item-content q-mr-sm"
        v-html="item.content"
      />
      <span>）</span>
    </div>

    <!-- Gap-filling (4) and Short-answer (5): title only -->
    <div v-else-if="question.questionType === 4 || question.questionType === 5">
      <div class="q-title" v-html="question.title" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionShow',
  props: {
    question: {
      type: Object,
      default: null
    }
  }
}
</script>
