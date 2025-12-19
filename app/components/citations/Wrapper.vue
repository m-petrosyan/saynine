<script setup>
import { useCitationsStore } from '@/stores/citations'
import { computed } from 'vue'

const store = useCitationsStore()
const citations = computed(() => store.citationsData)
</script>

<template>
  <div>
    <h2 class="text-center text-3xl md:text-6xl font-bold">AI citations</h2>
    <div class="flex flex-wrap justify-center gap-6 mt-6">
      <CitationsCard :citations/>
    </div>
  </div>
</template>