<script setup>
const props = defineProps({
  data: {type: Array, required: true},
})
</script>

<template>
  <div class="flex justify-center flex-col mt-4">
    <div>
      <div v-for="(item, i) in props.data" :key="i" class="flex justify-between">
        <div class="flex items-center gap-2 mb-2">
          <span class="w-4 h-4 rounded-full" :style="{ backgroundColor: item.color }"></span>
          <span>{{ item.name }}</span>
        </div>
        <p>{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>