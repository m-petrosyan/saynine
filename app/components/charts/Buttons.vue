<script setup>
const props = defineProps({
  datasets: {
    type: Array,
    required: true
  },
  activeDatasets: {
    type: Array,
    required: true
  }
})

defineEmits(['toggle-dataset'])
</script>

<template>
  <div class="flex gap-6 flex-1">
    <button
        v-for="(dataset, index) in props.datasets"
        :key="index"
        @click="$emit('toggle-dataset', index)"
        :class="[
        'flex flex-1 items-center py-3 gap-2 px-3 rounded-lg  cursor-pointer transition-colors',
          props.activeDatasets[index]
            ? `border-${dataset.color === '#3b82f6' ? 'blue-500 text-blue-700 bg-blue-50' : 'cyan-500 text-cyan-700 bg-cyan-50'}`
            : 'border-slate-200 text-slate-600 hover:border-slate-300'
        ]"
    >
      <span
          :class="[`w-4 h-4 rounded-full`, dataset.color === '#3b82f6' ? 'bg-blue' : 'bg-cyan-400']">
      </span>
      <span>{{ dataset.name }}</span>
    </button>
  </div>
</template>