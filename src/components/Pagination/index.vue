<template>
  <div :class="{ 'hidden': hidden }" class="pagination-container">
    <q-pagination
      :model-value="page"
      :max="Math.ceil(total / limit)"
      direction-links
      @update:model-value="onPageChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: { required: true, type: Number },
    page: { type: Number, default: 1 },
    limit: { type: Number, default: 10 },
    autoScroll: { type: Boolean, default: true },
    hidden: { type: Boolean, default: false }
  },
  emits: ['update:page', 'update:limit', 'pagination'],
  methods: {
    onPageChange (val) {
      this.$emit('update:page', val)
      this.$emit('pagination', { page: val, limit: this.limit })
      if (this.autoScroll) scrollTo(0, 800)
    }
  }
}
</script>

<style scoped>
.pagination-container { background: #fff; padding: 8px; }
.pagination-container.hidden { display: none; }
</style>
